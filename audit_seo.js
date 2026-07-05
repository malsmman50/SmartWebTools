const fs = require('fs');
const path = require('path');

const calculatorsDir = path.join(__dirname, 'app/[lang]/calculators');
const toolsDir = path.join(__dirname, 'app/[lang]/tools');

let totalFiles = 0;
let validFiles = 0;
const report = [];

function analyzePage(pagePath, toolName) {
  if (!fs.existsSync(pagePath)) return;
  totalFiles++;
  
  const content = fs.readFileSync(pagePath, 'utf8');
  
  // Check tags
  const hasSoftwareSchema = content.includes('SoftwareSchema');
  const hasFAQSchema = content.includes('FAQSchema');
  const hasArticle = content.includes('<article');
  
  // Extract article content to check word count
  let wordCount = 0;
  let articleClass = 'None';
  
  const articleMatch = content.match(/<article([^>]*)>([\s\S]*?)<\/article>/i);
  if (articleMatch) {
    const attrs = articleMatch[1];
    const classMatch = attrs.match(/className=["']([^"']+)["']/);
    if (classMatch) articleClass = classMatch[1];
    else {
      const styleMatch = attrs.match(/style=\{/);
      if (styleMatch) articleClass = 'Inline Style';
    }
    
    // basic word count approximation (stripping tags)
    const textContent = articleMatch[2].replace(/<[^>]*>?/gm, ' ');
    wordCount = textContent.split(/\s+/).filter(w => w.length > 1).length;
  }

  // Next.js standard imports
  const hasDisclaimer = content.includes('DisclaimerBox');

  const status = {
    Tool: toolName,
    HasSoftwareSchema: hasSoftwareSchema,
    HasFAQSchema: hasFAQSchema,
    HasArticle: hasArticle,
    WordCount: wordCount,
    ArticleStyle: articleClass,
    HasDisclaimer: hasDisclaimer
  };

  report.push(status);
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const itemPath = path.join(dir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      let pagePath = path.join(itemPath, 'page.js');
      if (!fs.existsSync(pagePath)) pagePath = path.join(itemPath, 'page.tsx');
      analyzePage(pagePath, item);
      
      const subItems = fs.readdirSync(itemPath);
      for (const subItem of subItems) {
        const subItemPath = path.join(itemPath, subItem);
        if (fs.statSync(subItemPath).isDirectory()) {
          let subPagePath = path.join(subItemPath, 'page.js');
          if (!fs.existsSync(subPagePath)) subPagePath = path.join(subItemPath, 'page.tsx');
          analyzePage(subPagePath, `${item}/${subItem}`);
        }
      }
    }
  }
}

scanDir(calculatorsDir);
scanDir(toolsDir);

console.log(JSON.stringify(report, null, 2));
