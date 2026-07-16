import React from 'react';
import { UploadCloud, Info } from 'lucide-react';

export default function UploadZone({ onDrop, onDragOver, onDragLeave, onFileInput, isDragging }) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative group rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden cursor-pointer shadow-sm ${
        isDragging 
          ? 'border-primary bg-primary/10' 
          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-primary hover:bg-primary/5'
      }`}
    >
      <input
        type="file"
        multiple
        accept="image/png"
        onChange={onFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="md:p-14 text-center flex flex-col items-center justify-center space-y-4">
        <div className={`p-4 rounded-xl transition-all duration-300 ${
          isDragging 
            ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' 
            : 'bg-slate-100 dark:bg-slate-800 text-body-gray group-hover:text-primary group-hover:bg-primary/10'
        }`}>
          <UploadCloud className="h-10 w-10" />
        </div>
        
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-1 text-charcoal dark:text-white">
            Drag & drop your images here
          </h3>
          <p className="text-sm text-body-gray dark:text-slate-400">
            or <span className="text-primary font-semibold underline group-hover:text-primary/80">browse local files</span>
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-body-gray dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
          <Info className="h-3.5 w-3.5 text-primary" />
          <span>Supports multiple files</span>
        </div>
      </div>
    </div>
  );
}
