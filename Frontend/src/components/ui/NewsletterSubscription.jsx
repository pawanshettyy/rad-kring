import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { useNewsletter } from '../../hooks/useAPI';

export default function NewsletterSubscription({ className = '' }) {
  const {
    email,
    setEmail,
    firstName,
    setFirstName,
    subscribe,
    isSubmitting,
    success,
    error,
    reset
  } = useNewsletter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await subscribe({ source: 'footer' });
    } catch (err) {
      console.error('Newsletter subscription failed:', err);
    }
  };

  return (
    <div className={`newsletter-subscription ${className}`}>
      <div className="flex items-start space-x-3 mb-4">
        <div className="bg-orange-500 p-2 rounded-lg">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white mb-1">Stay Updated</h3>
          <p className="text-gray-400 text-sm">
            Get the latest news on eVTOL technology and flight updates
          </p>
        </div>
      </div>

      {success ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-600 text-white p-4 rounded-lg mb-4"
        >
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-xs">✓</span>
            </div>
            <div>
              <p className="font-semibold text-sm">Successfully Subscribed!</p>
              <p className="text-green-100 text-xs">
                Welcome to RAD KRING AVIATION newsletter.
              </p>
            </div>
          </div>
          <button
            onClick={reset}
            className="text-green-200 hover:text-white text-xs underline mt-2"
          >
            Subscribe another email
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name (optional)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Subscribe</span>
              </>
            )}
          </button>
        </form>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600 text-white p-3 rounded-lg mt-3"
        >
          <p className="text-sm">{error}</p>
          <button
            onClick={reset}
            className="text-red-200 hover:text-white text-xs underline mt-1"
          >
            Try again
          </button>
        </motion.div>
      )}

      <p className="text-gray-500 text-xs mt-3">
        By subscribing, you agree to our{' '}
        <a href="/privacy-policy" className="text-orange-500 hover:text-orange-400">
          Privacy Policy
        </a>
        . Unsubscribe anytime.
      </p>
    </div>
  );
}
