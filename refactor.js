const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'app', 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('useLanguage')) {
    // Replace import
    content = content.replace(/import\s+\{\s*useLanguage\s*\}\s+from\s+["']@\/app\/components\/LanguageProvider["'];?\n?/g, '');
    
    // Replace const { lang, dict } = useLanguage();
    content = content.replace(/const\s+\{\s*lang,\s*dict\s*\}\s*=\s*useLanguage\(\);/g, '');
    content = content.replace(/const\s+\{\s*lang\s*\}\s*=\s*useLanguage\(\);/g, '');

    // Add lang, dict to component props
    content = content.replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\(\s*(props)?\s*\)\s*\{/g, (match, name) => {
      return `export default function ${name}({ lang, dict, ...props }) {`;
    });
    
    // Some components might have structured props like ({ param })
    content = content.replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\(\{\s*([^}]+)\s*\}\)\s*\{/g, (match, name, propsStr) => {
      if (propsStr.includes('lang') || propsStr.includes('dict')) return match;
      return `export default function ${name}({ lang, dict, ${propsStr} }) {`;
    });

    fs.writeFileSync(filePath, content);
    console.log('Refactored', file);
  }
});
