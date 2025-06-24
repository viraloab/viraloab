import React, { useEffect, useRef } from 'react';
import { FaTimes, FaShieldAlt } from 'react-icons/fa';
import { trackPopupEvent } from '../utils/analytics';

const PrivacyPolicyPopup = ({ onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    trackPopupEvent?.('impression', 'privacy_popup');

    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        handleClose('outside_click');
      }
    };

    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        handleClose('escape_key');
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    const startTime = Date.now();
    return () => {
      const duration = (Date.now() - startTime) / 1000;
      trackPopupEvent?.('duration', 'privacy_popup', { duration_seconds: duration });

      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = (method = 'close_button') => {
    trackPopupEvent?.('close', 'privacy_popup', { method });
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm animate-fadeIn overflow-hidden">
      <div
        ref={popupRef}
        className="bg-dark-800 rounded-2xl w-full max-w-2xl border border-white/10 shadow-2xl animate-slideInUp relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          onClick={() => handleClose('close_button')}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-50 bg-dark-900/80 p-3 rounded-full cursor-pointer hover:bg-dark-800"
          aria-label="Close privacy popup"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Decorative glows */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-secondary-500/20 to-secondary-600/10 rounded-full blur-xl"></div>

        {/* Content */}
        <div className="p-8 relative z-10 max-h-[75vh] overflow-y-auto">
          <div className="flex items-center space-x-3 mb-4">
            <FaShieldAlt className="text-secondary-500 text-2xl" />
            <h3 className="text-2xl font-display font-bold text-white">
              Privacy Policy
            </h3>
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 mb-6" />

          <p className="text-gray-300 mb-4 text-sm leading-relaxed">
            We value your privacy. This Privacy Policy outlines how we collect,
            use, and protect your personal information when you visit our website
            or use our services. By continuing to use our site, you consent to the
            practices described below.
          </p>

          <ul className="list-disc pl-6 text-gray-400 text-sm space-y-3">
            <li>
              We may collect your name, email, IP address, and usage data to
              improve our services.
            </li>
            <li>
              Your data is only shared with trusted partners to fulfill our
              services and never sold to third parties.
            </li>
            <li>
              We use cookies and analytics tools to personalize content and
              analyze performance.
            </li>
            <li>
              You can request deletion of your data by contacting our support.
            </li>
            <li>
              We implement strong security measures to protect your data.
            </li>
          </ul>

          <p className="text-gray-400 text-xs mt-6">
            For more detailed information, please visit our full Privacy Policy
            page or contact our team.
          </p>
        </div>

        {/* Bottom animated border */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
      </div>
    </div>
  );
};

export default PrivacyPolicyPopup;
