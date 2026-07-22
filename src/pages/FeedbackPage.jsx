import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, MessageSquare, Mail, Sparkles, AlertTriangle, Lightbulb, ThumbsUp } from 'lucide-react';

export default function FeedbackPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('general');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const categories = [
    { id: 'general', label: 'General', icon: MessageSquare, desc: 'General thoughts or questions' },
    { id: 'bug', label: 'Bug Report', icon: AlertTriangle, desc: 'Something is broken' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, desc: 'Idea for a new feature' },
    { id: 'ui', label: 'Design/UX', icon: Sparkles, desc: 'Visuals, layout, or style suggestions' },
  ];

  const ratingEmojis = [
    { value: 1, emoji: '😠', label: 'Terrible' },
    { value: 2, emoji: '🙁', label: 'Bad' },
    { value: 3, emoji: '😐', label: 'Okay' },
    { value: 4, emoji: '🙂', label: 'Good' },
    { value: 5, emoji: '😄', label: 'Great!' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setEmail('');
    setMessage('');
    setCategory('general');
    setRating(0);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen md:py-16 py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center md:mb-12 mb-8">
         
          <p className="md:text-xl text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Your feedback helps us shape the future of Convertify. Let us know how we're doing!
          </p>
        </div>

        {/* Content Area */}
        <div className="rounded-3xl p-6 md:p-10 shadow-xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800/80 transition-colors duration-300">
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Category Selector */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                  Feedback Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map((cat) => {
                    const CatIcon = cat.icon;
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'border-primary bg-indigo-50/50 text-primary dark:border-indigo-500 dark:bg-indigo-950/20 dark:text-indigo-400 shadow-md shadow-indigo-100 dark:shadow-none'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                        }`}
                      >
                        <CatIcon className="h-6 w-6 mb-2" />
                        <span className="text-sm font-semibold">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>


              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative rounded-2xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                  Your Feedback
                </label>
                <textarea
                  id="message"
                  required
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you like, what is broken, or what we can do better..."
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-4 px-12 rounded-xl bg-gradient-to-r from-primary to-indigo-600 text-white font-bold text-lg hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 dark:shadow-none disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending Feedback...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          ) : (
            /* Success State */
            <div className="text-center py-8 px-4 animate-fade-in space-y-6">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-400 mb-2 ring-8 ring-emerald-100 dark:ring-emerald-950/10">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Thank you for your feedback!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-base">
                  Your valuable insights have been successfully received. We'll read every submission to keep making Convertify better.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 transition-all text-base"
                >
                  Send Another Feedback
                </button>
                <Link
                  to="/"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-indigo-600 text-white hover:opacity-95 font-bold transition-all flex items-center justify-center gap-2 text-base"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
