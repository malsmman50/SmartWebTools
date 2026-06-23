const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file === 'page.js') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const regex = /export default async function\s+(\w+)\(\{\s*params\s*\}\)\s*\{\n\s*return\s+<(\w+)\s+lang=\{lang\}\s+dict=\{dict\}\s*\/>;\n\}/g;
      
      let changed = false;
      content = content.replace(regex, (match, funcName, compName) => {
        changed = true;
        return `export default async function ${funcName}({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <${compName} lang={lang} dict={dict} />;
}`;
      });
      
      if (changed) {
        // Ensure getDictionary is imported
        if (!content.includes('getDictionary')) {
           content = `import { getDictionary } from "@/app/dictionaries";\n` + content;
        }
        fs.writeFileSync(fullPath, content);
        console.log(`Fixed: ${fullPath}`);
      }
    }
  }
}

processDir(path.join(process.cwd(), 'app', '[lang]'));
