import { pipeline, env } from '/transformers.min.js';

// Configure local paths and disable remote fetching
env.allowRemoteModels = false;
env.allowLocalModels = true;
env.localModelPath = '/models/';
env.backends.onnx.wasm.wasmPaths = '/wasm/';

class PipelineSingleton {
    static task = 'feature-extraction';
    static model = 'Xenova/all-MiniLM-L6-v2';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
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
        self.postMessage({ status: 'debug', msg: `Getting extractor for event id: ${event.data.id}` });
        let extractor = await PipelineSingleton.getInstance(x => {
            self.postMessage({ status: 'progress', data: x });
        });

        self.postMessage({ status: 'debug', msg: `Extractor ready. Processing id: ${event.data.id}` });
        if (event.data.type === 'embed') {
            const output = await extractor(event.data.text, { pooling: 'mean', normalize: true });
            
            self.postMessage({ status: 'debug', msg: `Extraction complete for id: ${event.data.id}` });
            self.postMessage({ 
                status: 'complete', 
                id: event.data.id,
                vector: Array.from(output.data),
                text: event.data.text
            });
        }
    } catch (err) {
        self.postMessage({ status: 'error', error: err ? err.message || err.toString() : 'Unknown error' });
    }
    
    isProcessing = false;
    processQueue();
}
