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
  const [db, setDb] = useState([]); // Array of { text, vector }
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const workerRef = useRef(null);

  useEffect(() => {
    // Initialize Web Worker
    workerRef.current = new Worker(new URL('./worker.js', import.meta.url));
    
    workerRef.current.onmessage = (e) => {
      const msg = e.data;
      if (msg.status === 'error') {
        setStatus(`Worker Internal Error: ${msg.error}`);
        setProgress(0);
        return;
      }
      if (msg.status === 'progress') {
        setStatus(`Loading AI Model... ${msg.data.file || ''}`);
        if (msg.data.progress) setProgress(msg.data.progress);
      } else if (msg.status === 'complete') {
        if (msg.id === 'query') {
          // Perform search
          setStatus('Ready');
          setProgress(100);
          const queryVector = msg.vector;
          
          setDb(currentDb => {
            const scored = currentDb.map(doc => ({
              ...doc,
              score: cosineSimilarity(queryVector, doc.vector)
            }));
            scored.sort((a, b) => b.score - a.score);
            setResults(scored.slice(0, 3));
            return currentDb;
          });
        } else {
          // Adding document to DB
          setDb(prev => [...prev, { id: msg.id, text: msg.text, vector: msg.vector }]);
        }
      }
    };
    
    workerRef.current.onerror = (e) => {
      console.error('Worker error:', e);
      setStatus(`Worker Error: Failed to initialize AI model or process document. Details: ${e.message}`);
    };
    
    return () => workerRef.current.terminate();
  }, []);

  const chunkText = (text, maxLength = 500) => {
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
    setDb([]);
    
    try {
      const pdfjsLib = await import('pdfjs-dist/build/pdf');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      setStatus(`Extracting text from ${pdf.numPages} pages...`);
      const pagePromises = Array.from({ length: pdf.numPages }, (_, i) => 
        pdf.getPage(i + 1).then(async (page) => {
          const textContent = await page.getTextContent();
          return textContent.items.map(item => item.str).join(' ');
        })
      );
      const pagesData = await Promise.all(pagePromises);
      const fullText = pagesData.join(' ') + ' ';
      
      setStatus('Chunking and Vectorizing Document (Using Local GPU)...');
      const chunks = chunkText(fullText);
      
      chunks.forEach((chunk, i) => {
        workerRef.current.postMessage({ type: 'embed', id: i, text: chunk });
      });
      
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  const handleSearch = () => {
    if (!query) return;
    setStatus('Searching...');
    workerRef.current.postMessage({ type: 'embed', id: 'query', text: query });
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1000px' }}>
      <div className="page-header">
        <h1>🔒 Private SearchPDF (Zero Trust)</h1>
        <p>Talk to your PDFs securely. Your file never leaves your computer. We use local AI running entirely within your browser to read and search your documents.</p>
      </div>

      <div className="card" style={{ marginBottom: '24px', textAlign: 'center', padding: '40px' }}>
        <input type="file" accept=".pdf" onChange={handleFileUpload} style={{ display: 'none' }} id="pdf-upload" />
        <label htmlFor="pdf-upload" className="btn btn-primary" style={{ cursor: 'pointer', fontSize: '1.2rem', padding: '12px 24px' }}>
          📄 Upload PDF (Max Security)
        </label>
        <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>Status: <strong style={{ color: 'var(--primary)' }}>{status}</strong></p>
        
        {(progress > 0 && status !== 'Ready') && (
          <div style={{ width: '100%', height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden', marginTop: '12px' }}>
            <div style={{ height: '100%', background: 'var(--primary)', width: `${progress}%`, transition: 'width 0.2s' }}></div>
          </div>
        )}
        
        <p style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Vectors Computed: {db.length}</p>
      </div>

      {db.length > 0 && (
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
          <strong>SmartCalcTools</strong> takes a revolutionary "Zero Trust" approach. When you upload a PDF here, our website downloads a tiny, highly-optimized AI model (around 22MB) directly into your browser cache. This AI model runs on your local machine (using WebGPU or WebAssembly).
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
              "text": "On your first visit, the browser needs to download the 22MB AI embedding model to run locally. On subsequent visits, it loads instantly from your cache."
            }
          }
        ]
      }).replace(/</g, '\\u003c')}} />
    </div>
  );
}
