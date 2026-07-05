const puppeteer = require('puppeteer'); 
(async () => { 
  const browser = await puppeteer.launch(); 
  const page = await browser.newPage(); 
  page.on('console', msg => console.log('PAGE LOG:', msg.text())); 
  page.on('pageerror', err => console.log('PAGE ERROR STACK:', err.stack)); 
  await page.goto('https://smartcalctools.xyz/en', {waitUntil: 'networkidle0'}); 
  await browser.close(); 
})();
