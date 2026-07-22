import React from 'react';
import { Layers, Zap, Shield, Smartphone } from 'lucide-react';

export default function AboutPage() {
  const features = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Process images in milliseconds directly in your browser.' },
    { icon: Shield, title: 'Privacy Focused', desc: 'Your files never leave your device. Fully secure processing.' },
    { icon: Smartphone, title: 'Mobile Friendly', desc: 'Optimized experience on any device, anywhere.' },
  ];

  return (
    <div className="min-h-screen md:py-16 py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center md:mb-16 mb-8">
          <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            About <span className="text-primary">Convertify</span>
          </h1>
          <p className="md:text-xl text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Convertify is designed to be the ultimate set of image utility tools. We believe that image manipulation should be fast, private, and accessible to everyone.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors duration-300 space-y-10">
          
          <div className="space-y-4">
            <h2 className="md:text-2xl text-xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed md:text-lg text-base">
              In an era where privacy is paramount, we built Convertify to run entirely on the client side. By leveraging the power of modern web technologies, we ensure that your images remain on your device, providing peace of mind alongside unparalleled speed.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <div className="p-3 inline-block rounded-xl bg-indigo-100 dark:bg-indigo-950 text-primary dark:text-indigo-400 mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="md:text-2xl text-xl font-bold text-slate-900 dark:text-white mb-4">Built with Modern Tech</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed md:text-lg text-base">
              Convertify is built using Vite, React, and Tailwind CSS, ensuring a smooth, fast, and responsive user experience across all devices. We are constantly adding new tools and improving our existing ones to better serve your image processing needs.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
