import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  UploadCloud, 
  Download, 
  Trash2, 
  CheckCircle, 
  RefreshCw, 
  Info,
  Zap,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export default function HomePage({ theme }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isConvertingAll, setIsConvertingAll] = useState(false);
  const isDark = theme === 'dark';

  // Default conversion settings
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
  };

  const clearAllFiles = () => { setFiles([]); };

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
    <main className="relative min-h-screen">
      {/* Dynamic Blob Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="blob-primary top-[-10%] left-[10%]" />
        <div className="blob-secondary top-[10%] right-[5%]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 z-10">
          <div className="text-center mb-16">
          <h4 className="text-2xl md:text-5xl font-black tracking-tight mb-4 text-gray-900 dark:text-white">
            Transform Transparent PNGs to{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              High-Quality JPGs
            </span>
          </h4>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
            Convert PNG to JPG to significantly reduce file size while keeping good image quality. Fast, secure, and free.
          </p>
        </div>

        <div className="space-y-24">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative group rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-white  backdrop-blur-xl transition-all duration-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-md ${
              isDragging 
                ? 'border-primary bg-primary/10' 
                : 'hover:border-primary'
            }`}
          >
            <input type="file" multiple accept="image/png" onChange={handleFileInput} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className="p-10 md:p-14 text-center flex flex-col items-center justify-center space-y-4">
              <div className={`p-4 rounded-xl transition-all duration-300 ${
                isDragging 
                  ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' 
                  : 'bg-slate-100 dark:bg-slate-800 text-body-gray dark:text-slate-400 group-hover:text-primary group-hover:bg-primary/10'
              }`}>
                <UploadCloud className="h-12 w-12" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-1 text-charcoal dark:text-white">
                  Drag & drop your images here
                </h3>
                <p className="text-sm text-body-gray dark:text-slate-400">
                  or <span className="text-primary font-semibold underline group-hover:text-primary/80">browse local files</span>
                </p>
              </div>
            </div>
          </div>
          
          {files.length > 0 && (
            <div className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-6 shadow-sm`}>
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-lg text-charcoal dark:text-white">File Queue ({files.length})</span>
                <button onClick={clearAllFiles} className="text-body-gray dark:text-slate-400 hover:text-primary transition-colors">Clear All</button>
              </div>
              
              <div className="space-y-4">
                {files.map(fileObj => (
                  <div key={fileObj.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={fileObj.originalUrl} alt={fileObj.name} className="h-12 w-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-semibold text-charcoal dark:text-white truncate max-w-[200px]">{fileObj.name}</div>
                        <div className="text-xs text-body-gray dark:text-slate-400">{formatBytes(fileObj.originalSize)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {fileObj.status === 'success' ? (
                        <div className="flex items-center text-primary text-sm font-semibold">
                          <CheckCircle className="h-4 w-4 mr-1" /> Converted
                        </div>
                      ) : (
                        <button 
                          onClick={() => convertFile(fileObj.id)} 
                          className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                        >
                          Convert
                        </button>
                      )}
                      <button onClick={() => removeFile(fileObj.id)} className="text-body-gray dark:text-slate-400 hover:text-primary">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button onClick={convertAllFiles} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2" /> Convert All
                </button>
                {convertedCount > 0 && (
                  <button onClick={downloadAll} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center">
                    <Download className="h-5 w-5 mr-2" /> Download All ({convertedCount})
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* New Feature Sections */}
          <section className="space-y-24">
            {/* Instant Conversion */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
                <img src="/assets/img1.png" alt="Instant Conversion" className="w-full h-auto rounded-xl" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal dark:text-white mb-6">
                  Convert PNGs <span className="text-primary">instantly</span> with one click
                </h2>
                <p className="text-lg text-body-gray dark:text-slate-400 mb-6">
                  Transform high-resolution PNGs into optimized JPGs in 3 seconds or less without sacrificing quality.
                </p>
                <ul className="space-y-3 text-body-gray dark:text-slate-400 mb-8">
                  <li>✓ Automatically detect and handle transparency.</li>
                  <li>✓ Neat, clear, and smooth compression.</li>
                  <li>✓ Maintain high quality even at lower file sizes.</li>
                  <li>✓ Process over 1,000 images in a single batch.</li>
                </ul>
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                  Try our free converter
                </button>
              </div>
            </div>

            {/* Optimization Features */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal dark:text-white mb-6">
                  Fine-tune <span className="text-primary">settings</span> as you wish
                </h2>
                <p className="text-lg text-body-gray dark:text-slate-400 mb-6">
                  Take full control of your output. Adjust compression, background colors, and more to suit your exact needs.
                </p>
                <ul className="space-y-3 text-body-gray dark:text-slate-400 mb-8">
                  <li>✓ Custom compression quality settings.</li>
                  <li>✓ Set custom background colors for transparent areas.</li>
                  <li>✓ Batch resizing and format options.</li>
                  <li>✓ Optimized presets for web and printing.</li>
                </ul>
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                  Explore settings
                </button>
              </div>
              <div className="order-1 md:order-2 bg-white/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
                <img src="/assets/img2.png" alt="Optimization Settings" className="w-full h-auto rounded-xl" />
              </div>
            </div>

            {/* Developer API */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-slate-900 p-6 rounded-2xl shadow-xl overflow-hidden">
                <img src="/assets/img3.png" alt="API Integration" className="w-full h-auto rounded-xl" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal dark:text-white mb-6">
                  Easy API <span className="text-primary">integration</span> for speedy workflow
                </h2>
                <p className="text-lg text-body-gray dark:text-slate-400 mb-6">
                  Integrate our conversion engine into your systems with just a few lines of code.
                </p>
                <ul className="space-y-3 text-body-gray dark:text-slate-400 mb-8">
                  <li>✓ Reliable, efficient, and scalable infrastructure.</li>
                  <li>✓ Optimized for high-throughput use-cases.</li>
                  <li>✓ 99.9% uptime guarantee.</li>
                  <li>✓ Secure, automated file processing.</li>
                </ul>
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                  Contact us for API access
                </button>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section>
            <div className="text-center mb-12">
              <span className="text-primary font-bold tracking-wider uppercase text-sm">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal dark:text-slate-400 mt-2">
                From startups to established brands, <br className="hidden md:block"/> you'll be in good company.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "I've been using this converter for a while, it's a great match. Very fast, and the quality is excellent. Worth giving a try!",
                  name: "Powell Gao",
                  role: "Software Developer",
                  company: "imagecolorizer.com"
                },
                {
                  quote: "I am surprised at how accurate and fast the compression is. Finally, I do not have to open up Photoshop to get the job done.",
                  name: "Andrea Mangano",
                  role: "Product Designer",
                  company: "assemble.tv"
                },
                {
                  quote: "I always wanted a super-fast PNG to JPG converter. Good job!",
                  name: "Omar Hamza",
                  role: "Tech Savvy",
                  company: "quicksync.me"
                }
              ].map((testimony, i) => (
                <div key={i} className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm flex flex-col justify-between">
                  <p className="text-slate-600 dark:text-slate-300 mb-8 italic">"{testimony.quote}"</p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 mr-4" />
                    <div>
                      <div className="font-semibold text-charcoal dark:text-slate-400">{testimony.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{testimony.role} - {testimony.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
