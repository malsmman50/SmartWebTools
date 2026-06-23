'use client';
import { useState, useRef } from 'react';

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [isCompressing, setIsCompressing] = useState(false);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    setOriginalFile(file);
    const objectUrl = URL.createObjectURL(file);
    setOriginalUrl(objectUrl);
    setCompressedUrl(null);
    setCompressedFile(null);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const compressImage = () => {
    if (!originalFile || !originalUrl) return;
    setIsCompressing(true);

    const img = new Image();
    img.src = originalUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Calculate new dimensions (we keep them the same for pure quality compression, or we could resize)
      const width = img.width;
      const height = img.height;
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw white background in case of transparent PNG being saved as JPEG
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      // Compress using native browser API
      canvas.toBlob((blob) => {
        if (blob) {
          const newUrl = URL.createObjectURL(blob);
          setCompressedUrl(newUrl);
          
          const newFile = new File([blob], `compressed_${originalFile.name.replace(/\.[^/.]+$/, "")}.jpg`, {
            type: 'image/jpeg',
          });
          setCompressedFile(newFile);
        }
        setIsCompressing(false);
      }, 'image/jpeg', parseFloat(quality));
    };
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '800px', margin: '40px auto' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px', textAlign: 'center' }}>Smart Image Compressor 🖼️</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Compress images and reduce their size by up to 90% without uploading them to any server (100% local privacy).
        </p>

        <div style={{ marginBottom: '24px' }}>
          <label 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '40px', 
              border: '2px dashed var(--primary)', 
              borderRadius: '8px', 
              background: 'var(--surface-sunken)', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary)' }}>Click to select an image</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>(JPG, PNG, WebP)</span>
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
        </div>

        {originalFile && (
          <div style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '16px' }}>Compression Settings</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label>Image Quality:</label>
                <span style={{ fontWeight: 'bold' }}>{Math.round(quality * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.1" 
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>Smaller Size (Lower Quality)</span>
                <span>Larger Size (Higher Quality)</span>
              </div>
            </div>

            <button 
              onClick={compressImage}
              disabled={isCompressing}
              style={{ width: '100%', padding: '14px', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: isCompressing ? 'not-allowed' : 'pointer', opacity: isCompressing ? 0.7 : 1 }}
            >
              {isCompressing ? 'Compressing...' : 'Compress Image Now'}
            </button>
          </div>
        )}

        {/* Hidden Canvas for processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {compressedUrl && (
          <div className="grid-2" style={{ marginTop: '32px', gap: '24px' }}>
            <div style={{ padding: '16px', background: 'var(--surface-sunken)', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ color: '#ef4444', marginBottom: '8px' }}>Original Image</h4>
              <img src={originalUrl} alt="Original" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{formatBytes(originalFile.size)}</div>
            </div>

            <div style={{ padding: '16px', background: 'var(--surface-sunken)', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ color: '#10b981', marginBottom: '8px' }}>Compressed Image</h4>
              <img src={compressedUrl} alt="Compressed" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: compressedFile.size > originalFile.size ? '#ef4444' : '#10b981' }}>
                {formatBytes(compressedFile.size)}
                <span style={{ fontSize: '0.9rem', color: compressedFile.size > originalFile.size ? '#ef4444' : 'var(--text-muted)', marginLeft: '8px' }}>
                  ({compressedFile.size > originalFile.size ? '+' : '-'}{Math.abs(Math.round(((originalFile.size - compressedFile.size) / originalFile.size) * 100))}%)
                </span>
              </div>
              {compressedFile.size > originalFile.size && (
                <div style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '8px', lineHeight: '1.4' }}>
                  Image became larger! Try lowering the quality slider.
                </div>
              )}
              
              <a 
                href={compressedUrl} 
                download={compressedFile.name}
                style={{ display: 'block', width: '100%', padding: '10px', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold', marginTop: '16px' }}
              >
                Download Image ⬇️
              </a>
            </div>
          </div>
        )}

        <div style={{ marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.6' }}>
          <strong>Privacy Note:</strong> This tool utilizes the Canvas API built into your browser. Your images are never sent or uploaded to any server, ensuring 100% privacy as all processing happens locally on your device.
        </div>
      </div>
    </div>
  );
}
