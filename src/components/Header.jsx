import React, { useState } from 'react';
import { Layers, ChevronDown, Menu, X, Sun, Moon } from 'lucide-react';

export default function Header({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { 
        name: 'Product', 
        href: '#', 
        dropdown: [
            { name: 'PNG to JPG', href: '/png-to-jpg' }
        ]
    },
    { name: 'About', href: '/about' },
    { name: 'Send Feedback', href: '/feedback' },
    { name: 'Contact Me', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  // Helper to check active path
  const isActive = (href) => window.location.pathname === href;

  return (
    <header className={`border-b transition-colors ${
      theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/70'
    } backdrop-blur-md sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
            <Layers className="h-6 w-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Convertify
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative">
              {item.dropdown ? (
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center text-base font-semibold ${
                    dropdownOpen ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.name} <ChevronDown className="ml-1 h-5 w-5" />
                </button>
              ) : (
                <a 
                  href={item.href} 
                  className={`text-base font-semibold ${
                    isActive(item.href) 
                      ? 'text-indigo-400 border-b-2 border-indigo-500 pb-1' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              )}
              {item.dropdown && dropdownOpen && (
                <div className="absolute top-full mt-2 w-48 bg-slate-800 rounded-xl shadow-2xl py-2 z-50">
                  {item.dropdown.map(sub => (
                    <a key={sub.name} href={sub.href} className="block px-4 py-3 text-base text-slate-300 hover:bg-slate-700 hover:text-white">
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={toggleTheme} className="p-3 rounded-xl border border-slate-700 text-amber-400 hover:bg-slate-800">
            {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 p-2">
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-6 py-6 space-y-6">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="block text-lg font-semibold text-slate-200">
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
