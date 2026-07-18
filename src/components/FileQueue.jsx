import React from 'react';
import { Trash2, Download, RefreshCw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function FileQueue({ 
  files, convertedCount, formatBytes, 
  onClear, onConvert, onDownload, onRemove,
  isConvertingAll, onConvertAll 
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 className="md:text-2xl text-base font-bold text-gray-800 dark:text-white">
          File Queue <span className="text-primary font-medium opacity-70">({files.length} items)</span>
        </h3>
        <div className="flex items-center gap-4">
            <button onClick={onClear} className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-rose-600 transition-colors">
            Clear Queue
            </button>
            {files.length > 0 && (
                <button 
                    onClick={onConvertAll} 
                    disabled={isConvertingAll}
                    className="px-6 py-3 rounded-full text-sm font-bold bg-primary text-white flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50 transition-all shadow-md shadow-primary/20"
                >
                    {isConvertingAll ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    {isConvertingAll ? 'Processing...' : 'Convert All'}
                </button>
            )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {files.map((file) => (
          <div key={file.id} className="group p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-6">
            <div className="h-20 w-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-200 dark:border-slate-700">
                <img src={file.originalUrl} alt="Preview" className="h-full w-full object-cover" />
            </div>
            
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-lg text-gray-800 dark:text-white truncate">{file.name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{formatBytes(file.originalSize)}</p>
                
                <div className="mt-3 flex items-center gap-3">
                    {file.status === 'success' && <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full"><CheckCircle className="h-3.5 w-3.5" /> Converted</span>}
                    {file.status === 'converting' && <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Converting...</span>}
                    {file.status === 'error' && <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 px-3 py-1 rounded-full"><AlertCircle className="h-3.5 w-3.5" /> Error</span>}
                    {file.status === 'pending' && <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Pending</span>}
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                {file.status === 'success' ? (
                    <button onClick={() => onDownload(file.id)} className="px-5 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 flex items-center gap-2">
                    <Download className="h-4 w-4" /> Download
                    </button>
                ) : (
                    <button onClick={() => onConvert(file.id)} className="px-5 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-500/20 flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" /> Convert
                    </button>
                )}
                <button onClick={() => onRemove(file.id)} className="p-3 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30">
                    <Trash2 className="h-5 w-5" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
