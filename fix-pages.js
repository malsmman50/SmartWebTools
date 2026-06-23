const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      processDir(fullPath);
    } else if (item.name === 'page.js') {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      // Fix the syntax error: /> lang={lang} dict={dict} />
      content = content.replace(/\/>\s*lang=\{lang\}\s*dict=\{dict\}\s*\/>/g, ' lang={lang} dict={dict} />');

      fs.writeFileSync(fullPath, content);
      console.log('Fixed', fullPath);
    }
  }
}

processDir(path.join(__dirname, 'app', '[lang]'));
