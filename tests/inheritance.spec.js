const { test, expect } = require('@playwright/test');
const { calculateFaraid } = require('../lib/faraid');

// Pure unit tests of the Faraid engine against reference cases from the
// classical inheritance literature. Estate value is 1 so every amount is
// directly the fraction of the estate.
const base = (overrides) => ({
  estateValue: 1,
  spouseType: 'none', wivesCount: 0,
  sons: 0, daughters: 0,
  father: false, mother: false,
  paternalGrandfather: false, paternalGrandmother: false, maternalGrandmother: false,
  fullBrothers: 0, fullSisters: 0,
  paternalBrothers: 0, paternalSisters: 0,
  maternalSiblings: 0,
  sonsOfSons: 0, daughtersOfSons: 0,
  fullNephews: 0, paternalNephews: 0,
  fullUncles: 0, paternalUncles: 0,
  ...overrides
});

const share = (res, key) => {
  const s = res.shares.find(x => x.key === key);
  return s ? s.fraction : 0;
};

test.describe('Faraid engine — Umariyyatan', () => {
  test('husband + mother + father: 1/2, 1/6, 1/3', () => {
    const r = calculateFaraid(base({ spouseType: 'husband', mother: true, father: true }));
    expect(share(r, 'husband')).toBeCloseTo(1/2, 6);
    expect(share(r, 'mother')).toBeCloseTo(1/6, 6);
    expect(share(r, 'father')).toBeCloseTo(1/3, 6);
  });

  test('wife + mother + father: 1/4, 1/4, 1/2', () => {
    const r = calculateFaraid(base({ spouseType: 'wife', wivesCount: 1, mother: true, father: true }));
    expect(share(r, 'wives')).toBeCloseTo(1/4, 6);
    expect(share(r, 'mother')).toBeCloseTo(1/4, 6);
    expect(share(r, 'father')).toBeCloseTo(1/2, 6);
  });

  test('parents only (no spouse): mother 1/3 of the whole, father 2/3', () => {
    const r = calculateFaraid(base({ mother: true, father: true }));
    expect(share(r, 'mother')).toBeCloseTo(1/3, 6);
    expect(share(r, 'father')).toBeCloseTo(2/3, 6);
  });

  test('husband + parents + one brother: Umariyya still applies (siblings < 2)', () => {
    const r = calculateFaraid(base({ spouseType: 'husband', mother: true, father: true, fullBrothers: 1 }));
    expect(share(r, 'husband')).toBeCloseTo(1/2, 6);
    expect(share(r, 'mother')).toBeCloseTo(1/6, 6);
    expect(share(r, 'father')).toBeCloseTo(1/3, 6);
    expect(share(r, 'fullBrothers')).toBeCloseTo(0, 6);
  });

  test('husband + parents + two brothers: mother reduced to 1/6 (no Umariyya)', () => {
    const r = calculateFaraid(base({ spouseType: 'husband', mother: true, father: true, fullBrothers: 2 }));
    expect(share(r, 'husband')).toBeCloseTo(1/2, 6);
    expect(share(r, 'mother')).toBeCloseTo(1/6, 6);
    expect(share(r, 'father')).toBeCloseTo(1/3, 6);
  });
});

test.describe('Faraid engine — Radd', () => {
  test('mother + one daughter: 1/4, 3/4 after radd', () => {
    const r = calculateFaraid(base({ mother: true, daughters: 1 }));
    expect(share(r, 'mother')).toBeCloseTo(1/4, 6);
    expect(share(r, 'daughters')).toBeCloseTo(3/4, 6);
    expect(r.unallocated).toBeCloseTo(0, 6);
  });

  test('mother + two daughters: 1/5, 4/5 after radd', () => {
    const r = calculateFaraid(base({ mother: true, daughters: 2 }));
    expect(share(r, 'mother')).toBeCloseTo(1/5, 6);
    expect(share(r, 'daughters')).toBeCloseTo(4/5, 6);
  });

  test('wife + mother + one daughter: spouse excluded from radd (1/8, 7/32, 21/32)', () => {
    const r = calculateFaraid(base({ spouseType: 'wife', wivesCount: 1, mother: true, daughters: 1 }));
    expect(share(r, 'wives')).toBeCloseTo(1/8, 6);
    expect(share(r, 'mother')).toBeCloseTo(7/32, 6);
    expect(share(r, 'daughters')).toBeCloseTo(21/32, 6);
  });

  test('mother + two maternal siblings: 1/3, 2/3 after radd', () => {
    const r = calculateFaraid(base({ mother: true, maternalSiblings: 2 }));
    expect(share(r, 'mother')).toBeCloseTo(1/3, 6);
    expect(share(r, 'maternalSiblings')).toBeCloseTo(2/3, 6);
  });

  test('husband only: no radd to spouse, surplus unallocated', () => {
    const r = calculateFaraid(base({ spouseType: 'husband' }));
    expect(share(r, 'husband')).toBeCloseTo(1/2, 6);
    expect(r.unallocated).toBeCloseTo(1/2, 6);
  });
});

