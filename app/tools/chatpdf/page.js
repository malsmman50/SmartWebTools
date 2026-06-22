'use client';
import { useState, useRef, useEffect } from 'react';

function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Progress bar component with animated stripe
function ProgressBar({ value, label, color = 'var(--primary)' }) {
  return (
    <div style={{ width: '100%', marginTop: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600 }}>{Math.round(value)}%</span>
      </div>
      <div style={{ width: '100%', height: '10px', background: 'var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          background: `linear-gradient(90deg, ${color}, var(--accent))`,
          width: `${value}%`,
          borderRadius: '10px',
          transition: 'width 0.3s ease',
          backgroundSize: '200% 100%',
          animation: value < 100 ? 'shimmer 1.5s infinite' : 'none',
        }} />
      </div>
    </div>
  );
}

export default function ChatPDF() {
  const [phase, setPhase] = useState('idle'); // idle | loading-model | extracting | vectorizing | ready | searching | error
  const [modelProgress, setModelProgress] = useState(0);
  const [vectorProgress, setVectorProgress] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [doneChunks, setDoneChunks] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');
  const [db, setDb] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [fileName, setFileName] = useState('');

  const workerRef = useRef(null);
  const totalChunksRef = useRef(0);
  const dbRef = useRef([]);

  useEffect(() => {
    workerRef.current = new Worker('/worker.js', { type: 'module' });

    workerRef.current.onmessage = (e) => {
      const msg = e.data;

      if (msg.status === 'error') {
        setPhase('error');
        setStatusMsg(msg.error || 'Unknown worker error');
        return;
      }
      if (msg.status === 'debug') {
        console.log('[Worker]', msg.msg);
      } else if (msg.status === 'progress') {
        // Model download progress
        setPhase('loading-model');
        if (msg.data && typeof msg.data.progress === 'number') {
          setModelProgress(msg.data.progress);
        }
      } else if (msg.status === 'complete') {
        if (msg.id === 'query') {
          // Search complete
          try {
            const queryVector = msg.vector;
            const scored = dbRef.current
              .map(doc => ({ ...doc, score: cosineSimilarity(queryVector, doc.vector) }))
              .sort((a, b) => b.score - a.score)
              .slice(0, 5);
            setResults(scored);
            setPhase('ready');
          } catch (err) {
            setPhase('error');
            setStatusMsg(`Search failed: ${err.message}`);
          }
        } else {
          // Chunk vectorized
          dbRef.current.push({ id: msg.id, text: msg.text, vector: msg.vector });
          const done = dbRef.current.length;
          const total = totalChunksRef.current;
          setDoneChunks(done);
          setVectorProgress(total > 0 ? Math.round((done / total) * 100) : 0);
          setDb([...dbRef.current]);
          if (done === total) {
            setPhase('ready');
          }
        }
      }
    };

    workerRef.current.onerror = (e) => {
      console.error('Worker fatal error:', e);
      setPhase('error');
      setStatusMsg(e.message || 'Worker script failed to load. Check browser console for CSP errors.');
    };

    return () => workerRef.current?.terminate();
  }, []);

  const chunkText = (text, maxLength = 500) => {
    const sentences = text.match(/[^.!?\n]+[.!?\n]+/g) || [text];
    const chunks = [];
    let current = '';
    for (const s of sentences) {
      if (current.length + s.length > maxLength) {
        if (current) chunks.push(current.trim());
        current = s;
      } else {
        current += ' ' + s;
      }
    }
    if (current) chunks.push(current.trim());
    return chunks.filter(c => c.length > 20); // skip tiny fragments
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setPhase('extracting');
    setStatusMsg('');
    setModelProgress(0);
    setVectorProgress(0);
    setDoneChunks(0);
    setTotalChunks(0);
    setResults([]);
    dbRef.current = [];
    setDb([]);

    try {
      const pdfjsLib = await import('pdfjs-dist/build/pdf');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      setStatusMsg(`Reading ${pdf.numPages} pages...`);
      const pageTexts = await Promise.all(
        Array.from({ length: pdf.numPages }, (_, i) =>
          pdf.getPage(i + 1).then(async (page) => {
            const content = await page.getTextContent();
            return content.items.map(item => item.str).join(' ');
          })
        )
      );
      const fullText = pageTexts.join('\n');
      const chunks = chunkText(fullText);

      if (chunks.length === 0) {
        setPhase('error');
        setStatusMsg('No readable text found in this PDF. It may be image-based (scanned).');
        return;
      }

      totalChunksRef.current = chunks.length;
      setTotalChunks(chunks.length);
      setPhase('vectorizing');

      chunks.forEach((chunk, i) => {
        workerRef.current.postMessage({ type: 'embed', id: i, text: chunk });
      });

    } catch (err) {
      setPhase('error');
      setStatusMsg(err.message);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    if (!workerRef.current) { setStatusMsg('Worker not initialized'); return; }
    if (dbRef.current.length === 0) { setStatusMsg('Upload a PDF first'); return; }
    setPhase('searching');
    setResults([]);
    workerRef.current.postMessage({ type: 'embed', id: 'query', text: query.trim() });
  };

  // --- Render helpers ---
  const phaseColor = { idle: 'var(--text-muted)', 'loading-model': 'var(--primary)', extracting: 'var(--primary)', vectorizing: 'var(--accent)', ready: 'var(--success)', searching: 'var(--primary)', error: 'var(--danger)' };
  const phaseLabel = {
    idle: 'Idle — Upload a PDF to begin',
    'loading-model': 'Loading AI Model (22MB, one-time download)...',
    extracting: statusMsg || 'Extracting text from PDF...',
    vectorizing: `Vectorizing: ${doneChunks} / ${totalChunks} chunks`,
    ready: `✅ Ready — ${db.length} chunks indexed`,
    searching: 'Searching semantically...',
    error: `❌ Error: ${statusMsg}`,
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '900px' }}>
      <div className="page-header">
        <h1>📑 Semantic PDF Search</h1>
        <p>100% private, local-first document analysis. Your PDF never leaves your browser.</p>
        <div style={{ marginTop: '12px', padding: '12px 16px', background: 'rgba(99,102,241,0.08)', border: '1px solid var(--primary)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span>⚠️</span>
          <span><strong>First-time use:</strong> Downloads a ~22MB AI model once, cached for all future uses.</span>
        </div>
      </div>

      {/* Upload & Status Card */}
      <div className="card" style={{ marginBottom: '24px', padding: '32px', textAlign: 'center' }}>
        <input type="file" accept=".pdf" onChange={handleFileUpload} style={{ display: 'none' }} id="pdf-upload" />
        <label
          htmlFor="pdf-upload"
          className="btn btn-primary"
          style={{ cursor: 'pointer', fontSize: '1.1rem', padding: '14px 28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          📄 {fileName ? `Change PDF` : 'Upload PDF'}
        </label>
        {fileName && <p style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>📎 {fileName}</p>}

        {/* Dynamic Status */}
        <div style={{ marginTop: '20px', padding: '12px 16px', background: 'var(--bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
          <p style={{ color: phaseColor[phase] || 'var(--text-muted)', fontWeight: 600, margin: 0 }}>
            {phaseLabel[phase]}
          </p>

          {/* Model download progress bar */}
          {phase === 'loading-model' && modelProgress > 0 && (
            <ProgressBar value={modelProgress} label="Downloading AI model" color="var(--primary)" />
          )}

          {/* Vectorization progress bar — the real-time one */}
          {phase === 'vectorizing' && totalChunks > 0 && (
            <ProgressBar
              value={vectorProgress}
              label={`Analyzing chunks (${doneChunks}/${totalChunks})`}
              color="var(--accent)"
            />
          )}

          {/* Searching animation */}
          {phase === 'searching' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: 'var(--primary)',
                  animation: `bounce 1.2s ${i * 0.2}s ease-in-out infinite`,
                }} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Box — only shown when ready */}
      {phase === 'ready' && db.length > 0 && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              className="input"
              style={{ flexGrow: 1 }}
              placeholder="Search inside the document..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn btn-primary" onClick={handleSearch} style={{ whiteSpace: 'nowrap' }}>
              🔍 Search
            </button>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            Press Enter or click Search. Returns the top 5 most semantically similar passages.
          </p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ margin: 0 }}>Top Matching Passages</h3>
          {results.map((r, i) => (
            <div key={i} className="card" style={{ padding: '20px', borderLeft: `4px solid ${i === 0 ? 'var(--primary)' : 'var(--border)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Match #{i + 1}
                </span>
                <span style={{
                  fontSize: '0.8rem', fontWeight: 700, padding: '2px 10px', borderRadius: '20px',
                  background: r.score > 0.7 ? 'rgba(5,150,105,0.1)' : r.score > 0.4 ? 'rgba(37,99,235,0.1)' : 'rgba(100,116,139,0.1)',
                  color: r.score > 0.7 ? 'var(--success)' : r.score > 0.4 ? 'var(--primary)' : 'var(--text-muted)',
                }}>
                  {(r.score * 100).toFixed(1)}% match
                </span>
              </div>
              <p style={{ lineHeight: '1.7', margin: 0 }}>{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
