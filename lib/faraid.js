// Islamic inheritance (Faraid) engine.
//
// Juristic basis (documented for the human Sharia reviewer):
// - Hanafi position on the grandfather: he blocks all siblings (like the father).
// - Al-Umariyyatan: spouse + both parents, no descendants, fewer than two
//   siblings -> the mother takes 1/3 of the remainder after the spouse.
// - Radd (majority/jumhur): surplus with no residuary returns to the fard
//   heirs pro-rata, excluding the spouses. Spouse-only estates leave the
//   surplus to Bayt al-Mal.
// - Asaba chain implemented down to: son's sons, brothers' sons (full then
//   paternal), then uncles (full then paternal). More distant agnates
//   (uncles' sons etc.) are out of scope and reported as unallocated.
export function calculateFaraid(input) {
  const {
    estateValue,
    spouseType, wivesCount,
    sons, daughters,
    father, mother,
    paternalGrandfather, paternalGrandmother, maternalGrandmother,
    fullBrothers, fullSisters,
    paternalBrothers, paternalSisters,
    maternalSiblings,
    sonsOfSons = 0, daughtersOfSons = 0,
    fullNephews = 0, paternalNephews = 0,
    fullUncles = 0, paternalUncles = 0
  } = input;

  let shares = []; // { key, nameAr, nameEn, fraction, amount, count }

  // Grandchildren through sons are blocked entirely by any living son.
  const activeSonsOfSons = sons > 0 ? 0 : sonsOfSons;
  const activeDaughtersOfSons = sons > 0 ? 0 : daughtersOfSons;

  const hasMaleDescendant = sons > 0 || activeSonsOfSons > 0;
  const hasFemaleDescendant = daughters > 0 || activeDaughtersOfSons > 0;
  const hasDescendant = hasMaleDescendant || hasFemaleDescendant;
  const totalSiblingsCount = fullBrothers + fullSisters + paternalBrothers + paternalSisters + maternalSiblings;

  // --- HAJB (Blocking Rules) ---
  const isPaternalGrandfatherBlocked = father;
  const isMaternalGrandmotherBlocked = mother;
  const isPaternalGrandmotherBlocked = mother || father;
  const activeGrandfather = paternalGrandfather && !isPaternalGrandfatherBlocked;

  // Hanafi: Father, male descendant, Grandfather block all siblings
  const siblingsBlockedByRootOrBranch = father || hasMaleDescendant || activeGrandfather;

  const isMaternalSiblingsBlocked = siblingsBlockedByRootOrBranch || hasFemaleDescendant;
  const isFullSistersBlocked = siblingsBlockedByRootOrBranch;
  const isPaternalSistersBlocked = siblingsBlockedByRootOrBranch || fullBrothers > 0 || (fullSisters >= 2 && paternalBrothers === 0);

  // --- FUROODH (Fixed Shares) ---
  let assignedFractions = {}; // key -> fraction

  // 1. Spouses
  if (spouseType === 'husband') {
    assignedFractions['husband'] = hasDescendant ? 1/4 : 1/2;
  } else if (spouseType === 'wife' && wivesCount > 0) {
    assignedFractions['wives'] = hasDescendant ? 1/8 : 1/4;
  }
  const spouseShare = assignedFractions['husband'] || assignedFractions['wives'] || 0;

  // 2. Mother
  if (mother) {
    // Al-Umariyyatan: spouse + father + mother, no descendants, fewer than
    // two siblings. Grandparents are irrelevant here: both parents being
    // alive blocks all of them.
    if (spouseShare > 0 && father && !hasDescendant && totalSiblingsCount < 2) {
      assignedFractions['mother'] = (1 - spouseShare) / 3;
    } else {
      assignedFractions['mother'] = (hasDescendant || totalSiblingsCount >= 2) ? 1/6 : 1/3;
    }
  }

  // 3. Grandmothers
  let activeGrandmothers = 0;
  if (!isMaternalGrandmotherBlocked && maternalGrandmother) activeGrandmothers++;
  if (!isPaternalGrandmotherBlocked && paternalGrandmother) activeGrandmothers++;
  if (activeGrandmothers > 0) {
    assignedFractions['grandmothers'] = 1/6;
  }

  // 4. Father & Paternal Grandfather (as Furoodh alongside descendants)
  if (father) {
    if (hasDescendant) assignedFractions['father'] = 1/6;
  } else if (activeGrandfather) {
    if (hasDescendant) assignedFractions['paternalGrandfather'] = 1/6;
  }

  // 5. Daughters (if no sons)
  if (daughters > 0 && sons === 0) {
    assignedFractions['daughters'] = daughters === 1 ? 1/2 : 2/3;
  }

  // 5b. Son's daughters (fard only when no son's sons to make them asaba):
  //     - no daughters: 1/2 (one) or 2/3 (two+)
  //     - one daughter: 1/6 (completing the two-thirds)
  //     - two+ daughters: blocked (no rescuer)
  if (activeDaughtersOfSons > 0 && activeSonsOfSons === 0) {
    if (daughters === 0) {
      assignedFractions['daughtersOfSons'] = activeDaughtersOfSons === 1 ? 1/2 : 2/3;
    } else if (daughters === 1) {
      assignedFractions['daughtersOfSons'] = 1/6;
    }
    // daughters >= 2 -> blocked
  }

  // 6. Maternal Siblings
  if (maternalSiblings > 0 && !isMaternalSiblingsBlocked) {
    assignedFractions['maternalSiblings'] = maternalSiblings === 1 ? 1/6 : 1/3;
  }

  // 7. Full Sisters (fard only without descendants; with female descendants
  //    they become asaba ma'a al-ghayr — handled in Taseeb)
  if (fullSisters > 0 && !isFullSistersBlocked && fullBrothers === 0 && !hasDescendant) {
    assignedFractions['fullSisters'] = fullSisters === 1 ? 1/2 : 2/3;
  }

  // 8. Paternal Sisters
  if (paternalSisters > 0 && !isPaternalSistersBlocked && paternalBrothers === 0 && !hasDescendant) {
    if (fullSisters === 0) {
      assignedFractions['paternalSisters'] = paternalSisters === 1 ? 1/2 : 2/3;
    } else if (fullSisters === 1) {
      assignedFractions['paternalSisters'] = 1/6; // Completion to 2/3
    }
  }

  // --- AWL (Proportional Reduction) ---
  let sumFractions = Object.values(assignedFractions).reduce((a, b) => a + b, 0);

  if (sumFractions > 1.0001) {
    for (let key in assignedFractions) {
      assignedFractions[key] = assignedFractions[key] / sumFractions;
    }
    sumFractions = 1.0;
  }

  // --- TASEEB (Residuaries) ---
  let remainder = 1.0 - sumFractions;
  if (remainder < 0.0001) remainder = 0;

  let asabaShares = {};
  let asabaTook = false;

  const sistersMaalGhayr = fullSisters > 0 && !isFullSistersBlocked && fullBrothers === 0 && hasFemaleDescendant;
  const paternalSistersMaalGhayr = paternalSisters > 0 && !isPaternalSistersBlocked && paternalBrothers === 0 && hasFemaleDescendant && !sistersMaalGhayr;

  if (remainder > 0.0001) {
    asabaTook = true;
    if (sons > 0) {
      // 1. Sons & daughters (2:1)
      const totalParts = (sons * 2) + daughters;
      const part = remainder / totalParts;
      asabaShares['sons'] = part * 2 * sons;
      if (daughters > 0) {
        asabaShares['daughters'] = (assignedFractions['daughters'] || 0) + (part * daughters);
        delete assignedFractions['daughters'];
      }
    } else if (activeSonsOfSons > 0) {
      // 2. Son's sons & son's daughters (2:1), after the daughters' fard
      const totalParts = (activeSonsOfSons * 2) + activeDaughtersOfSons;
      const part = remainder / totalParts;
      asabaShares['sonsOfSons'] = part * 2 * activeSonsOfSons;
      if (activeDaughtersOfSons > 0) {
        asabaShares['daughtersOfSons'] = part * activeDaughtersOfSons;
      }
    } else if (father) {
      // 3. Father
      asabaShares['father'] = (assignedFractions['father'] || 0) + remainder;
      delete assignedFractions['father'];
    } else if (activeGrandfather) {
      // 4. Grandfather
      asabaShares['paternalGrandfather'] = (assignedFractions['paternalGrandfather'] || 0) + remainder;
      delete assignedFractions['paternalGrandfather'];
    } else if (fullBrothers > 0 || sistersMaalGhayr) {
      // 5. Full brothers (2:1 with full sisters), or full sisters as
      //    asaba ma'a al-ghayr alongside female descendants
      if (fullBrothers > 0) {
        const totalParts = (fullBrothers * 2) + fullSisters;
        const part = remainder / totalParts;
        asabaShares['fullBrothers'] = part * 2 * fullBrothers;
        if (fullSisters > 0) asabaShares['fullSisters'] = part * fullSisters;
      } else {
        asabaShares['fullSisters'] = remainder;
      }
    } else if (paternalBrothers > 0 || paternalSistersMaalGhayr) {
      // 6. Paternal brothers/sisters
      if (paternalBrothers > 0) {
        const totalParts = (paternalBrothers * 2) + paternalSisters;
        const part = remainder / totalParts;
        asabaShares['paternalBrothers'] = part * 2 * paternalBrothers;
        if (paternalSisters > 0) {
          asabaShares['paternalSisters'] = (assignedFractions['paternalSisters'] || 0) + (part * paternalSisters);
          delete assignedFractions['paternalSisters'];
        }
      } else {
        asabaShares['paternalSisters'] = (assignedFractions['paternalSisters'] || 0) + remainder;
        delete assignedFractions['paternalSisters'];
      }
    } else if (fullNephews > 0) {
      // 7. Sons of full brothers
      asabaShares['fullNephews'] = remainder;
    } else if (paternalNephews > 0) {
      // 8. Sons of paternal brothers
      asabaShares['paternalNephews'] = remainder;
    } else if (fullUncles > 0) {
      // 9. Full paternal uncles
      asabaShares['fullUncles'] = remainder;
    } else if (paternalUncles > 0) {
      // 10. Paternal half-uncles
      asabaShares['paternalUncles'] = remainder;
    } else {
      asabaTook = false;
    }
  }

  // --- RADD (Return of the surplus) ---
  // No residuary took the remainder: return it pro-rata to the fard heirs,
  // excluding the spouses (jumhur). Spouse-only estates keep the surplus
  // unallocated (Bayt al-Mal).
  let unallocatedFraction = 0;
  if (!asabaTook && remainder > 0.0001) {
    const raddKeys = Object.keys(assignedFractions).filter(k => k !== 'husband' && k !== 'wives');
    const raddSum = raddKeys.reduce((a, k) => a + assignedFractions[k], 0);
    if (raddSum > 0.0001) {
      const scale = (1 - spouseShare) / raddSum;
      for (const k of raddKeys) {
        assignedFractions[k] = assignedFractions[k] * scale;
      }
    } else {
      unallocatedFraction = remainder;
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
  addShare('sonsOfSons', 'أبناء الابن', "Son's Sons", finalFractions['sonsOfSons'] || 0, activeSonsOfSons);
  addShare('daughtersOfSons', 'بنات الابن', "Son's Daughters", finalFractions['daughtersOfSons'] || 0, activeDaughtersOfSons);
  addShare('fullBrothers', 'الإخوة الأشقاء', 'Full Brothers', finalFractions['fullBrothers'] || 0, fullBrothers);
  addShare('fullSisters', 'الأخوات الشقيقات', 'Full Sisters', finalFractions['fullSisters'] || 0, fullSisters);
  addShare('paternalBrothers', 'الإخوة لأب', 'Paternal Brothers', finalFractions['paternalBrothers'] || 0, paternalBrothers);
  addShare('paternalSisters', 'الأخوات لأب', 'Paternal Sisters', finalFractions['paternalSisters'] || 0, paternalSisters);
  addShare('maternalSiblings', 'الإخوة لأم', 'Maternal Siblings', finalFractions['maternalSiblings'] || 0, maternalSiblings);
  addShare('fullNephews', 'أبناء الإخوة الأشقاء', "Full Brothers' Sons", finalFractions['fullNephews'] || 0, fullNephews);
  addShare('paternalNephews', 'أبناء الإخوة لأب', "Paternal Brothers' Sons", finalFractions['paternalNephews'] || 0, paternalNephews);
  addShare('fullUncles', 'الأعمام الأشقاء', 'Full Paternal Uncles', finalFractions['fullUncles'] || 0, fullUncles);
  addShare('paternalUncles', 'الأعمام لأب', 'Paternal Half-Uncles', finalFractions['paternalUncles'] || 0, paternalUncles);

  return {
    total: estateValue,
    shares,
    unallocated: unallocatedFraction > 0.0001 ? unallocatedFraction * estateValue : 0
  };
}
