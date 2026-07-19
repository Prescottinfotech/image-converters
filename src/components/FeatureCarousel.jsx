import React, { useState, useEffect, useRef } from 'react';
import { Zap, ShieldCheck, Clock, Settings, Layers, Download } from 'lucide-react';

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Convert images in milliseconds with our optimized engine." },
  { icon: ShieldCheck, title: "Secure & Private", desc: "Your images are processed securely and never stored on our servers." },
  { icon: Clock, title: "Batch Processing", desc: "Save time by converting hundreds of images at once." },
  { icon: Settings, title: "Custom Settings", desc: "Control quality, background color, and output format." },
  { icon: Layers, title: "High Quality", desc: "Maintain pixel-perfect quality even with high compression." },
  { icon: Download, title: "Easy Downloads", desc: "Download individual files or the whole batch as a ZIP." }
];

export default function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [transitionDuration, setTransitionDuration] = useState(500);
  const timerRef = useRef(null);

  const totalOriginalFeatures = features.length;
  // Duplicate features to create infinite loop effect
  const displayFeatures = [...features, ...features];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerSlide(1);
      else if (window.innerWidth < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startAutoScroll = () => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1;
        // If we reach the end of the first set, jump back to 0 instantly
        if (next >= totalOriginalFeatures) {
          setTransitionDuration(0);
          return 0;
        } else {
          setTransitionDuration(500);
          return next;
        }
      });
    }, 4000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="md:py-16 py-5 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="md:text-3xl text-xl font-bold text-center text-slate-950 dark:text-white md:mb-12 mb-8">Why Choose Us</h2>
        <div className="relative overflow-hidden">
          <div 
            className="flex"
            style={{ 
              transform: `translateX(-${activeIndex * (100 / itemsPerSlide)}%)`,
              transition: `transform ${transitionDuration}ms ease-in-out`
            }}
          >
            {displayFeatures.map((feature, index) => (
              <div key={index} style={{ width: `${100 / itemsPerSlide}%` }} className="flex-shrink-0 px-4">
                <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-center h-full">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
