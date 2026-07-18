import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Eye, ShieldCheck, Zap } from 'lucide-react';

export default function HeroComparison({ imageSrc, theme }) {
  const containerRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Subtle auto-animation on load to guide the user
  useEffect(() => {
    if (hasInteracted) return;
    
    const timeouts = [
      setTimeout(() => setSliderPosition(45), 600),
      setTimeout(() => setSliderPosition(58), 1100),
      setTimeout(() => setSliderPosition(42), 1600),
      setTimeout(() => setSliderPosition(50), 2100)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [hasInteracted]);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
    setHasInteracted(true);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Checkerboard CSS patterns for PNG transparent background
  const checkerboardStyle = {
    backgroundImage: `
      linear-gradient(45deg, #cbd5e1 25%, transparent 25%),
      linear-gradient(-45deg, #cbd5e1 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #cbd5e1 75%),
      linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)
    `,
    backgroundSize: '16px 16px',
    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
    backgroundColor: '#f8fafc'
  };

  const checkerboardStyleDark = {
    backgroundImage: `
      linear-gradient(45deg, #334155 25%, transparent 25%),
      linear-gradient(-45deg, #334155 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #334155 75%),
      linear-gradient(-45deg, transparent 75%, #334155 75%)
    `,
    backgroundSize: '16px 16px',
    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
    backgroundColor: '#0f172a'
  };

  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden select-none">
      
      {/* Main interactive sliding area */}
      <div 
        ref={containerRef}
        onMouseMove={(e) => {
          if (!isDragging && e.buttons === 1) {
            setIsDragging(true);
          }
          if (isDragging) handleMove(e.clientX);
        }}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        className="relative w-full h-full cursor-ew-resize overflow-hidden"
      >
        
        {/* Layer 1: Left Background (PNG Checkerboard) */}
        <div 
          style={theme === 'dark' ? checkerboardStyleDark : checkerboardStyle}
          className="absolute inset-0 w-full h-full transition-colors duration-300"
        />

        {/* Layer 2: Right Background (JPG Solid/Gradient) - clipped by sliderPosition */}
        <div 
          style={{ 
            clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` 
          }}
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-indigo-950/40 dark:to-slate-800/80 transition-all duration-300"
        />

        {/* Subject Layer: Transparent Sneaker/Product overlaid perfectly across both backgrounds */}
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12 pointer-events-none">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt="PNG showcase item" 
              className="max-w-[85%] max-h-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.18)] rotate-[-6deg]"
            />
          ) : (
            /* Beautiful custom Vector Sneaker SVG that loads instantly, looks premium, and works offline */
            <svg 
              viewBox="0 0 500 350" 
              className="w-[90%] h-[90%] filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.22)] transform rotate-[-8deg] transition-transform duration-500 hover:rotate-[-4deg]"
            >
              <defs>
                <linearGradient id="sole-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="body-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e1b4b" />
                  <stop offset="50%" stopColor="#311042" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
                <linearGradient id="accent-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="stripe-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>

              {/* Shoe Floating Shadow */}
              <ellipse 
                cx="260" 
                cy="315" 
                rx="145" 
                ry="12" 
                fill="rgba(15, 23, 42, 0.14)" 
                className="dark:fill-[rgba(0,0,0,0.4)]"
              />

              {/* SNEAKER OUTLINE & SHAPE */}
              <g>
                {/* Outsole Base */}
                <path 
                  d="M 120,265 C 150,268 280,278 330,268 C 360,262 400,242 410,215 C 412,210 405,205 395,208 C 365,218 310,222 280,220 C 230,217 140,202 110,215 C 98,220 92,235 98,248 C 102,256 110,262 120,265 Z" 
                  fill="url(#sole-glow)" 
                />

                {/* Midsole Layer */}
                <path 
                  d="M 115,255 C 145,258 275,264 320,255 C 350,249 385,232 395,212 C 375,220 315,224 285,222 C 235,219 145,206 115,218 C 105,222 98,235 105,246 C 108,251 112,254 115,255 Z" 
                  fill="#ffffff" 
                  opacity="0.95"
                />

                {/* Heel counter cup */}
                <path 
                  d="M 105,240 C 95,230 92,190 115,165 C 130,148 150,150 160,175 C 165,188 155,225 115,240 Z" 
                  fill="url(#body-gradient)" 
                />

                {/* Main Upper Body */}
                <path 
                  d="M 115,165 C 140,140 180,120 230,115 C 280,110 320,135 345,165 C 365,189 390,202 395,212 C 370,220 280,222 230,216 C 180,210 140,200 115,165 Z" 
                  fill="url(#body-gradient)" 
                />

                {/* Toe cap bumper */}
                <path 
                  d="M 345,165 C 365,185 390,198 395,212 C 385,212 370,198 355,182 C 345,172 342,168 345,165 Z" 
                  fill="url(#accent-cyan)" 
                />

                {/* Dynamic swoosh-style stripe */}
                <path 
                  d="M 150,185 C 195,155 270,145 320,172 C 335,180 345,190 355,195 C 310,185 240,185 180,205 C 160,212 152,205 150,185 Z" 
                  fill="url(#stripe-orange)" 
                />

                {/* Mesh panels ventilation details */}
                <path 
                  d="M 240,135 C 265,132 295,142 310,155 C 290,150 260,145 235,148 Z" 
                  fill="#ffffff" 
                  opacity="0.25" 
                />
                <path 
                  d="M 180,160 C 205,152 235,155 250,165 C 230,160 200,158 175,165 Z" 
                  fill="#ffffff" 
                  opacity="0.2" 
                />

                {/* Collar Lining / Sock liner */}
                <path 
                  d="M 140,152 C 145,142 170,122 195,130 C 200,132 195,140 185,145 C 170,152 150,158 140,152 Z" 
                  fill="url(#accent-cyan)" 
                />

                {/* Metallic lace eyelets */}
                <circle cx="215" cy="138" r="3" fill="#ffffff" opacity="0.8" />
                <circle cx="235" cy="142" r="3" fill="#ffffff" opacity="0.8" />
                <circle cx="255" cy="148" r="3" fill="#ffffff" opacity="0.8" />
                <circle cx="275" cy="156" r="3" fill="#ffffff" opacity="0.8" />

                {/* Neon Orange Floating Laces */}
                <path d="M 215,138 C 210,125 185,120 180,135" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 235,142 C 225,130 195,122 190,140" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 255,148 C 248,138 215,132 210,148" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            </svg>
          )}
        </div>

        {/* Floating Badges */}
        {/* Left Side: PNG Badge */}
        <div className="absolute left-4 top-4 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md text-white border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg select-none">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          PNG (Transparent)
        </div>

        {/* Right Side: JPG Badge */}
        <div className="absolute right-4 top-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-800 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg select-none">
          <Sparkles className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
          JPG (Optimized)
        </div>

        {/* Interactive Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white dark:bg-slate-300 shadow-2xl z-20 cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle Knob */}
          <div 
            onMouseDown={onMouseDown}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-2 border-indigo-500 dark:border-indigo-400 flex items-center justify-center cursor-ew-resize hover:scale-110 active:scale-95 transition-transform z-30"
          >
            <div className="flex gap-0.5 text-indigo-600 dark:text-indigo-500 font-black text-xs">
              <span>◀</span>
              <span>▶</span>
            </div>
          </div>
        </div>

        {/* Floating Instruction / Drag indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/70 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-semibold tracking-wide flex items-center gap-2 pointer-events-none opacity-80 shadow-md">
          <span>Drag slider to compare</span>
        </div>
      </div>
    </div>
  );
}
