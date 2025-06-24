import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTwitter, FaLinkedinIn, FaPhone, FaPaperPlane, FaUser, FaBuilding, FaComment } from 'react-icons/fa';
import { trackFormSubmission } from '../utils/analytics';
import { submitContactForm } from '../utils/api';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
    });
    
    const [formStatus, setFormStatus] = useState({
        submitting: false,
        success: false,
        error: null,
        offline: false
    });
    
    // Check for online status
    useEffect(() => {
        const updateOnlineStatus = () => {
            setFormStatus(prev => ({
                ...prev,
                offline: !navigator.onLine
            }));
        };
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();
        
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);
    
    // Function to store form data in IndexedDB for offline use
    const storeOfflineFormData = async (data) => {
        return new Promise((resolve, reject) => {
            try {
                // Open IndexedDB
                const request = indexedDB.open('viraloab-offline-storage', 1);
                
                request.onerror = () => {
                    reject(new Error('Failed to open IndexedDB'));
                };
                
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains('pendingContactForms')) {
                        db.createObjectStore('pendingContactForms', { autoIncrement: true });
                    }
                };
                
                request.onsuccess = (event) => {
                    const db = event.target.result;
                    const transaction = db.transaction(['pendingContactForms'], 'readwrite');
                    const store = transaction.objectStore('pendingContactForms');
                    
                    const saveRequest = store.add({ data, timestamp: new Date().toISOString() });
                    
                    saveRequest.onsuccess = () => {
                        resolve(true);
                    };
                    
                    saveRequest.onerror = () => {
                        reject(new Error('Failed to store form data locally'));
                    };
                };
            } catch (error) {
                reject(error);
            }
        });
    };
    
    // Function to register a sync request when back online
    const registerSync = async () => {
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            try {
                const registration = await navigator.serviceWorker.ready;
                await registration.sync.register('contact-form-sync');
                return true;
            } catch (error) {
                console.error('Background sync registration failed:', error);
                return false;
            }
        }
        return false;
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Form validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setFormStatus({
                submitting: false,
                success: false,
                error: 'Please fill in all required fields',
                offline: !navigator.onLine
            });
            return;
        }
        
        setFormStatus({
            submitting: true,
            success: false,
            error: null,
            offline: !navigator.onLine
        });
        
        try {
            // Track form submission attempt
            trackFormSubmission('contact', formData);
            
            if (!navigator.onLine) {
                // If offline, store the form data for later submission
                await storeOfflineFormData(formData);
                await registerSync();
                
                setFormStatus({
                    submitting: false,
                    success: true,
                    error: null,
                    offline: true
                });
                
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    phone: '',
                    message: ''
                });
                
                return;
            }
            
            // Use the API utility instead of direct fetch
            await submitContactForm(formData);
            
            setFormStatus({
                submitting: false,
                success: true,
                error: null,
                offline: false
            });
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            
            setFormStatus({
                submitting: false,
                success: false,
                error: error.message || 'An unexpected error occurred. Please try again later.',
                offline: !navigator.onLine
            });
        }
    };
    
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const socialLinks = [
        { icon: <FaTwitter className="w-5 h-5" />, url: "#", label: "Twitter" },
        { icon: <FaLinkedinIn className="w-5 h-5" />, url: "#", label: "LinkedIn" }
    ];

    // Add custom CSS to fix form input styling
    const inputStyle = {
        backgroundColor: 'rgba(17, 24, 39, 0.5)',
        color: 'white',
        border: '1px solid rgba(55, 65, 81, 1)',
        borderRadius: '0.5rem',
        padding: '0.75rem 1rem',
        width: '100%',
        pointerEvents: 'auto', // Ensure inputs can be interacted with
        zIndex: 10, // Ensure inputs appear above any overlay elements
        position: 'relative' // Create a new stacking context
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-dark-900/95"></div>
            <div className="absolute inset-0 bg-grid-white"></div>
            <div className="noise-pattern"></div>
            
            {/* Background shapes */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">Let's Connect</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Ready to elevate your digital presence? Send us a message and let's create something amazing together.
                    </p>
                </div>
                
                <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
                    {/* Contact Info - 2 columns */}
                    <div className="lg:col-span-2 glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-md relative overflow-hidden">
                        <div className="h-full flex flex-col">
                            <h3 className="text-2xl font-display font-bold text-white mb-8">Contact Information</h3>
                            
                            <div className="space-y-8 mb-auto">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mr-4">
                                        <FaEnvelope className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">Email</h4>
                                        <a href="mailto:viraloabofficial@gmail.com" className="text-gray-300 hover:text-primary-300 transition-colors">
                                            viraloabofficial@gmail.com
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mr-4">
                                        <FaMapMarkerAlt className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">Address</h4>
                                        <p className="text-gray-300">
                                            No.645/18, 3rd Floor, Krishna Reddy Layout<br />
                                            Arekere Bangalore - 560076
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center mr-4">
                                        <FaPhone className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">Phone</h4>
                                        <a href="tel:+1234567890" className="text-gray-300 hover:text-accent-300 transition-colors">
                                            +91 9345148191
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-12">
                                <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
                                <div className="flex space-x-4">
                                    {socialLinks.map((social, index) => (
                                        <a 
                                            key={index} 
                                            href={social.url} 
                                            aria-label={social.label}
                                            className="w-10 h-10 rounded-full glass-card flex items-center justify-center border border-white/10 text-white hover:text-primary-400 hover:border-primary-400 transition-colors"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 blur-2xl"></div>
                        </div>
                    </div>
                    
                    {/* Contact Form - 3 columns */}
                    <div className="lg:col-span-3 glass-dark rounded-2xl border border-white/10 p-8 relative">
                        {/* Make shimmer a pseudo-element to prevent it from blocking interactions */}
                        <div className="relative z-0">
                            <div className="shimmer absolute inset-0 opacity-10 pointer-events-none"></div>
                        </div>
                        
                        {formStatus.success ? (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white mb-3">Thank You!</h3>
                                <p className="text-gray-300">
                                    {formStatus.success && !formStatus.offline ? (
                                        "Your message has been sent successfully! We'll get back to you soon."
                                    ) : (
                                        "Your message has been saved and will be sent when you're back online."
                                    )}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <h3 className="text-2xl font-display font-bold text-white mb-6">Send us a message</h3>
                                
                                {formStatus.error && (
                                    <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-lg mb-4">
                                        <p>{formStatus.error}</p>
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={inputStyle}
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            style={inputStyle}
                                            placeholder="abcd@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-white text-sm font-medium mb-2">Company</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="Your company"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="+91 9876543210"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-white text-sm font-medium mb-2">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        required
                                        style={inputStyle}
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={formStatus.submitting}
                                    className="neo-button group w-full relative z-10"
                                >
                                    <span className="absolute inset-0 border border-white/10 rounded-full"></span>
                                    <span className="relative z-10 text-white font-medium">
                                        {formStatus.submitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </span>
                                    <span className="neo-button-effect bg-gradient-to-r from-primary-500 to-secondary-500"></span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Floating particles - ensure they don't block interactions */}
            {[...Array(10)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.3,
                        animation: `float ${Math.random() * 2 + 2}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`
                    }}
                ></div>
            ))}
        </section>
    );
};

export default ContactForm; 