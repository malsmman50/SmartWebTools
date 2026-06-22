'use client';
import { useState } from 'react';

export default function InheritanceCalculator() {
  const [estateValue, setEstateValue] = useState('');
  
  // Primary Heirs
  const [spouseType, setSpouseType] = useState('none'); // 'none', 'husband', 'wife'
  const [wivesCount, setWivesCount] = useState(1); // 1 to 4 if spouseType is 'wife'
  
  const [sonsCount, setSonsCount] = useState(0);
  const [daughtersCount, setDaughtersCount] = useState(0);
  
  const [fatherAlive, setFatherAlive] = useState(false);
  const [motherAlive, setMotherAlive] = useState(false);

  const [results, setResults] = useState(null);

  const calculateInheritance = () => {
    const value = parseFloat(estateValue);
    if (isNaN(value) || value <= 0) {
      alert("Please enter a valid estate value.");
      return;
    }

    let shares = [];
    let remainingFraction = 1.0;
    const hasChildren = sonsCount > 0 || daughtersCount > 0;

    // 1. Spouse Share
    if (spouseType === 'husband') {
      const share = hasChildren ? (1 / 4) : (1 / 2);
      shares.push({ name: 'Husband', fraction: share, amount: value * share });
      remainingFraction -= share;
    } else if (spouseType === 'wife') {
      const share = hasChildren ? (1 / 8) : (1 / 4);
      shares.push({ name: `Wife / Wives (${wivesCount})`, fraction: share, amount: value * share, perPerson: (value * share) / wivesCount });
      remainingFraction -= share;
    }

    // 2. Parents Share
    if (motherAlive) {
      // Simplification: Mother gets 1/6 if children exist or multiple siblings exist (we assume no siblings here for simplicity, so 1/3 if no children)
      const share = hasChildren ? (1 / 6) : (1 / 3);
      shares.push({ name: 'Mother', fraction: share, amount: value * share });
      remainingFraction -= share;
    }

    let fatherShare = 0;
    if (fatherAlive) {
      if (hasChildren) {
        fatherShare = (1 / 6); // Gets 1/6 definitively if there are sons
        // If only daughters, he might get 1/6 + remainder. We will handle remainder later.
      } else {
        // Asaba (gets everything remaining) if no children
        fatherShare = remainingFraction; 
      }
      shares.push({ name: 'Father', fraction: fatherShare, amount: value * fatherShare });
      remainingFraction -= fatherShare;
    }

    // 3. Children Share (Ta'seeb)
    if (hasChildren) {
      if (sonsCount > 0) {
        // Males and females share the remainder (Male = 2 * Female)
        const totalParts = (sonsCount * 2) + daughtersCount;
        const partValue = (remainingFraction * value) / totalParts;
        
        if (sonsCount > 0) {
          shares.push({ name: `Sons (${sonsCount})`, amount: partValue * 2 * sonsCount, perPerson: partValue * 2 });
        }
        if (daughtersCount > 0) {
          shares.push({ name: `Daughters (${daughtersCount})`, amount: partValue * daughtersCount, perPerson: partValue });
        }
        remainingFraction = 0;
      } else if (daughtersCount > 0) {
        // Only daughters
        let daughterFraction = 0;
        if (daughtersCount === 1) daughterFraction = 1 / 2;
        else daughterFraction = 2 / 3;
        
        // Ensure we don't exceed remaining fraction (Awl - not fully handled in this simple version)
        if (daughterFraction > remainingFraction) daughterFraction = remainingFraction;
        
        shares.push({ name: `Daughters (${daughtersCount})`, fraction: daughterFraction, amount: value * daughterFraction, perPerson: (value * daughterFraction) / daughtersCount });
        remainingFraction -= daughterFraction;
        
        // If father is alive and there's remainder after daughters, father takes it (Ta'seeb)
        if (fatherAlive && remainingFraction > 0) {
          const fatherIndex = shares.findIndex(s => s.name === 'Father');
          if (fatherIndex > -1) {
            shares[fatherIndex].fraction += remainingFraction;
            shares[fatherIndex].amount += value * remainingFraction;
            remainingFraction = 0;
          }
        }
      }
    }

    setResults({
      total: value,
      shares: shares,
      unallocated: remainingFraction > 0.001 ? remainingFraction * value : 0 // Small tolerance for float math
    });
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '800px', margin: '40px auto' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px', textAlign: 'center' }}>Islamic Inheritance Calculator ⚖️</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Estimate the legal shares of primary heirs according to Islamic Sharia (Mawarith).
        </p>

        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem', lineHeight: '1.5' }}>
          <strong>Important Fiqh Disclaimer:</strong> This calculator is a simplified educational tool limited to primary heirs (spouses, children, parents). The science of Mawarith is highly complex and includes rules of exclusion (Hajb), Awl, and siblings. Do not rely on this calculator for actual estate division. Always consult official Sharia courts or a certified Mufti in your country.
        </div>

        <div className="grid-2" style={{ gap: '24px', marginBottom: '32px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Total Estate Value (after debts & will):</label>
            <input 
              type="number" 
              value={estateValue}
              onChange={(e) => setEstateValue(e.target.value)}
              min="0"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.2rem' }}
              placeholder="e.g. 100000"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Spouse Status (of the deceased):</label>
            <select 
              value={spouseType}
              onChange={(e) => setSpouseType(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem' }}
            >
              <option value="none">None (or passed away)</option>
              <option value="wife">Leaves Wife (or Wives)</option>
              <option value="husband">Leaves a Husband</option>
            </select>
          </div>

          {spouseType === 'wife' && (
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Number of Wives:</label>
              <input 
                type="number" 
                value={wivesCount}
                onChange={(e) => setWivesCount(Math.max(1, Math.min(4, parseInt(e.target.value) || 1)))}
                min="1" max="4"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem' }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Number of Sons:</label>
            <input 
              type="number" 
              value={sonsCount}
              onChange={(e) => setSonsCount(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Number of Daughters:</label>
            <input 
              type="number" 
              value={daughtersCount}
              onChange={(e) => setDaughtersCount(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-sunken)', color: 'var(--text)', fontSize: '1.1rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <input 
                type="checkbox" 
                checked={fatherAlive}
                onChange={(e) => setFatherAlive(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }}
              />
              <span style={{ fontWeight: 'bold' }}>Father is alive</span>
            </label>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <input 
                type="checkbox" 
                checked={motherAlive}
                onChange={(e) => setMotherAlive(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }}
              />
              <span style={{ fontWeight: 'bold' }}>Mother is alive</span>
            </label>
          </div>
        </div>

        <button 
          onClick={calculateInheritance}
          style={{ width: '100%', padding: '16px', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          Calculate Shares
        </button>

        {results && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.3rem', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>Division Results:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {results.shares.map((share, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--surface-sunken)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary)' }}>{share.name}</div>
                    {share.fraction && <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Legal Share: {Math.round(share.fraction * 100)}%</div>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{new Intl.NumberFormat('en-US').format(Math.floor(share.amount))}</div>
                    {share.perPerson && share.amount !== share.perPerson && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Per Person: {new Intl.NumberFormat('en-US').format(Math.floor(share.perPerson))}</div>
                    )}
                  </div>
                </div>
              ))}
              
              {results.unallocated > 0 && (
                <div style={{ padding: '16px', background: 'rgba(234, 179, 8, 0.1)', color: '#ca8a04', borderRadius: '8px', border: '1px dashed #ca8a04', marginTop: '8px' }}>
                  <strong>Remaining Estate:</strong> {new Intl.NumberFormat('en-US').format(Math.floor(results.unallocated))} (To be distributed to extended relatives 'Asaba' based on advanced Fiqh rulings not covered by this simplified calculator).
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
