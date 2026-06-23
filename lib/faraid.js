export function calculateFaraid(input) {
  const {
    estateValue,
    spouseType, wivesCount,
    sons, daughters,
    father, mother,
    paternalGrandfather, paternalGrandmother, maternalGrandmother,
    fullBrothers, fullSisters,
    paternalBrothers, paternalSisters,
    maternalSiblings
  } = input;

  let shares = []; // { key, nameAr, nameEn, fraction, amount, count }
  
  const hasChildren = sons > 0 || daughters > 0;
  const totalSiblingsCount = fullBrothers + fullSisters + paternalBrothers + paternalSisters + maternalSiblings;

  // --- HAJB (Blocking Rules) ---
  const isPaternalGrandfatherBlocked = father;
  const isMaternalGrandmotherBlocked = mother;
  const isPaternalGrandmotherBlocked = mother || father;
  
  // Hanafi: Father, Son, Grandfather block all siblings
  const siblingsBlockedByRootOrBranch = father || sons > 0 || (!isPaternalGrandfatherBlocked && paternalGrandfather);
  
  const isMaternalSiblingsBlocked = siblingsBlockedByRootOrBranch || daughters > 0;
  const isFullBrothersBlocked = siblingsBlockedByRootOrBranch;
  const isFullSistersBlocked = siblingsBlockedByRootOrBranch;
  
  const isPaternalBrothersBlocked = siblingsBlockedByRootOrBranch || fullBrothers > 0;
  // Paternal sisters are blocked if 2+ full sisters and no paternal brother to "rescue" them
  const isPaternalSistersBlocked = siblingsBlockedByRootOrBranch || fullBrothers > 0 || (fullSisters >= 2 && paternalBrothers === 0);

  // --- FUROODH (Fixed Shares) ---
  let assignedFractions = {}; // key -> fraction

  // 1. Spouses
  if (spouseType === 'husband') {
    assignedFractions['husband'] = hasChildren ? 1/4 : 1/2;
  } else if (spouseType === 'wife' && wivesCount > 0) {
    assignedFractions['wives'] = hasChildren ? 1/8 : 1/4;
  }

  // 2. Mother
  if (mother) {
    // Al-Umariyyatan: Spouse + Parents, no children, no siblings
    if (!hasChildren && totalSiblingsCount < 2 && father && !paternalGrandfather && !maternalGrandmother && !paternalGrandmother && sons===0 && daughters===0 && totalSiblingsCount===0) {
      // Mother gets 1/3 of the REMAINDER after spouse
      const spouseShare = assignedFractions['husband'] || assignedFractions['wives'] || 0;
      assignedFractions['mother'] = (1 - spouseShare) / 3;
    } else {
      assignedFractions['mother'] = (hasChildren || totalSiblingsCount >= 2) ? 1/6 : 1/3;
    }
  }

  // 3. Grandmothers
  let activeGrandmothers = 0;
  if (!isMaternalGrandmotherBlocked && maternalGrandmother) activeGrandmothers++;
  if (!isPaternalGrandmotherBlocked && paternalGrandmother) activeGrandmothers++;
  if (activeGrandmothers > 0) {
    assignedFractions['grandmothers'] = 1/6;
  }

  // 4. Father & Paternal Grandfather (as Furoodh)
  if (father) {
    if (sons > 0) {
      assignedFractions['father'] = 1/6;
    } else if (daughters > 0) {
      assignedFractions['father'] = 1/6; // He also gets Asaba later
    }
  } else if (paternalGrandfather && !isPaternalGrandfatherBlocked) {
    if (sons > 0) {
      assignedFractions['paternalGrandfather'] = 1/6;
    } else if (daughters > 0) {
      assignedFractions['paternalGrandfather'] = 1/6; 
    }
  }

  // 5. Daughters (if no sons)
  if (daughters > 0 && sons === 0) {
    assignedFractions['daughters'] = daughters === 1 ? 1/2 : 2/3;
  }

  // 6. Maternal Siblings
  if (maternalSiblings > 0 && !isMaternalSiblingsBlocked) {
    assignedFractions['maternalSiblings'] = maternalSiblings === 1 ? 1/6 : 1/3;
  }

  // 7. Full Sisters (if no full brothers, no children, no father/grandfather)
  if (fullSisters > 0 && !isFullSistersBlocked && fullBrothers === 0 && daughters === 0) {
    assignedFractions['fullSisters'] = fullSisters === 1 ? 1/2 : 2/3;
  }

  // 8. Paternal Sisters (if no paternal brothers, no full brothers, no children, etc.)
  if (paternalSisters > 0 && !isPaternalSistersBlocked && paternalBrothers === 0 && daughters === 0) {
    if (fullSisters === 0) {
      assignedFractions['paternalSisters'] = paternalSisters === 1 ? 1/2 : 2/3;
    } else if (fullSisters === 1) {
      assignedFractions['paternalSisters'] = 1/6; // Completion to 2/3
    }
  }

  // --- AWL (Proportional Reduction) ---
  let sumFractions = Object.values(assignedFractions).reduce((a, b) => a + b, 0);
  
  if (sumFractions > 1.0001) { // Floating point safety
    // Apply Awl: recalculate fractions over the new sum
    for (let key in assignedFractions) {
      assignedFractions[key] = assignedFractions[key] / sumFractions;
    }
    sumFractions = 1.0;
  }

  // --- TASEEB (Residuaries) ---
  let remainder = 1.0 - sumFractions;
  if (remainder < -0.0001) remainder = 0; // Sanity check

  let asabaShares = {};

  if (remainder > 0.0001) {
    if (sons > 0) {
      // 1. Sons & Daughters
      const totalParts = (sons * 2) + daughters;
      const part = remainder / totalParts;
      if (sons > 0) asabaShares['sons'] = part * 2 * sons;
      if (daughters > 0) asabaShares['daughters'] = (assignedFractions['daughters'] || 0) + (part * daughters);
      delete assignedFractions['daughters']; // merge into asaba
    } else if (father) {
      // 2. Father gets remainder
      asabaShares['father'] = (assignedFractions['father'] || 0) + remainder;
      delete assignedFractions['father'];
    } else if (paternalGrandfather && !isPaternalGrandfatherBlocked) {
      asabaShares['paternalGrandfather'] = (assignedFractions['paternalGrandfather'] || 0) + remainder;
      delete assignedFractions['paternalGrandfather'];
    } else if (fullBrothers > 0 || (fullSisters > 0 && daughters > 0 && !isFullSistersBlocked)) {
      // 3. Full Brothers & Sisters (or Sisters becoming Asaba with daughters)
      if (fullBrothers > 0) {
        const totalParts = (fullBrothers * 2) + fullSisters;
        const part = remainder / totalParts;
        asabaShares['fullBrothers'] = part * 2 * fullBrothers;
        if (fullSisters > 0) asabaShares['fullSisters'] = part * fullSisters;
      } else {
        // Asaba Ma'al Ghayr: Sisters take remainder because of daughters
        asabaShares['fullSisters'] = remainder;
      }
    } else if (paternalBrothers > 0 || (paternalSisters > 0 && daughters > 0 && !isPaternalSistersBlocked)) {
      // 4. Paternal Brothers & Sisters
      if (paternalBrothers > 0) {
        const totalParts = (paternalBrothers * 2) + paternalSisters;
        const part = remainder / totalParts;
        asabaShares['paternalBrothers'] = part * 2 * paternalBrothers;
        if (paternalSisters > 0) asabaShares['paternalSisters'] = (assignedFractions['paternalSisters'] || 0) + (part * paternalSisters);
        delete assignedFractions['paternalSisters'];
      } else {
        asabaShares['paternalSisters'] = (assignedFractions['paternalSisters'] || 0) + remainder;
        delete assignedFractions['paternalSisters'];
      }
    }
  }

  // Combine and format output
  const addShare = (key, nameAr, nameEn, fraction, count) => {
    if (fraction > 0.0001) {
      shares.push({
        key,
        nameAr: count > 1 ? `${nameAr} (${count})` : nameAr,
        nameEn: count > 1 ? `${nameEn} (${count})` : nameEn,
        fraction: fraction,
        amount: fraction * estateValue,
        perPerson: count > 1 ? (fraction * estateValue) / count : fraction * estateValue
      });
    }
  };

  const finalFractions = { ...assignedFractions, ...asabaShares };

  addShare('husband', 'الزوج', 'Husband', finalFractions['husband'] || 0, 1);
  addShare('wives', 'الزوجة / الزوجات', 'Wife / Wives', finalFractions['wives'] || 0, wivesCount);
  addShare('father', 'الأب', 'Father', finalFractions['father'] || 0, 1);
  addShare('mother', 'الأم', 'Mother', finalFractions['mother'] || 0, 1);
  addShare('paternalGrandfather', 'الجد (أبو الأب)', 'Paternal Grandfather', finalFractions['paternalGrandfather'] || 0, 1);
  addShare('grandmothers', 'الجدة / الجدات', 'Grandmother(s)', finalFractions['grandmothers'] || 0, activeGrandmothers);
  addShare('sons', 'الأبناء', 'Sons', finalFractions['sons'] || 0, sons);
  addShare('daughters', 'البنات', 'Daughters', finalFractions['daughters'] || 0, daughters);
  addShare('fullBrothers', 'الإخوة الأشقاء', 'Full Brothers', finalFractions['fullBrothers'] || 0, fullBrothers);
  addShare('fullSisters', 'الأخوات الشقيقات', 'Full Sisters', finalFractions['fullSisters'] || 0, fullSisters);
  addShare('paternalBrothers', 'الإخوة لأب', 'Paternal Brothers', finalFractions['paternalBrothers'] || 0, paternalBrothers);
  addShare('paternalSisters', 'الأخوات لأب', 'Paternal Sisters', finalFractions['paternalSisters'] || 0, paternalSisters);
  addShare('maternalSiblings', 'الإخوة لأم', 'Maternal Siblings', finalFractions['maternalSiblings'] || 0, maternalSiblings);

  return {
    total: estateValue,
    shares,
    unallocated: Object.keys(asabaShares).length === 0 && remainder > 0.0001 ? remainder * estateValue : 0
  };
}
