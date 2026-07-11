import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  UploadCloud, 
  Download, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  RefreshCw, 
  Info,
  Eye, 
  Layers,
  Sparkles,
} from 'lucide-react';

export default function HomePage({ theme }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isConvertingAll, setIsConvertingAll] = useState(false);
  const [activePreviewId, setActivePreviewId] = useState(null);

  // Default conversion settings since they were removed from UI
  const settings = {
    quality: 0.85,
    backgroundColor: '#ffffff',
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const processFiles = (uploadedFiles) => {
    const newFiles = Array.from(uploadedFiles)
      .filter(file => file.type === 'image/png' || file.name.toLowerCase().endsWith('.png'))
      .map(file => {
        const originalUrl = URL.createObjectURL(file);
        return {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          originalSize: file.size,
          originalUrl: originalUrl,
          convertedUrl: null,
          convertedSize: null,
          status: 'idle',
          errorMsg: '',
          width: 0,
          height: 0,
        };
      });

    if (newFiles.length === 0 && uploadedFiles.length > 0) {
      alert("Please upload PNG files only.");
      return;
    }

    newFiles.forEach(fileObj => {
      const img = new Image();
      img.onload = () => {
        setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, width: img.width, height: img.height } : f));
      };
      img.src = fileObj.originalUrl;
    });

    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const performCanvasConversion = (fileObj) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = settings.backgroundColor;
        ctx.fillRect(0, 0, img.width, img.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.toBlob((blob) => {
          if (!blob) reject(new Error("Image creation failed."));
          else resolve({ url: URL.createObjectURL(blob), size: blob.size, width: img.width, height: img.height });
        }, 'image/jpeg', settings.quality);
      };
      img.onerror = () => reject(new Error("Failed to load source image."));
      img.src = fileObj.originalUrl;
    });
  };

  const convertFile = async (fileId) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'converting' } : f));
    const targetFile = files.find(f => f.id === fileId);
    if (!targetFile) return;
    try {
      const result = await performCanvasConversion(targetFile);
      setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'success', convertedUrl: result.url, convertedSize: result.size } : f));
    } catch (e) {
      setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'error', errorMsg: e.message } : f));
    }
  };

  const convertAllFiles = async () => {
    setIsConvertingAll(true);
    for (const file of files) await convertFile(file.id);
    setIsConvertingAll(false);
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    if (activePreviewId === id) setActivePreviewId(null);
  };

  const clearAllFiles = () => { setFiles([]); setActivePreviewId(null); };

  const downloadAll = () => {
    files.filter(f => f.status === 'success').forEach(file => {
      const a = document.createElement('a');
      a.href = file.convertedUrl;
      const originalNameNoExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      a.download = `${originalNameNoExt}.jpg`;
      a.click();
    });
  };

  const convertedCount = files.filter(f => f.status === 'success').length;

  return (
    <>
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden py-6 md:py-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[300px] h-[300px] bg-indigo-500/30 rounded-full blur-[100px]" />
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h4 className="text-2xl md:text-5xl font-black tracking-tight mb-4">
            Transform Transparent PNGs to{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              High-Quality JPGs
            </span>
          </h4>
          <p className={`text-base md:text-lg max-w-2xl mx-auto mb-6 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Bulk image optimization with visual comparison, custom dimensions, quality tuning, and intelligent transparency control. Your files never leave your device.
          </p>
        </div>
      </div>
      
      <main id="converter" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:pb-24 pb-5">
        <div className="space-y-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative group rounded-3xl border-2 border-dashed transition-all duration-300 overflow-hidden cursor-pointer ${
              isDragging 
                ? 'border-indigo-500 bg-indigo-500/10' 
                : theme === 'dark'
                  ? 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                  : 'border-slate-300 bg-white hover:border-indigo-400'
            }`}
          >
            <input type="file" multiple accept="image/png" onChange={handleFileInput} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className="p-10 md:p-14 text-center flex flex-col items-center justify-center space-y-4">
              <div className={`p-4 rounded-2xl ${
                theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
              }`}>
                <UploadCloud className="h-10 w-10" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-1">
                  Drag & drop your PNGs here
                </h3>
                <p className="text-sm text-slate-500">
                  or <span className="text-indigo-500 font-semibold underline">browse local files</span>
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-950/20 px-3 py-1.5 rounded-lg border border-slate-800/50">
                <Info className="h-3.5 w-3.5 text-indigo-400" />
                <span>Supports multiple files up to 50MB each</span>
              </div>
            </div>
          </div>
          
          {files.length > 0 && (
            <div className={`rounded-2xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <div className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between">
                <span className="font-bold text-lg">File Queue ({files.length})</span>
                <button onClick={clearAllFiles} className="text-rose-500">Clear</button>
              </div>
            {files.map(fileObj => (
              <div key={fileObj.id} className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800">
                <div className="flex items-center space-x-4 w-full md:w-auto">
                  <div className="h-14 w-14 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={fileObj.originalUrl} alt={fileObj.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate max-w-[200px] md:max-w-md">{fileObj.name}</div>
                    <div className="text-xs text-slate-400">{formatBytes(fileObj.originalSize)} • {fileObj.width} x {fileObj.height} px</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                  {fileObj.status === 'success' ? (
                    <div className="flex items-center text-emerald-400 text-sm font-semibold">
                      <CheckCircle className="h-4 w-4 mr-1" /> Converted
                    </div>
                  ) : fileObj.status === 'error' ? (
                     <div className="text-rose-500 text-sm">Error</div>
                  ) : (
                    <button 
                      onClick={() => convertFile(fileObj.id)} 
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-semibold flex items-center"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" /> Convert
                    </button>
                  )}
                  <button onClick={() => removeFile(fileObj.id)} className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            <div className="p-6 flex justify-end space-x-3">
              <button onClick={convertAllFiles} className="md:px-5 md:py-2.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold flex items-center">
                <RefreshCw className="h-5 w-5 mr-2" /> Convert All
              </button>
              {convertedCount > 0 && (
                <button onClick={downloadAll} className="md:px-5 md:py-2.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-semibold flex items-center">
                  <Download className="h-5 w-5 mr-2" /> Download All ({convertedCount})
                </button>
              )}
            </div>
            </div>
          )}

          <section className={`p-8 rounded-2xl border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
            <h2 className="text-xl font-bold mb-3">Convert PNG to JPG</h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Convert PNG to JPG to significantly reduce file size while keeping good image quality. Perfect for sharing photos online, via email, or uploading to websites. All conversion happens in your browser – your files never leave your device.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
