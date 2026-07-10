import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-black mb-6">Privacy Policy</h1>
      
      <p className="text-slate-400 mb-8 leading-relaxed">
        Your privacy is our priority. We are committed to ensuring your data remains secure and private.
      </p>

      <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
        <h2 className="text-xl font-bold mb-6">How Your Data is Handled</h2>
        <p className="text-slate-400 mb-6 leading-relaxed">
          This converter works entirely in your browser. Here is why you can trust our process:
        </p>
        <ul className="space-y-4 text-slate-300">
          <li className="flex items-start">
            <span className="font-bold text-indigo-400 mr-2">•</span>
            <span><strong>No upload</strong> — Your files never leave your device.</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-indigo-400 mr-2">•</span>
            <span><strong>No server processing</strong> — Everything happens locally using WebAssembly.</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-indigo-400 mr-2">•</span>
            <span><strong>No data collection</strong> — We can't see or access your images.</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold text-indigo-400 mr-2">•</span>
            <span><strong>Original files untouched</strong> — Your source PNGs remain exactly as they were.</span>
          </li>
        </ul>
        
        <p className="mt-8 text-slate-400 leading-relaxed">
          This browser-based approach means your sensitive images stay completely private. 
          There's no risk of interception, storage, or unauthorized access.
        </p>
      </div>
    </div>
  );
}
