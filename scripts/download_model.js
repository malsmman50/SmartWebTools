const fs = require('fs');
const path = require('path');
const https = require('https');

const modelId = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';
const baseDir = path.join(__dirname, 'public', 'models', modelId);
const onnxDir = path.join(baseDir, 'onnx');

// Create directories
if (!fs.existsSync(onnxDir)) {
  fs.mkdirSync(onnxDir, { recursive: true });
}

const files = [
  'config.json',
  'tokenizer.json',
  'tokenizer_config.json',
  'vocab.txt',
  'special_tokens_map.json',
  'onnx/model_quantized.onnx'
];

const baseUrl = `https://huggingface.co/${modelId}/resolve/main/`;

function downloadFile(file) {
  return new Promise((resolve, reject) => {
    const url = baseUrl + file;
    const dest = path.join(baseDir, file);
    console.log(`Downloading ${file}...`);
    
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Handle redirect
        https.get(res.headers.location, (redirectRes) => {
          if (redirectRes.statusCode !== 200) {
            reject(new Error(`Failed to download ${file}: ${redirectRes.statusCode}`));
            return;
          }
          const fileStream = fs.createWriteStream(dest);
          redirectRes.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Successfully downloaded ${file}`);
            resolve();
          });
        }).on('error', reject);
        return;
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${file}: ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Successfully downloaded ${file}`);
        resolve();
      });
    }).on('error', reject);
  });
}

async function downloadAll() {
  for (const file of files) {
    await downloadFile(file);
  }
  console.log('All model files downloaded successfully!');
}

downloadAll().catch(console.error);
