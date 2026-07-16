import React from 'react';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

export default function ContactPage({ theme }) {
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Contact Us
          </h1>
          <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Have questions or suggestions? We'd love to hear from you.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 rounded-3xl p-8 lg:p-12 shadow-2xl ${
          isDark ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'
        }`}>
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Get in touch</h2>
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'hello@convertify.app' },
                { icon: MessageSquare, label: 'Support', value: 'support@convertify.app' },
                { icon: MapPin, label: 'Location', value: 'Remote, Worldwide' },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.label}</h3>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`} />
              <input type="email" placeholder="Your Email" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`} />
            </div>
            <textarea placeholder="Your Message" rows="4" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
              isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}></textarea>
            <button className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
              Send Message <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
