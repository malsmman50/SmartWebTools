import { pipeline, env } from '@xenova/transformers';

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

self.addEventListener('message', async (event) => {
    try {
        let extractor = await PipelineSingleton.getInstance(x => {
            // Send progress updates back (e.g. downloading model chunks)
            self.postMessage({ status: 'progress', data: x });
        });

        if (event.data.type === 'embed') {
            const output = await extractor(event.data.text, { pooling: 'mean', normalize: true });
            
            self.postMessage({ 
                status: 'complete', 
                id: event.data.id,
                vector: Array.from(output.data),
                text: event.data.text
            });
        }
    } catch (err) {
        self.postMessage({ status: 'error', error: err.message });
    }
});
