'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Check } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies in this session
    const hasAccepted = sessionStorage.getItem('cookiesAccepted');
    if (!hasAccepted) {
      // Show the cookie bar after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    sessionStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl border-t border-blue-500">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Content */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm sm:text-base leading-relaxed">
              By continuing to use this site, you accept our{' '}
              <a 
                href="https://www.happydeel.com/cookies" 
                className="underline hover:text-blue-200 font-medium transition-colors" target="_blank" rel="noopener noreferrer"
              >
                Cookie Policy
              </a>
              . We use cookies to enhance your browsing experience and analyze site traffic.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Decline
            </button>
            
            <button
              onClick={handleAccept}
              className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 min-w-[120px] justify-center"
            >
              <Check className="w-4 h-4" />
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 