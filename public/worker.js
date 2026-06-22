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
            self.postMessage({ status: 'progress', data: x });
        });

        if (event.data.type === 'embed') {
            const output = await extractor(event.data.text, { pooling: 'mean', normalize: true });
            
            self.postMessage({ 
                status: 'complete', 
                id: event.data.id,
                // Transfer as Float32Array for efficiency (structured-cloneable)
                vector: Array.from(output.data),
                text: event.data.text
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
