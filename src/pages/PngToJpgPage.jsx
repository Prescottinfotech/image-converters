import React from 'react';

export default function PngToJpgPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:py-12 py-6">
      <h1 className="text-xl md:text-4xl font-black mb-6 text-gray-900 dark:text-white">PNG to JPG: Complete Conversion Guide</h1>
      
      <p className="text-gray-800 dark:text-slate-300 mb-2 leading-relaxed">
        PNG and JPG are two of the most common image formats, but they serve very different purposes. 
        Understanding when to convert from PNG to JPG can help you save storage space, improve website performance, 
        and ensure your images work everywhere.
      </p>

      <div className=" md:p-6 rounded-2xl mb-8">
        <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Key Difference:</h2>
        <p className="text-gray-800 dark:text-slate-300 text-sm">
          PNG files are lossless and support transparency, while JPG files use compression to create much smaller files—often 5-10x smaller for photos.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Why Convert PNG to JPG?</h2>
      <p className="text-gray-800 dark:text-slate-300 mb-4">There are several compelling reasons to convert your PNG files to JPG format:</p>
      
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Dramatically Smaller File Sizes</h3>
      <p className="text-gray-800 dark:text-slate-300 mb-4">
        The most significant advantage of JPG is file size. A photograph saved as PNG might be 5-10 MB, 
        while the same image as JPG could be just 500 KB—a 10-20x reduction. This makes a huge difference when:
      </p>
      <ul className="list-disc list-inside text-gray-800 dark:text-slate-300 mb-6 space-y-2 text-sm">
        <li>Sending images via email (many services limit attachment sizes)</li>
        <li>Uploading photos to social media</li>
        <li>Adding images to websites (faster loading = better SEO)</li>
        <li>Storing large photo collections</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Universal Compatibility</h3>
      <p className="text-gray-800 dark:text-slate-300 mb-6 text-sm">
        JPG is the most universally supported image format. While PNG is widely supported too, 
        some older systems, applications, and websites handle JPG more reliably. Converting ensures your images work everywhere.
      </p>

      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Removing Transparency</h3>
      <p className="text-gray-800 dark:text-slate-300 mb-6 text-sm">
        PNG supports transparent backgrounds, but sometimes you need a solid background instead. 
        Converting to JPG automatically fills transparent areas with white, giving you a predictable result for printing or specific use cases.
      </p>

      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How to Convert PNG to JPG</h2>
      <p className="text-gray-800 dark:text-slate-300 mb-4">Our browser-based converter makes the process simple and secure:</p>
      <ol className="list-decimal list-inside text-gray-800 dark:text-slate-300 space-y-2 text-sm">
        <li><strong>Select files</strong> — Click the SELECT FILES button or drag and drop up to 20 PNG images into the conversion area</li>
        <li><strong>Convert</strong> — Click CONVERT to start the conversion. Processing happens instantly in your browser</li>
        <li><strong>Save</strong> — Save individual files or click SAVE ALL to get everything at once</li>
      </ol>
    </div>
  );
}
