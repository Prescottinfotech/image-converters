import React from 'react';
import { Layers, Mail, Github, Twitter } from 'lucide-react';

export default function Footer({ theme }) {
  const isDark = theme === 'dark';
  
  return (
    <footer className={`border-t ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-16 gap-6">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-indigo-600 text-white">
                <Layers className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-xl">Convertify</span>
            </div>
            <p className="text-base text-gray-800 leading-relaxed">
              Professional, secure, and lightning-fast image conversion tools powered by your browser.
            </p>
          </div>

          {/* Product & Company Links (Flex on mobile, stays in grid) */}
          <div className="flex gap-8">
            {/* Product Links */}
            <div>
              <h4 className="font-bold md:text-lg mb-4">Product</h4>
              <ul className="space-y-2 md:text-base text-gray-800">
                <li><a href="/png-to-jpg" className="hover:text-indigo-500">PNG to JPG</a></li>
                <li><a href="#" className="hover:text-indigo-500">Compression</a></li>
                <li><a href="#" className="hover:text-indigo-500">Resizing</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold md:text-lg mb-4">Company</h4>
              <ul className="space-y-2 md:text-base text-gray-800">
                <li><a href="/about" className="hover:text-indigo-500">About Us</a></li>
                <li><a href="/privacy" className="hover:text-indigo-500">Privacy Policy</a></li>
                <li><a href="/feedback" className="hover:text-indigo-500">Feedback</a></li>
              </ul>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-bold md:text-lg mb-4">Contact</h4>
            <div className="flex space-x-4">
              <a href="mailto:support@convertify.com" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-400">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-400">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-400">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 md:mt-12 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p className="text-gray-800 text-sm">© 2026 Convertify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
