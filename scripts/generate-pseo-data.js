const fs = require('fs');
const path = require('path');

// Output Directory
const LIB_DIR = path.join(__dirname, '..', 'lib');

if (!fs.existsSync(LIB_DIR)) {
  fs.mkdirSync(LIB_DIR, { recursive: true });
}

// 1. Generate Hijri Dates (e.g. 1 Ramadan 1445)
// We'll generate combinations for the holy months and some specific days as top priorities
const hijriMonths = [
  "Muharram", "Safar", "Rabi-al-Awwal", "Rabi-al-Thani",
  "Jumada-al-Awwal", "Jumada-al-Thani", "Rajab", "Shaban",
  "Ramadan", "Shawwal", "Dhul-Qadah", "Dhul-Hijjah"
];
const hijriYears = [1444, 1445, 1446, 1447, 1448];

function generateHijriCombinations() {
  const combinations = [];
  // For PSEO, we don't want to pre-build 365 * 5 pages (1800+ pages) which might slow down Vercel build.
  // Instead, we'll pre-build the top 100 most searched dates, like 1st of every month, 15th of Sha'ban, 27th Rajab, etc.
  for (const year of hijriYears) {
    for (const month of hijriMonths) {
      combinations.push({ day: "1", month: month.toLowerCase(), year: year.toString() });
      if (month === "Ramadan" || month === "Shawwal" || month === "Dhul-Hijjah") {
        // High traffic months, add more days
        combinations.push({ day: "10", month: month.toLowerCase(), year: year.toString() });
        combinations.push({ day: "15", month: month.toLowerCase(), year: year.toString() });
        combinations.push({ day: "27", month: month.toLowerCase(), year: year.toString() });
      }
    }
  }
  return combinations;
}

// 2. Generate Currency Pairs (e.g. 100 USD to EUR)
const topCurrencies = ["USD", "EUR", "GBP", "SAR", "AED", "KWD", "QAR", "BHD", "OMR", "JOD", "EGP", "TRY"];
const popularAmounts = ["1", "10", "100", "500", "1000"];

function generateCurrencyCombinations() {
  const combinations = [];
  for (const amount of popularAmounts) {
    for (const from of topCurrencies) {
      for (const to of topCurrencies) {
        if (from !== to) {
          combinations.push({ amount, from: from.toLowerCase(), to: to.toLowerCase() });
        }
      }
    }
  }
  // Let's cap it to top 200 combinations to prevent Vercel build timeout
  return combinations.slice(0, 200);
}

// 3. Generate Zakat Combinations (e.g. 100 grams of 21k gold)
const goldGrams = ["50", "85", "100", "150", "200", "500", "1000"];
const goldKarats = ["24k", "22k", "21k", "18k"];

function generateZakatCombinations() {
  const combinations = [];
  for (const grams of goldGrams) {
    for (const karat of goldKarats) {
      combinations.push({ grams, karat });
    }
  }
  return combinations;
}

// Write to files
fs.writeFileSync(path.join(LIB_DIR, 'pseo-hijri.json'), JSON.stringify(generateHijriCombinations(), null, 2));
console.log(`[+] Generated ${generateHijriCombinations().length} Hijri combinations.`);

fs.writeFileSync(path.join(LIB_DIR, 'pseo-currency.json'), JSON.stringify(generateCurrencyCombinations(), null, 2));
console.log(`[+] Generated ${generateCurrencyCombinations().length} Currency combinations.`);

fs.writeFileSync(path.join(LIB_DIR, 'pseo-zakat.json'), JSON.stringify(generateZakatCombinations(), null, 2));
console.log(`[+] Generated ${generateZakatCombinations().length} Zakat combinations.`);

console.log("[+] PSEO Data generation complete.");