test.describe('Faraid engine — Awl', () => {
  test('husband + two full sisters: 3/7, 4/7', () => {
    const r = calculateFaraid(base({ spouseType: 'husband', fullSisters: 2 }));
    expect(share(r, 'husband')).toBeCloseTo(3/7, 6);
    expect(share(r, 'fullSisters')).toBeCloseTo(4/7, 6);
  });

  test('husband + mother + one full sister: 3/8, 2/8, 3/8', () => {
    const r = calculateFaraid(base({ spouseType: 'husband', mother: true, fullSisters: 1 }));
    expect(share(r, 'husband')).toBeCloseTo(3/8, 6);
    expect(share(r, 'mother')).toBeCloseTo(2/8, 6);
    expect(share(r, 'fullSisters')).toBeCloseTo(3/8, 6);
  });
});

test.describe("Faraid engine — son's children", () => {
  test('a son blocks all grandchildren', () => {
    const r = calculateFaraid(base({ sons: 1, sonsOfSons: 1, daughtersOfSons: 1 }));
    expect(share(r, 'sons')).toBeCloseTo(1, 6);
    expect(share(r, 'sonsOfSons')).toBeCloseTo(0, 6);
    expect(share(r, 'daughtersOfSons')).toBeCloseTo(0, 6);
  });

  test("one daughter + one son's daughter + full brother: 1/2, 1/6, 1/3", () => {
    const r = calculateFaraid(base({ daughters: 1, daughtersOfSons: 1, fullBrothers: 1 }));
    expect(share(r, 'daughters')).toBeCloseTo(1/2, 6);
    expect(share(r, 'daughtersOfSons')).toBeCloseTo(1/6, 6);
    expect(share(r, 'fullBrothers')).toBeCloseTo(1/3, 6);
  });

  test("two daughters block the son's daughter (no rescuer)", () => {
    const r = calculateFaraid(base({ daughters: 2, daughtersOfSons: 1, fullBrothers: 1 }));
    expect(share(r, 'daughters')).toBeCloseTo(2/3, 6);
    expect(share(r, 'daughtersOfSons')).toBeCloseTo(0, 6);
    expect(share(r, 'fullBrothers')).toBeCloseTo(1/3, 6);
  });

  test("son's son rescues the son's daughter (2:1 in the remainder)", () => {
    const r = calculateFaraid(base({ daughters: 2, sonsOfSons: 1, daughtersOfSons: 1 }));
    expect(share(r, 'daughters')).toBeCloseTo(2/3, 6);
    expect(share(r, 'sonsOfSons')).toBeCloseTo(2/9, 6);
    expect(share(r, 'daughtersOfSons')).toBeCloseTo(1/9, 6);
  });

  test("wife + son's son: grandson reduces the wife to 1/8 and takes the rest", () => {
    const r = calculateFaraid(base({ spouseType: 'wife', wivesCount: 1, sonsOfSons: 1 }));
    expect(share(r, 'wives')).toBeCloseTo(1/8, 6);
    expect(share(r, 'sonsOfSons')).toBeCloseTo(7/8, 6);
  });
});

test.describe('Faraid engine — nephews and uncles', () => {
  test("wife + full brother's son: 1/4, 3/4", () => {
    const r = calculateFaraid(base({ spouseType: 'wife', wivesCount: 1, fullNephews: 1 }));
    expect(share(r, 'wives')).toBeCloseTo(1/4, 6);
    expect(share(r, 'fullNephews')).toBeCloseTo(3/4, 6);
  });

  test('grandfather takes all before a nephew (Hanafi chain)', () => {
    const r = calculateFaraid(base({ paternalGrandfather: true, fullNephews: 1 }));
    expect(share(r, 'paternalGrandfather')).toBeCloseTo(1, 6);
    expect(share(r, 'fullNephews')).toBeCloseTo(0, 6);
  });

  test('mother + full uncle: 1/3, 2/3', () => {
    const r = calculateFaraid(base({ mother: true, fullUncles: 1 }));
    expect(share(r, 'mother')).toBeCloseTo(1/3, 6);
    expect(share(r, 'fullUncles')).toBeCloseTo(2/3, 6);
  });

  test('a nephew precedes an uncle', () => {
    const r = calculateFaraid(base({ fullNephews: 1, fullUncles: 1 }));
    expect(share(r, 'fullNephews')).toBeCloseTo(1, 6);
    expect(share(r, 'fullUncles')).toBeCloseTo(0, 6);
  });

  test('full sister takes 1/2 fard, nephew takes the residue', () => {
    const r = calculateFaraid(base({ fullSisters: 1, fullNephews: 1 }));
    expect(share(r, 'fullSisters')).toBeCloseTo(1/2, 6);
    expect(share(r, 'fullNephews')).toBeCloseTo(1/2, 6);
  });

  test("sister ma'a al-ghayr (with a daughter) precedes the nephew", () => {
    const r = calculateFaraid(base({ daughters: 1, fullSisters: 1, fullNephews: 1 }));
    expect(share(r, 'daughters')).toBeCloseTo(1/2, 6);
    expect(share(r, 'fullSisters')).toBeCloseTo(1/2, 6);
    expect(share(r, 'fullNephews')).toBeCloseTo(0, 6);
  });
});
