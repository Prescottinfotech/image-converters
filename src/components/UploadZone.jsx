import React from 'react';
import { UploadCloud, Plus } from 'lucide-react';

export default function UploadZone({ onDrop, onDragOver, onDragLeave, onFileInput, isDragging }) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative group rounded-3xl p-1 transition-all duration-500 ease-out cursor-pointer ${
        isDragging 
          ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/30'
          : 'bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800'
      }`}
    >
      <div className={`relative h-full w-full rounded-[22px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 md:p-8 flex flex-col items-center justify-center space-y-4 transition-all duration-500 ${
        isDragging ? 'bg-opacity-50 dark:bg-opacity-50' : 'bg-opacity-100 dark:bg-opacity-100'
      }`}>
        <input
          type="file"
          multiple
          accept="image/png"
          onChange={onFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className={`p-4 rounded-full transition-all duration-500 ease-out ${
          isDragging 
            ? 'bg-white text-indigo-600 scale-110 shadow-xl' 
            : 'bg-slate-100 dark:bg-slate-800 text-indigo-500 group-hover:scale-105 group-hover:bg-indigo-500 group-hover:text-white'
        }`}>
          {isDragging ? <Plus className="h-8 w-8" /> : <UploadCloud className="h-8 w-8" />}
        </div>
        
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            {isDragging ? 'Drop images here' : 'Drag & drop images'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            or <span className="text-indigo-600 dark:text-indigo-400 underline decoration-2 underline-offset-2">browse your device</span>
          </p>
        </div>
      </div>

    </div>
  );
}
