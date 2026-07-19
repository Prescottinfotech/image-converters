import React from 'react';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen md:py-16 py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="text-center md:mb-12 mb-6">
          <h1 className="md:text-4xl font-extrabold tracking-tight text-2xl mb-4 text-slate-900 dark:text-white">
            Contact Us
          </h1>
          <p className="md:text-xl text-base text-slate-600 dark:text-slate-400">
            Have questions or suggestions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 rounded-3xl p-8 lg:p-12 shadow-2xl bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-800 transition-colors duration-300">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="md:text-2xl text-xl font-bold text-slate-900 dark:text-white">Get in touch</h2>
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'hello@convertify.app' },
                { icon: MessageSquare, label: 'Support', value: 'support@convertify.app' },
                { icon: MapPin, label: 'Location', value: 'Remote, Worldwide' },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{item.label}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500" />
            </div>
            <textarea placeholder="Your Message" rows="4" className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"></textarea>
            <button className="w-full md:py-4 py-2.5 md:px-6 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
              Send Message <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
