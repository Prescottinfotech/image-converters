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
import { useFileProcessor } from '../hooks/useFileProcessor';
import UploadZone from '../components/UploadZone';
import FileQueue from '../components/FileQueue';
import HeroComparison from '../components/HeroComparison';
import FeatureCarousel from '../components/FeatureCarousel';

export default function HomePage({ theme }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isConvertingAll, setIsConvertingAll] = useState(false);

  // Default conversion settings
  const settings = {
    quality: 0.85,
    backgroundColor: '#ffffff',
  };

  const { processFiles, convertFile } = useFileProcessor(setFiles, settings);

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

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
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
    <main className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-10 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-xl md:text-[38px] font-semibold tracking-tight text-gray-800 dark:!text-white md:leading-[3.5rem]">
                Transform Transparent <br /> PNGs to <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">High-Quality JPGs</span>
              </h1>
              <p className="text-sm md:text-base text-slate-600 dark:!text-slate-300">
                Convert PNG to JPG to significantly reduce file size while keeping good image quality. Fast, secure, and free.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
              <UploadZone
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onFileInput={handleFileInput}
                isDragging={isDragging}
              />
            </div>
          </div>

          {/* Right Side: Hero Interactive Comparison Slider */}
          <div className="hidden md:block">
            <HeroComparison theme={theme} />
          </div>
        </div>

        <div className="md:mt-24 mt-8 space-y-24">
          {files.length > 0 && (
            <div className="md:mt-12 p-8 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white/50 dark:bg-slate-800/60 backdrop-blur-sm shadow-2xl shadow-slate-200/50 dark:shadow-slate-800/50">
              <FileQueue
                files={files}
                convertedCount={convertedCount}
                formatBytes={formatBytes}
                onClear={clearAllFiles}
                onConvert={convertFile}
                onDownload={(id) => {
                  const file = files.find(f => f.id === id);
                  const a = document.createElement('a');
                  a.href = file.convertedUrl;
                  const originalNameNoExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                  a.download = `${originalNameNoExt}.jpg`;
                  a.click();
                }}
                onRemove={removeFile}
                isConvertingAll={isConvertingAll}
                onConvertAll={convertAllFiles}
              />

              {convertedCount > 0 && (
                <div className="mt-8 flex justify-center">
                  <button onClick={downloadAll} className="md:px-8 md:py-4 px-4 py-2.5 rounded-full md:text-lg text-sm font-bold bg-emerald-500 text-white flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                    <Download className="h-5 w-5" />
                    Download All ({convertedCount})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <section className="bg-blue-50 dark:bg-slate-950 w-full">
        <FeatureCarousel />
      </section>

      {/* New Feature Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="md:space-y-24 space-y-10 md:py-20 py-10">
          {/* Instant Conversion */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
              <img src="/assets/img1.png" alt="Instant Conversion" className="w-full h-auto rounded-xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-charcoal dark:text-white mb-6">
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
              <div className="flex justify-center">
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                  Try our free converter
                </button>
              </div>
            </div>
          </div>

          {/* Optimization Features */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-4xl font-bold text-charcoal dark:text-white mb-6">
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
              <div className="flex justify-center">
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                  Explore settings
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2 bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
              <img src="/assets/img2.png" alt="Optimization Settings" className="w-full h-auto rounded-xl" />
            </div>
          </div>

          {/* Developer API */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-900 p-6 rounded-2xl shadow-xl overflow-hidden">
              <img src="/assets/img3.png" alt="API Integration" className="w-full h-auto rounded-xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-charcoal dark:text-white mb-6">
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
              <div className="flex justify-center">
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                  Contact us for API access
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-blue-50 dark:bg-slate-950 md:py-20 py-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-primary font-bold tracking-wider uppercase text-sm flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-sm"></span> TESTIMONIALS?
            </span>
            <h2 className="text-xl md:text-[28px] font-semibold text-gray-800 dark:text-white mt-4 max-w-2xl">
              From startups to established brands, you'll be in good company.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I've been using Removal.AI for a while, I guess this one is a pretty good match. I have downloaded the preview image at 1000px resolution for free. The basic editor is also quite interesting. Worth giving a try!",
                name: "Powell Gao",
                role: "Software Developer - imagecolorizer.com",
                image: "/assets/Testimonials1.png"
              },
              {
                quote: "Well I'm particularly surprised at how accurate and smooth are the cut-out edges. I always wanted a super fast background remover. Finally I do not have to open up Photoshop to get the job done.",
                name: "Andrea Mangano",
                role: "Product Designer - assemble.tv",
                image: "/assets/Testimonials2.png"
              },
              {
                quote: "I always wanted a super-fast background remover. Good job!",
                name: "Omar Hamza",
                role: "Tech Savvy - quicksync.me",
                image: "/assets/Testimonials3.png"
              }
            ].map((testimony, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-sm flex flex-col justify-between">
                <p className="text-4xl text-slate-400 mb-4">“</p>
                <p className="text-slate-600 dark:text-slate-300 mb-8 flex-grow">{testimony.quote}</p>
                <div className="flex items-center gap-3">
                  <img src={testimony.image} alt={testimony.name} className="h-10 w-10 rounded-full border-2 border-blue-500 object-cover" />
                  <div>
                    <div className="font-bold text-slate-950 dark:text-slate-100 flex items-center gap-1">
                      <span className="text-primary">@</span> {testimony.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{testimony.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
