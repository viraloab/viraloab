import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import SectionConnector from './components/SectionConnector';
import PromoPopup from './components/PromoPopup';
import { setCookie } from './utils/cookies';
import { initAnalytics } from './utils/analytics';
import { initPrefetching } from './utils/prefetch';

// Lazy load components to improve initial page load performance
const Services = lazy(() => import('./components/Services'));
const HowWeWork = lazy(() => import('./components/HowWeWork'));
const Blog = lazy(() => import('./components/Blog'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Clients = lazy(() => import('./components/Clients'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Simple loading component for lazy-loaded sections
const SectionLoader = () => (
    <div className="min-h-[400px] flex items-center justify-center">
        <div className="shimmer w-16 h-16 rounded-full bg-white/5"></div>
    </div>
);

// Create a separate component for the home page to use location-specific effects
const HomePage = () => {
    const location = useLocation();
    
    useEffect(() => {
        // Check if there's a hash in the URL, and scroll to that section
        if (location.hash) {
            const id = location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        }

        // Scroll animation for sections - reinitialize when we navigate to home
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        // Get all sections with reveal class and make them visible immediately
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(element => {
            // Reset the element's state when navigating back to home
            element.classList.remove('active');
            observer.observe(element);
            
            // Force immediate visibility for elements in viewport
            const rect = element.getBoundingClientRect();
            const isInViewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (isInViewport) {
                element.classList.add('active');
            }
        });

        // Scroll to top when navigating back to home
        if (!location.hash) {
            window.scrollTo(0, 0);
        }

        return () => observer.disconnect();
    }, [location]);

    return (
        <main>
            <section id="home">
                <Hero />
            </section>
            
            <SectionConnector variant="wave" />
            
            <div className="relative">
                <section id="services" className="reveal">
                    <Suspense fallback={<SectionLoader />}>
                        <Services />
                    </Suspense>
                </section>
                
                <SectionConnector variant="tech" />
                
                <section id="howwework" className="reveal">
                    <Suspense fallback={<SectionLoader />}>
                        <HowWeWork />
                    </Suspense>
                </section>
                
                <SectionConnector variant="dots" />
                
                <section id="clients" className="reveal">
                    <Suspense fallback={<SectionLoader />}>
                        <Clients />
                    </Suspense>
                </section>
                
                <SectionConnector />
                
                <section id="blog" className="reveal">
                    <Suspense fallback={<SectionLoader />}>
                        <Blog />
                    </Suspense>
                </section>
                
                <SectionConnector variant="wave" />
                
                <section id="testimonials" className="reveal">
                    <Suspense fallback={<SectionLoader />}>
                        <Testimonials />
                    </Suspense>
                </section>
                
                <SectionConnector variant="tech" />
                
                <section id="contact" className="reveal">
                    <Suspense fallback={<SectionLoader />}>
                        <ContactForm />
                    </Suspense>
                </section>
            </div>
        </main>
    );
};

// Scroll to top component for route changes
const ScrollToTop = () => {
    const location = useLocation();
    
    useEffect(() => {
        if (!location.hash) {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);
    
    return null;
};

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showPromoPopup, setShowPromoPopup] = useState(false);

    // Initialize analytics and prefetching
    useEffect(() => {
        // Initialize analytics
        initAnalytics();
        
        // Setup prefetching for critical resources
        initPrefetching({
            // Add image paths that should be prefetched
            images: [
                '/images/logo.svg',
                '/images/hero-bg.svg'
            ],
            // Add external domains to preconnect to
            connections: [
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com'
            ],
            // Add critical font resources - using Google Fonts directly
            fonts: [],
            // Delay prefetching to not compete with critical resources
            delay: 2500
        });
    }, []);

    // Handle loading complete callback
    const handleLoadComplete = () => {
        setIsLoaded(true);
    };

    // Show the popup after a fixed 5 seconds delay
    useEffect(() => {
        // Force delete any existing popup cookie to ensure it always shows for testing
        document.cookie = "viraloab_promo_seen=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        // Fixed delay of 5 seconds, no longer depends on isLoaded state
        const popupDelay = 5000; // Exactly 5 seconds
        console.log(`Popup will appear in ${popupDelay/1000} seconds`);
        
        const popupTimer = setTimeout(() => {
            setShowPromoPopup(true);
            console.log('Popup should be visible now');
        }, popupDelay);
        
        // Clean up timer
        return () => clearTimeout(popupTimer);
    }, []); // Only run once when component mounts
    
    // Function to handle closing the popup and setting a cookie
    const handleClosePromoPopup = () => {
        setShowPromoPopup(false);
        
        // Set cookie to expire in 7 days
        setCookie('viraloab_promo_seen', 'true', 7);
    };

    return (
        <Router>
            {/* Enhanced Loading Screen - only show when not loaded */}
            <LoadingScreen onLoad={handleLoadComplete} />
            
            {isLoaded && (
                <>
                    <Navbar />
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={
                            <Suspense fallback={<SectionLoader />}>
                                <AboutPage />
                            </Suspense>
                        } />
                    </Routes>
                    <Suspense fallback={<SectionLoader />}>
                        <Footer />
                    </Suspense>
                    
                    {showPromoPopup && (
                        <PromoPopup onClose={handleClosePromoPopup} />
                    )}
                </>
            )}
        </Router>
    );
}

export default App; 