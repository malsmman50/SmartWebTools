const fs = require('fs');
const path = require('path');

function removeEmojis(text) {
    if (typeof text !== 'string') return text;
    // Regex to match emojis
    return text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
}

function processJsonFile(filePath) {
    const rawData = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(rawData);

    function traverseAndClean(obj) {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                if (key.includes('title')) {
                    obj[key] = removeEmojis(obj[key]);
                }
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                traverseAndClean(obj[key]);
            }
        }
    }

    traverseAndClean(data);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Cleaned ${filePath}`);
}

const enPath = path.join(process.cwd(), 'app', 'dictionaries', 'en.json');
const arPath = path.join(process.cwd(), 'app', 'dictionaries', 'ar.json');

processJsonFile(enPath);
processJsonFile(arPath);
