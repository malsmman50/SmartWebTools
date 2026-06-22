import { pipeline, env } from '/transformers.min.js';

// Configure local paths and fallback to remote CDN
env.allowRemoteModels = true;
env.allowLocalModels = true;
env.localModelPath = '/models/';
env.backends.onnx.wasm.wasmPaths = '/wasm/';
// Force single-threaded execution to prevent ONNX from spawning sub-workers
// which causes NetworkError / importScripts failures on blob URLs in some browsers.
env.backends.onnx.wasm.numThreads = 1;

class PipelineSingleton {
    static task = 'feature-extraction';
    static model = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            // CRITICAL: await is required here. Without it, this.instance becomes
            // an unresolved Promise, permanently poisoning the singleton on failure.
            this.instance = await pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

let isProcessing = false;
let queue = [];
let db = []; // Internal Vector DB
let lastProgressTime = 0;

function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

self.addEventListener('message', (event) => {
    queue.push(event);
    processQueue();
});

async function processQueue() {
    if (isProcessing || queue.length === 0) return;
    isProcessing = true;
    const event = queue.shift();
    
    try {
        let extractor = await PipelineSingleton.getInstance(x => {
            const now = Date.now();
            // Throttle model download progress updates to prevent UI thrashing (100ms)
            if (now - lastProgressTime > 100 || x.status === 'ready' || x.status === 'done') {
                self.postMessage({ status: 'progress', data: x });
                lastProgressTime = now;
            }
        });

        if (event.data.type === 'clear_db') {
            db = [];
            self.postMessage({ status: 'db_cleared' });
        } 
        else if (event.data.type === 'embed_batch') {
            const chunks = event.data.chunks; // Array of { id, text }
            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                const output = await extractor(chunk.text, { pooling: 'mean', normalize: true });
                db.push({ id: chunk.id, text: chunk.text, vector: Array.from(output.data) });
                
                // Throttle UI progress to every 5 chunks or at the very end
                if (i % 5 === 0 || i === chunks.length - 1) {
                    self.postMessage({ status: 'batch_progress', processed: i + 1, total: chunks.length, dbLength: db.length });
                }
            }
            self.postMessage({ status: 'batch_complete', dbLength: db.length });
        }
        else if (event.data.type === 'search') {
            const queryText = event.data.text;
            const output = await extractor(queryText, { pooling: 'mean', normalize: true });
            const queryVector = Array.from(output.data);
            
            const scored = db.map(doc => {
                return {
                    ...doc,
                    score: cosineSimilarity(queryVector, doc.vector)
                };
            });
            scored.sort((a, b) => b.score - a.score);
            
            // Remove full vector from results to save postMessage cloning overhead
            const topResults = scored.slice(0, 3).map(r => ({ id: r.id, text: r.text, score: r.score }));
            
            self.postMessage({ 
                status: 'search_results', 
                results: topResults
            });
        }
    } catch (err) {
        // Reset singleton on failure so it can be retried
        PipelineSingleton.instance = null;
        self.postMessage({ status: 'error', error: err ? (err.message || err.toString()) : 'Unknown worker error' });
    }
    
    isProcessing = false;
    processQueue();
}
