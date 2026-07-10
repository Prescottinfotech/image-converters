import React, { useState, useRef, useEffect } from 'react';
import { X, Eye, Download } from 'lucide-react';

export default function CompareModal({ file, theme, onClose, formatBytes }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`w-full max-w-4xl rounded-3xl border shadow-2xl ${theme === 'dark' ? 'border-slate-800 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-900'}`}>
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold">Compare: {file.name}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full"><X className="h-5 w-5" /></button>
        </div>
        
        <div className="p-6">
          <div ref={containerRef} onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)} className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 cursor-ew-resize" onClick={(e) => handleMove(e.clientX)}>
            <img src={file.originalUrl} alt="Original" className="absolute inset-0 w-full h-full object-contain p-2" />
            <div className="absolute inset-0 w-full h-full bg-slate-950 p-2" style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}>
              <img src={file.convertedUrl} alt="Converted" className="w-full h-full object-contain" />
            </div>
            <div className="absolute top-0 bottom-0 w-1 bg-white z-20" style={{ left: `${sliderPosition}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
