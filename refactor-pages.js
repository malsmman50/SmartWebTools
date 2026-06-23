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
      
      // If it doesn't import getDictionary, add it
      if (!content.includes('getDictionary')) {
        content = `import { getDictionary } from "@/app/dictionaries";\n` + content;
      }
      
      // Update function to be async if not already
      if (!content.includes('export default async function')) {
        content = content.replace(/export\s+default\s+function/g, 'export default async function');
      }

      // Ensure it accepts params
      content = content.replace(/export\s+default\s+async\s+function\s+([A-Za-z0-9_]+)\s*\(\s*\)\s*\{/g, 'export default async function $1({ params }) {');

      // Inject const { lang } = await params; and dict
      if (!content.includes('const { lang } = await params;')) {
        content = content.replace(/(export\s+default\s+async\s+function\s+[A-Za-z0-9_]+\s*\(\s*\{\s*params\s*\}\s*\)\s*\{)/g, 
          '$1\n  const { lang } = await params;\n  const dict = await getDictionary(lang);');
      }

      // Add lang={lang} dict={dict} to any custom Client Components (<[A-Z]... />)
      // Exception for standard HTML tags.
      content = content.replace(/<([A-Z][A-Za-z0-9_]+)([^>]*?)\s*\/?>(?!\s*<\/\1>)/g, (match, compName, attrs) => {
        if (!attrs.includes('lang=') && compName.endsWith('Client')) {
          return match.replace(/\/?$/, ` lang={lang} dict={dict} />`);
        }
        return match;
      });
      content = content.replace(/<([A-Z][A-Za-z0-9_]+)([^>]*?)>(.*?)<\/\1>/gs, (match, compName, attrs, children) => {
        if (!attrs.includes('lang=') && compName.endsWith('Client')) {
          return `<${compName} lang={lang} dict={dict} ${attrs}>${children}</${compName}>`;
        }
        return match;
      });

      fs.writeFileSync(fullPath, content);
      console.log('Refactored', fullPath);
    }
  }
}

processDir(path.join(__dirname, 'app', '[lang]'));
