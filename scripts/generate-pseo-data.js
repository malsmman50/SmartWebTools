const fs = require('fs');
const path = require('path');

const LIB_DIR = path.join(__dirname, '..', 'lib');
if (!fs.existsSync(LIB_DIR)) fs.mkdirSync(LIB_DIR, { recursive: true });

// --- PHASE 1 ---
const hijriMonths = [
  "Muharram", "Safar", "Rabi-al-Awwal", "Rabi-al-Thani",
  "Jumada-al-Awwal", "Jumada-al-Thani", "Rajab", "Shaban",
  "Ramadan", "Shawwal", "Dhul-Qadah", "Dhul-Hijjah"
];
const hijriYears = [1444, 1445, 1446, 1447, 1448];

function generateHijriCombinations() {
  const combs = [];
  for (const year of hijriYears) {
    for (const month of hijriMonths) {
      combs.push({ day: "1", month: month.toLowerCase(), year: year.toString() });
      if (["Ramadan", "Shawwal", "Dhul-Hijjah"].includes(month)) {
        combs.push({ day: "10", month: month.toLowerCase(), year: year.toString() });
        combs.push({ day: "15", month: month.toLowerCase(), year: year.toString() });
        combs.push({ day: "27", month: month.toLowerCase(), year: year.toString() });
      }
    }
  }
  return combs;
}

const topCurrencies = ["USD", "EUR", "GBP", "SAR", "AED", "KWD", "QAR", "BHD", "OMR", "JOD", "EGP", "TRY"];
const popularAmounts = ["1", "10", "100", "500", "1000"];

function generateCurrencyCombinations() {
  const combs = [];
  for (const amount of popularAmounts) {
    for (const from of topCurrencies) {
      for (const to of topCurrencies) {
        if (from !== to) combs.push({ amount, from: from.toLowerCase(), to: to.toLowerCase() });
      }
    }
  }
  return combs.slice(0, 200);
}

function generateZakatCombinations() {
  const combs = [];
  for (const grams of ["50", "85", "100", "150", "200", "500", "1000"]) {
    for (const karat of ["24k", "22k", "21k", "18k"]) {
      combs.push({ grams, karat });
    }
  }
  return combs;
}

// --- PHASE 2: Financial Calculators ---
function generateMurabahaCombinations() {
  const combs = [];
  for (const amount of ["5000", "10000", "20000", "50000", "100000"]) {
    for (const years of ["1", "3", "5", "10"]) {
      combs.push({ amount, years });
    }
  }
  return combs;
}

function generateMudarabahCombinations() {
  const combs = [];
  for (const amount of ["5000", "10000", "50000", "100000"]) {
    for (const roi of ["5", "10", "15", "20"]) {
      combs.push({ amount, roi });
    }
  }
  return combs;
}

function generateIslamicDepositCombinations() {
  const combs = [];
  for (const amount of ["5000", "10000", "50000", "100000"]) {
    for (const months of ["3", "6", "12", "24", "60"]) {
      combs.push({ amount, months });
    }
  }
  return combs;
}

function generateSukukCombinations() {
  const combs = [];
  for (const amount of ["10000", "50000", "100000"]) {
    for (const rate of ["3", "5", "7"]) {
      for (const years of ["5", "10"]) {
        combs.push({ amount, rate, years });
      }
    }
  }
  return combs;
}

function generateRoiCombinations() {
  const combs = [];
  for (const amount of ["1000", "5000", "10000", "50000"]) {
    for (const returnAmt of ["100", "500", "1000", "5000"]) {
      combs.push({ amount, returnAmt });
    }
  }
  return combs;
}

// --- PHASE 2: Utility Tools ---
function generateDataConverterCombinations() {
  const formats = ["json", "xml", "csv", "yaml"];
  const combs = [];
  for (const from of formats) {
    for (const to of formats) {
      if (from !== to) combs.push({ from, to });
    }
  }
  return combs;
}

function generatePasswordCombinations() {
  const combs = [];
  for (const length of ["8", "12", "16", "24", "32"]) {
    combs.push({ length });
  }
  return combs;
}

function generateQiblaCombinations() {
  const cities = ["london", "new-york", "dubai", "istanbul", "kuala-lumpur", "jakarta", "sydney", "toronto", "paris", "berlin", "cairo", "riyadh"];
  return cities.map(city => ({ city }));
}

function generateCronCombinations() {
  return [
    { slug: "every-5-minutes" },
    { slug: "every-hour" },
    { slug: "every-day-at-midnight" },
    { slug: "every-monday" }
  ];
}

// Write to files
const writeData = (filename, data) => {
  fs.writeFileSync(path.join(LIB_DIR, filename), JSON.stringify(data, null, 2));
  console.log(`[+] Generated ${data.length} ${filename.split('.')[0]} combinations.`);
};

writeData('pseo-hijri.json', generateHijriCombinations());
writeData('pseo-currency.json', generateCurrencyCombinations());
writeData('pseo-zakat.json', generateZakatCombinations());
writeData('pseo-murabaha.json', generateMurabahaCombinations());
writeData('pseo-mudarabah.json', generateMudarabahCombinations());
writeData('pseo-islamic-deposit.json', generateIslamicDepositCombinations());
writeData('pseo-sukuk.json', generateSukukCombinations());
writeData('pseo-roi.json', generateRoiCombinations());
writeData('pseo-data-converter.json', generateDataConverterCombinations());
writeData('pseo-password.json', generatePasswordCombinations());
writeData('pseo-qibla.json', generateQiblaCombinations());
writeData('pseo-cron.json', generateCronCombinations());

console.log("[+] PSEO Data generation Phase 2 complete.");
