import React from 'react';
import { Trash2, Download, RefreshCw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function FileQueue({ 
  files, convertedCount, formatBytes, 
  onClear, onConvert, onDownload, onRemove,
  isConvertingAll, onConvertAll 
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-4">
        <h3 className="md:text-2xl text-base font-bold text-gray-800 dark:text-white">
          File Queue <span className="text-primary font-medium opacity-70">({files.length} items)</span>
        </h3>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <button onClick={onClear} className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-rose-600 transition-colors">
            Clear Queue
            </button>
            {files.length > 0 && (
                <button 
                    onClick={onConvertAll} 
                    disabled={isConvertingAll}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-bold bg-primary text-white flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50 transition-all shadow-md shadow-primary/20"
                >
                    {isConvertingAll ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    {isConvertingAll ? 'Processing...' : 'Convert All'}
                </button>
            )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {files.map((file) => (
          <div key={file.id} className="group p-3 sm:p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0 border border-slate-200 dark:border-slate-700">
                <img src={file.originalUrl} alt="Preview" className="h-full w-full object-cover" />
            </div>
            
            <div className="flex-1 min-w-0 text-center sm:text-left w-full">
                <h4 className="font-semibold text-base sm:text-lg text-gray-800 dark:text-white truncate max-w-[200px] sm:max-w-none mx-auto sm:mx-0">{file.name}</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">{formatBytes(file.originalSize)}</p>
                
                <div className="mt-2 sm:mt-3 flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                    {file.status === 'success' && <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 sm:px-3 py-1 rounded-full"><CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Converted</span>}
                    {file.status === 'converting' && <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2 sm:px-3 py-1 rounded-full"><Loader2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-spin" /> Converting...</span>}
                    {file.status === 'error' && <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 px-2 sm:px-3 py-1 rounded-full"><AlertCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Error</span>}
                    {file.status === 'pending' && <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 sm:px-3 py-1 rounded-full">Pending</span>}
                </div>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
                {file.status === 'success' ? (
                    <button onClick={() => onDownload(file.id)} className="flex-1 sm:flex-none px-3 sm:px-5 py-2 sm:py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <Download className="h-4 w-4" /> Download
                    </button>
                ) : (
                    <button onClick={() => onConvert(file.id)} className="flex-1 sm:flex-none px-3 sm:px-5 py-2 sm:py-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-500/20 flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <RefreshCw className="h-4 w-4" /> Convert
                    </button>
                )}
                <button onClick={() => onRemove(file.id)} className="p-2 sm:p-3 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30">
                    <Trash2 className="h-5 w-5" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
