import React from 'react';
import { UploadCloud, Info } from 'lucide-react';

export default function UploadZone({ onDrop, onDragOver, onDragLeave, onFileInput, isDragging, theme }) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative group rounded-3xl border-2 border-dashed transition-all duration-300 overflow-hidden cursor-pointer ${
        isDragging 
          ? 'border-indigo-500 bg-indigo-500/10' 
          : theme === 'dark'
            ? 'border-slate-800 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/60'
            : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-indigo-500/5'
      }`}
    >
      <input
        type="file"
        multiple
        accept="image/png"
        onChange={onFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="p-10 md:p-14 text-center flex flex-col items-center justify-center space-y-4">
        <div className={`p-4 rounded-2xl transition-all duration-300 ${
          isDragging 
            ? 'bg-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/30' 
            : theme === 'dark' 
              ? 'bg-slate-800 text-slate-400 group-hover:text-indigo-400 group-hover:bg-slate-700' 
              : 'bg-slate-100 text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50'
        }`}>
          <UploadCloud className="h-10 w-10 animate-pulse" />
        </div>
        
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-1">
            Drag & drop your PNGs here
          </h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            or <span className="text-indigo-500 font-semibold underline group-hover:text-indigo-400">browse local files</span>
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-500/5 px-3 py-1.5 rounded-lg border border-slate-500/10">
          <Info className="h-3.5 w-3.5 text-indigo-400" />
          <span>Supports multiple files up to 50MB each</span>
        </div>
      </div>
    </div>
  );
}
