import { useState, useCallback } from 'react';

export const useFileProcessor = (setFiles, settings) => {
  const performCanvasConversion = (fileObj) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let targetWidth = img.width;
          let targetHeight = img.height;

          // Default conversion settings
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error("Unable to create canvas context"));
            return;
          }

          ctx.fillStyle = settings.backgroundColor || '#ffffff';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error("Image creation failed."));
              return;
            }
            resolve({
              url: URL.createObjectURL(blob),
              size: blob.size,
              width: targetWidth,
              height: targetHeight
            });
          }, 'image/jpeg', settings.quality || 0.85);
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = () => reject(new Error("Failed to load source image."));
      img.src = fileObj.originalUrl;
    });
  };

  const processFiles = useCallback((uploadedFiles) => {
    const newFiles = Array.from(uploadedFiles)
      .filter(file => file.type === 'image/png' || file.name.toLowerCase().endsWith('.png'))
      .map(file => {
        const originalUrl = URL.createObjectURL(file);
        return {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          originalSize: file.size,
          originalUrl: originalUrl,
          convertedUrl: null,
          convertedSize: null,
          status: 'idle',
          errorMsg: '',
          width: 0,
          height: 0,
        };
      });

    if (newFiles.length === 0 && uploadedFiles.length > 0) {
      alert("Please upload PNG files only.");
      return;
    }

    newFiles.forEach(fileObj => {
      const img = new Image();
      img.onload = () => {
        setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, width: img.width, height: img.height } : f));
      };
      img.src = fileObj.originalUrl;
    });

    setFiles(prev => [...prev, ...newFiles]);
  }, [setFiles]);

  const convertFile = useCallback(async (fileId) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'converting', errorMsg: '' } : f));

    setFiles(prev => {
        const targetFile = prev.find(f => f.id === fileId);
        if (!targetFile) return prev;
        
        performCanvasConversion(targetFile).then(result => {
            setFiles(filesPrev => filesPrev.map(f => f.id === fileId ? { 
              ...f, 
              status: 'success',
              convertedUrl: result.url,
              convertedSize: result.size,
              convertedWidth: result.width,
              convertedHeight: result.height
            } : f));
        }).catch(error => {
            setFiles(filesPrev => filesPrev.map(f => f.id === fileId ? { ...f, status: 'error', errorMsg: error.message } : f));
        });
        return prev;
    });
  }, [setFiles, settings]); // Added settings to dependencies

  return { processFiles, convertFile };
};
