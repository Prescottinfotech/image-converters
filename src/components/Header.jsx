import React, { useState } from 'react';
import { Layers, ChevronDown, Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isDark = theme === 'dark';

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
    <header className={`border-b transition-colors ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/70'} backdrop-blur-md sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group hover:opacity-95 transition-opacity">
          <div className="p-2.5 rounded-xl bg-primary text-white shadow-sm group-hover:scale-[1.03] transition-transform duration-200">
            <Layers className="h-6 w-6" />
          </div>
          <span className={`font-extrabold text-2xl tracking-tight ${isDark ? 'text-white' : 'text-charcoal'}`}>
            Convertify
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative">
              {item.dropdown ? (
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center text-lg font-semibold transition-colors ${
                    dropdownOpen 
                      ? 'text-primary' 
                      : isDark ? 'text-slate-300 hover:text-white' : 'text-body-gray hover:text-charcoal'
                  }`}
                >
                  {item.name} <ChevronDown className="ml-1 h-5 w-5" />
                </button>
              ) : (
                <a 
                  href={item.href} 
                  className={`text-lg font-semibold transition-colors ${
                    isActive(item.href) 
                      ? 'text-primary' 
                      : isDark ? 'text-slate-300 hover:text-white' : 'text-body-gray hover:text-charcoal'
                  }`}
                >
                  {item.name}
                </a>
              )}
              {item.dropdown && dropdownOpen && (
                <div className={`absolute top-full mt-2 w-48 rounded-xl shadow-lg ${isDark ? 'bg-slate-800' : 'bg-white border border-slate-200'} py-2 z-50`}>
                  {item.dropdown.map(sub => (
                    <a 
                      key={sub.name} 
                      href={sub.href} 
                      className={`block px-4 py-3 text-base ${isDark ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-body-gray hover:bg-slate-50 hover:text-charcoal'}`}
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button 
            onClick={toggleTheme} 
            className={`p-3 rounded-xl border ${isDark ? 'border-slate-700 text-amber-400 hover:bg-slate-800' : 'border-slate-200 text-amber-500 hover:bg-slate-100'} transition-colors`}
          >
            {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu button and theme toggle */}
        <div className="lg:hidden flex items-center space-x-1">
          <button 
            onClick={toggleTheme} 
            className={`p-2 ${isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-500 hover:text-amber-600'}`}
          >
            {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`p-2 ${isDark ? 'text-slate-300 hover:text-white' : 'text-body-gray hover:text-charcoal'}`}
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className={`lg:hidden border-t px-6 py-6 space-y-6 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          {navItems.filter(item => item.name !== 'Product').map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={`block text-base ont-semibold transition-colors ${
                isActive(item.href)
                  ? 'text-primary'
                  : isDark ? 'text-slate-300 hover:text-white' : 'text-body-gray hover:text-charcoal'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
