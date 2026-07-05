const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processPageFile(filePath) {
  if (!filePath.endsWith('page.js')) return;
  if (!filePath.includes(path.join('app', '[lang]'))) return;
  if (filePath.includes(path.join('[slug]'))) return; 

  const parts = filePath.split(path.sep);
  const langIndex = parts.indexOf('[lang]');
  if (langIndex === -1) return;

  const urlSegments = parts.slice(langIndex + 1, -1);
  if (urlSegments.length === 0) return;

  const currentPath = urlSegments.join('/');
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('alternates: {')) {
    if (content.includes('canonical: `https://smartcalctools.xyz`,')) {
      content = content.replace(/alternates:\s*\{[\s\S]*?\},/, `alternates: {
      canonical: \`https://smartcalctools.xyz/\${lang}/${currentPath}\`,
      languages: {
        "en": \`https://smartcalctools.xyz/en/${currentPath}\`,
        "ar": \`https://smartcalctools.xyz/ar/${currentPath}\`,
      },
    },`);
      fs.writeFileSync(filePath, content);
      console.log(`[FIXED BROKEN] ${filePath}`);
    } else {
      console.log(`[SKIPPED] ${filePath} (Already has alternates)`);
    }
    return;
  }

  // Find the generateMetadata return block and capture everything before it
  const returnRegex = /(export\s+(?:async\s+)?function\s+generateMetadata[\s\S]*?)return\s+\{/;
  const match = content.match(returnRegex);

  if (match) {
    const signatureAndBody = match[1];
    let newSignatureAndBody = signatureAndBody;

    // Make sure { lang } is extracted from params
    if (!newSignatureAndBody.includes('const { lang } = await params;') && newSignatureAndBody.includes('generateMetadata({ params })')) {
       newSignatureAndBody = newSignatureAndBody.replace(/generateMetadata\(\{ params \}\)\s*\{/, `generateMetadata({ params }) {\n  const { lang } = await params;`);
    }

    const injection = `${newSignatureAndBody}return {
    alternates: {
      canonical: \`https://smartcalctools.xyz/\${lang}/${currentPath}\`,
      languages: {
        "en": \`https://smartcalctools.xyz/en/${currentPath}\`,
        "ar": \`https://smartcalctools.xyz/ar/${currentPath}\`,
      },
    },`;

    content = content.replace(returnRegex, injection);
    fs.writeFileSync(filePath, content);
    console.log(`[INJECTED] ${filePath}`);
  } else {
    console.log(`[WARNING] No generateMetadata found in ${filePath}`);
  }
}

const rootDir = path.join(__dirname, '..', 'app', '[lang]');
walkDir(rootDir, processPageFile);
console.log('Done processing all canonicals.');
