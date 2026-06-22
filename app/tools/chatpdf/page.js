'use client';
import { useState, useRef, useEffect } from 'react';

function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export default function ChatPDF() {
  const [status, setStatus] = useState('Idle');
  const [progress, setProgress] = useState(0);
  const [dbLength, setDbLength] = useState(0);
  const [fileInfo, setFileInfo] = useState(null);
  const [reverseArabic, setReverseArabic] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const workerRef = useRef(null);
  const totalChunksRef = useRef(0);
  const dbRef = useRef([]);

  useEffect(() => {
    // Initialize Web Worker from public directory to bypass Turbopack
    workerRef.current = new Worker('/worker.js', { type: 'module' });
    
    workerRef.current.onmessage = (e) => {
      const msg = e.data;
      if (msg.status === 'error') {
        setStatus(`Worker Internal Error: ${msg.error}`);
        setProgress(0);
        return;
      }
      if (msg.status === 'debug') {
        // Debug messages go to console only, not UI
        console.log('[Worker Debug]', msg.msg);
      } else if (msg.status === 'progress') {
        setStatus(`Loading AI Model... ${msg.data.file || ''}`);
        if (msg.data.progress) setProgress(msg.data.progress);
      } else if (msg.status === 'complete') {
        if (msg.id === 'query') {
          // Perform search
          try {
            const queryVector = msg.vector;
            const scored = dbRef.current.map(doc => {
              if (!queryVector) throw new Error('queryVector is undefined');
              if (!doc.vector) throw new Error('doc.vector is undefined for chunk ' + doc.id);
              if (queryVector.length !== doc.vector.length) throw new Error(`Vector mismatch: ${queryVector.length} vs ${doc.vector.length}`);
              return {
                ...doc,
                score: cosineSimilarity(queryVector, doc.vector)
              };
            });
            scored.sort((a, b) => b.score - a.score);
            setResults(scored.slice(0, 3));
            setStatus('Ready');
            setProgress(100);
          } catch (err) {
            console.error(err);
            setStatus(`Search Error: ${err.message}`);
          }
        } else {
          // Adding document to DB
          dbRef.current.push({ id: msg.id, text: msg.text, vector: msg.vector });
          setDbLength(dbRef.current.length);
          
          const percentDone = Math.round((dbRef.current.length / totalChunksRef.current) * 80);
          setProgress(20 + percentDone);
          setStatus(`Vectorized ${dbRef.current.length} / ${totalChunksRef.current} chunks`);
          
          if (dbRef.current.length === totalChunksRef.current) {
            setStatus('Ready');
          }
        }
      }
    };
    
    workerRef.current.onerror = (e) => {
      console.error('Worker error:', e);
      setStatus(`Worker Error: Failed to initialize AI model or process document. Details: ${e.message}`);
    };
    
    return () => workerRef.current.terminate();
  }, []);

  const fixArabicPDFText = (text) => {
    // If no Arabic characters, return as is
    if (!/[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text)) return text;
    
    // PDF.js extracts RTL languages visually (left-to-right), reversing the entire line and isolating characters
    const lines = text.split('\n');
    return lines.map(line => {
      if (!/[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(line)) return line;
      
      // 1. Reverse the whole line char by char to fix RTL ordering
      let reversed = line.split('').reverse().join('');
      // 2. Fix English words and numbers that got reversed incorrectly
      reversed = reversed.replace(/[A-Za-z0-9]+/g, match => match.split('').reverse().join(''));
      // 3. Remove spaces between isolated Arabic letters so the AI tokenizer understands them as words
      reversed = reversed.replace(/([\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF])\s+(?=[^\sA-Za-z0-9])/g, '$1');
      return reversed;
    }).join('\n');
  };

  const chunkText = (text, shouldReverse, maxLength = 500) => {
    // Apply Arabic fix before chunking if user opted in
    if (shouldReverse) {
      text = fixArabicPDFText(text);
    }
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const chunks = [];
    let currentChunk = '';
    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > maxLength) {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += ' ' + sentence;
      }
    }
    if (currentChunk) chunks.push(currentChunk.trim());
    return chunks;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setStatus('Extracting text from PDF...');
    setProgress(0);
    setDbLength(0);
    setFileInfo(null);
    dbRef.current = [];
    setResults([]);
    try {
      const pdfjsLib = await import('pdfjs-dist/build/pdf');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      setFileInfo({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        pages: pdf.numPages
      });
      
      setStatus(`Extracting text from ${pdf.numPages} pages...`);
      
      let pagesExtracted = 0;
      const pagePromises = Array.from({ length: pdf.numPages }, async (_, i) => {
        const page = await pdf.getPage(i + 1);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(item => item.str).join(' ');
        
        pagesExtracted++;
        // Update progress bar (0-20% for extraction phase)
        setProgress(Math.round((pagesExtracted / pdf.numPages) * 20));
        
        return text;
      });
      
      const pagesData = await Promise.all(pagePromises);
      const fullText = pagesData.join(' ') + ' ';
      
      setStatus('Chunking and Vectorizing Document (Using Local GPU)...');
      setProgress(20); // Start of vectorization phase
      const chunks = chunkText(fullText, reverseArabic);
      totalChunksRef.current = chunks.length;
      
      chunks.forEach((chunk, i) => {
        workerRef.current.postMessage({ type: 'embed', id: i, text: chunk });
      });
      
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    if (!workerRef.current) { setStatus('Error: Worker not initialized'); return; }
    if (dbRef.current.length === 0) { setStatus('Please upload a PDF first'); return; }
    setStatus('Searching...');
    workerRef.current.postMessage({ type: 'embed', id: 'query', text: query.trim() });
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1000px' }}>
      <div className="page-header">
        <h1>📑 Semantic PDF Search</h1>
        <p>100% private, local-first document analysis. Search your PDFs semantically using on-device AI embeddings. No data leaves your browser.</p>
        <div style={{ marginTop: '12px', padding: '12px 16px', background: 'rgba(99,102,241,0.08)', border: '1px solid var(--primary)', borderRadius: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          ⚠️ <strong>First use:</strong> This tool downloads a ~113MB Multilingual AI model to your device to support Arabic & 50+ languages. This happens only once and is cached locally. Subsequent uses are instant.
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px', textAlign: 'center', padding: '40px' }}>
        <input type="file" accept=".pdf" onChange={handleFileUpload} style={{ display: 'none' }} id="pdf-upload" />
        <label htmlFor="pdf-upload" className="btn btn-primary" style={{ cursor: 'pointer', fontSize: '1.2rem', padding: '12px 24px' }}>
          📄 Upload PDF (Max Security)
        </label>
        
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <input 
            type="checkbox" 
            id="reverseArabic" 
            checked={reverseArabic} 
            onChange={(e) => setReverseArabic(e.target.checked)} 
            style={{ cursor: 'pointer', width: '16px', height: '16px' }}
          />
          <label htmlFor="reverseArabic" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
            Fix Garbled Arabic (Check this if extracted Arabic text appears backwards)
          </label>
        </div>

        {fileInfo && (
          <div style={{ marginTop: '24px', textAlign: 'left', padding: '16px', background: 'rgba(99,102,241,0.05)', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: 'var(--primary)' }}>📄 Document Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', fontSize: '0.9rem' }}>
              <div><strong style={{ color: 'var(--text-muted)' }}>Name:</strong> <span style={{ wordBreak: 'break-all' }}>{fileInfo.name}</span></div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Size:</strong> {fileInfo.size}</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Pages:</strong> {fileInfo.pages}</div>
            </div>
          </div>
        )}

        <p style={{ marginTop: '24px', color: 'var(--text-muted)' }}>Status: <strong style={{ color: 'var(--primary)' }}>{status}</strong></p>
        
        {(progress > 0 && status !== 'Ready') && (
          <div style={{ width: '100%', height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden', marginTop: '12px' }}>
            <div style={{ height: '100%', background: 'var(--primary)', width: `${progress}%`, transition: 'width 0.2s' }}></div>
          </div>
        )}
        
        <p style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Vectors Computed: {dbLength}</p>
      </div>

      {dbLength > 0 && (
        <div className="card">
          <div style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              className="input" 
              style={{ flexGrow: 1 }} 
              placeholder="Ask a question about the document..." 
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn btn-primary" onClick={handleSearch}>Semantic Search</button>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {results.map((r, i) => (
              <div key={i} style={{ padding: '16px', background: 'var(--bg)', borderLeft: '4px solid var(--primary)', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 'bold' }}>
                  Match Confidence: {(r.score * 100).toFixed(1)}%
                </div>
                <p style={{ lineHeight: '1.6' }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <article className="card" style={{ marginTop: '40px', lineHeight: '1.8' }}>
        <h2>How 100% Client-Side AI Works (Zero Trust Security)</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
          Traditional "Chat with PDF" tools (like ChatGPT or Claude) require you to upload your sensitive files (NDAs, tax returns, medical records) to their backend servers. This is a massive privacy risk and often violates corporate security policies.
        </p>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
          <strong>SmartCalcTools</strong> takes a revolutionary "Zero Trust" approach. When you upload a PDF here, our website downloads a highly-optimized Multilingual AI model (around 113MB) directly into your browser cache. This AI model runs on your local machine (using WebGPU or WebAssembly).
        </p>

        <h3 style={{ marginTop: '24px' }}>The RAG Architecture (Retrieval-Augmented Generation)</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          1. <strong>Extraction:</strong> Your PDF is parsed locally using PDF.js.<br/>
          2. <strong>Chunking:</strong> The text is split into paragraphs.<br/>
          3. <strong>Embedding:</strong> The local AI converts each paragraph into a mathematical representation (a high-dimensional Vector).<br/>
          4. <strong>Semantic Search:</strong> When you ask a question, the AI converts your question into a vector and uses Cosine Similarity to find the exact paragraph in your document that contains the answer—understanding meaning, not just exact keywords.
        </p>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is it safe to upload confidential PDFs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The file never leaves your device. All processing and AI analysis happens offline within your own browser."
            }
          },
          {
            "@type": "Question",
            "name": "Why does it say Loading AI Model?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "On your first visit, the browser needs to download the 113MB Multilingual AI embedding model to run locally. On subsequent visits, it loads instantly from your cache."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
