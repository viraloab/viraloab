import React, { useEffect, useRef } from 'react';
import { FaTimes, FaRocket, FaPalette } from 'react-icons/fa';
import { trackPopupEvent } from '../utils/analytics';

const PromoPopup = ({ onClose }) => {
    const popupRef = useRef(null);
    
    // Log when the component mounts to confirm it's being rendered
    useEffect(() => {
        console.log('PromoPopup component mounted');
        
        // Track popup impression
        trackPopupEvent('impression', 'promo_popup');
        
        // Add event listener to close popup when clicking outside
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                handleClose('outside_click');
            }
        };
        
        // Add event listener to close popup when pressing Escape key
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                handleClose('escape_key');
            }
        };
        
        // Force focus on the popup for better accessibility
        if (popupRef.current) {
            popupRef.current.focus();
        }
        
        // Prevent scrolling on the body when popup is open
        document.body.style.overflow = 'hidden';
        
        // Add event listeners
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);
        
        // Track visibility duration
        const popupOpenTime = Date.now();
        
        // Clean up the event listeners
        return () => {
            console.log('PromoPopup component unmounting');
            
            // Track the duration the popup was visible
            const visibilityDuration = (Date.now() - popupOpenTime) / 1000; // in seconds
            trackPopupEvent('duration', 'promo_popup', { duration_seconds: visibilityDuration });
            
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Handle closing the popup with tracking
    const handleClose = (method = 'close_button') => {
        console.log(`PromoPopup closing with method: ${method}`);
        trackPopupEvent('close', 'promo_popup', { method });
        console.log('Calling onClose prop');
        if (typeof onClose === 'function') {
            onClose();
        } else {
            console.error('onClose prop is not a function or not provided');
        }
    };

    // Handle clicking the CTA button - close popup and scroll to contact
    const handleContactClick = () => {
        trackPopupEvent('cta_click', 'promo_popup', { destination: 'contact_section' });
        if (typeof onClose === 'function') {
            onClose();
        }
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm animate-fadeIn overflow-hidden">
            <div 
                ref={popupRef}
                className="bg-dark-800 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl animate-slideInUp relative overflow-hidden"
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
            >
                {/* Close button */}
                <button 
                    onClick={() => handleClose('close_button')}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-50 bg-dark-900/80 p-3 rounded-full cursor-pointer hover:bg-dark-800"
                    aria-label="Close popup"
                >
                    <FaTimes className="text-2xl" />
                </button>
                
                {/* Decorative background elements */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-secondary-500/20 to-secondary-600/10 rounded-full blur-xl"></div>
                
                {/* Content */}
                <div className="p-8 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="flex justify-center space-x-3 mb-4">
                            <FaPalette className="text-secondary-500 text-3xl" />
                            <FaRocket className="text-primary-500 text-3xl" />
                        </div>
                        <h3 className="text-2xl font-display font-bold gradient-text mb-2">Elevate Your Brand Today!</h3>
                        <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
                    </div>
                    
                    {/* Body */}
                    <div className="mb-6">
                        <p className="text-white text-lg font-medium mb-3">Ready to transform your brand?</p>
                        <p className="text-gray-300 mb-4">
                            We offer complete branding and development solutions to help your business stand out in today's competitive market.
                        </p>
                        
                        {/* Features */}
                        <div className="glass-card bg-dark-900/50 p-4 rounded-lg mb-6">
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2">✓</span>
                                    <span className="text-gray-300 text-sm">Brand identity development</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2">✓</span>
                                    <span className="text-gray-300 text-sm">Website & app development</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2">✓</span>
                                    <span className="text-gray-300 text-sm">Marketing strategy</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* CTA */}
                    <div className="text-center">
                        <button 
                            onClick={handleContactClick}
                            className="neo-button group w-full"
                        >
                            <span className="relative z-10 text-white">Contact Us Now</span>
                            <span className="neo-button-effect bg-gradient-to-r from-accent-500 to-secondary-500"></span>
                        </button>
                        <p className="text-gray-400 text-xs mt-3">Limited time offer for new clients</p>
                    </div>
                </div>
                
                {/* Animated border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"></div>
            </div>
        </div>
    );
};

export default PromoPopup; 