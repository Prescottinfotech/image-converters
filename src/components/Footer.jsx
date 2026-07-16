import React from 'react';
import { Layers, Mail, Github, Twitter } from 'lucide-react';

export default function Footer({ theme }) {
  const isDark = theme === 'dark';
  
  return (
    <footer className={`border-t ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-16 gap-6">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-primary text-white">
                <Layers className="h-5 w-5" />
              </div>
              <span className={`font-extrabold text-xl ${isDark ? 'text-white' : 'text-charcoal'}`}>Convertify</span>
            </div>
            <p className={`text-base ${isDark ? 'text-slate-400' : 'text-body-gray'} leading-relaxed`}>
              Professional, secure, and lightning-fast image conversion tools powered by your browser.
            </p>
          </div>

          {/* Product & Company Links */}
          <div className="flex gap-8">
            {/* Product Links */}
            <div>
              <h4 className={`font-bold md:text-lg mb-4 ${isDark ? 'text-white' : 'text-charcoal'}`}>Product</h4>
              <ul className={`space-y-2 md:text-base ${isDark ? 'text-slate-400' : 'text-body-gray'}`}>
                <li><a href="/png-to-jpg" className="hover:text-primary">PNG to JPG</a></li>
                <li><a href="#" className="hover:text-primary">Compression</a></li>
                <li><a href="#" className="hover:text-primary">Resizing</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className={`font-bold md:text-lg mb-4 ${isDark ? 'text-white' : 'text-charcoal'}`}>Company</h4>
              <ul className={`space-y-2 md:text-base ${isDark ? 'text-slate-400' : 'text-body-gray'}`}>
                <li><a href="/about" className="hover:text-primary">About Us</a></li>
                <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="/feedback" className="hover:text-primary">Feedback</a></li>
              </ul>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className={`font-bold md:text-lg mb-4 ${isDark ? 'text-white' : 'text-charcoal'}`}>Contact</h4>
            <div className="flex space-x-4">
              <a href="mailto:support@convertify.com" className={`p-2 ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-body-gray'} rounded-lg hover:text-primary`}>
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className={`p-2 ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-body-gray'} rounded-lg hover:text-primary`}>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className={`p-2 ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-body-gray'} rounded-lg hover:text-primary`}>
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-body-gray'} md:mt-12 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-xs`}>
          <p className="text-sm">© 2026 Convertify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
