import React from 'react';
import { Trash2, Download, Eye, RefreshCw, CheckCircle } from 'lucide-react';

export default function FileQueue({ 
  files, convertedCount, formatBytes, 
  onClear, onConvert, onDownload, onRemove, onPreview, 
  isConvertingAll, onConvertAll, onDownloadAll 
}) {
  const originalTotalSize = files.reduce((sum, f) => sum + f.originalSize, 0);
  const convertedTotalSize = files.reduce((sum, f) => sum + (f.convertedSize || 0), 0);
  const totalSavings = originalTotalSize - convertedTotalSize;
  const averageSavingsPercent = originalTotalSize > 0 ? Math.round((totalSavings / originalTotalSize) * 100) : 0;

  return (
    <div className="rounded-2xl border overflow-hidden shadow-sm bg-slate-900 border-slate-800">
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-slate-100">File Queue ({files.length})</span>
          {convertedCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {convertedCount} Converted
            </span>
          )}
        </div>
        <button onClick={onClear} className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5">
          <Trash2 className="h-3.5 w-3.5" /> Clear Queue
        </button>
      </div>

      {convertedCount > 0 && (
        <div className="grid grid-cols-3 divide-x divide-slate-800 border-b border-slate-800 text-center py-3 bg-slate-950/30">
          <div><div className="text-[10px] uppercase text-slate-400 mb-0.5">Original Size</div><div className="font-bold text-sm text-slate-100">{formatBytes(originalTotalSize)}</div></div>
          <div><div className="text-[10px] uppercase text-slate-400 mb-0.5">JPEG Size</div><div className="font-bold text-sm text-emerald-400">{formatBytes(convertedTotalSize)}</div></div>
          <div><div className="text-[10px] uppercase text-slate-400 mb-0.5">Space Saved</div><div className="font-bold text-sm text-indigo-400">{formatBytes(totalSavings)} ({averageSavingsPercent}%)</div></div>
        </div>
      )}

      <div className="divide-y divide-slate-800 max-h-[500px] overflow-y-auto">
        {files.map((file) => {
          const ratio = file.status === 'success' && file.convertedSize ? Math.round(((file.originalSize - file.convertedSize) / file.originalSize) * 100) : 0;
          return (
            <div key={file.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/30">
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className="h-14 w-14 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex-shrink-0 flex items-center justify-center relative">
                  <img src={file.originalUrl} alt="Thumbnail" className="max-h-full max-w-full object-contain" />
                  {file.status === 'success' && <div className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-tl-lg p-0.5"><CheckCircle className="h-3 w-3" /></div>}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-slate-100 truncate">{file.name}</h4>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {formatBytes(file.originalSize)}
                    {file.status === 'success' && <span className="text-emerald-400 ml-2 font-medium">{formatBytes(file.convertedSize)} ({ratio}% smaller)</span>}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {file.status === 'success' ? (
                  <>
                    <button onClick={() => onPreview(file.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800 flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> Compare</button>
                    <button onClick={() => onDownload(file.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-white flex items-center gap-1.5"><Download className="h-3.5 w-3.5" /> Download</button>
                  </>
                ) : (
                  <button onClick={() => onConvert(file.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-100 hover:bg-slate-700 flex items-center gap-1.5"><RefreshCw className="h-3.5 w-3.5" /> Convert</button>
                )}
                <button onClick={() => onRemove(file.id)} className="p-2 rounded-lg text-slate-500 hover:text-rose-500"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
      
      {files.length > 0 && (
        <div className="px-6 py-4 flex flex-col md:flex-row items-stretch md:items-center justify-end gap-3 border-t border-slate-800 bg-slate-900/60">
            <button onClick={onConvertAll} disabled={isConvertingAll} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white flex items-center justify-center gap-2 w-full md:w-auto">
                <RefreshCw className={`h-4 w-4 ${isConvertingAll ? 'animate-spin' : ''}`} />
                <span>{isConvertingAll ? 'Processing...' : 'Convert All'}</span>
            </button>
            {convertedCount > 0 && (
                <button onClick={onDownloadAll} className="px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-white flex items-center justify-center gap-2 w-full md:w-auto">
                    <Download className="h-4 w-4" />
                    <span>Download All ({convertedCount})</span>
                </button>
            )}
        </div>
      )}
    </div>
  );
}
