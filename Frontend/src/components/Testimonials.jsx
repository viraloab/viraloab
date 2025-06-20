import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight, FaLinkedinIn } from 'react-icons/fa';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const testimonialContainerRef = useRef(null);
    
    const testimonials = [
        {
            name: 'Sarah Johnson',
            position: 'CEO, TechCorp',
            company: 'TechCorp Solutions',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            content: 'The custom software solution has transformed our business operations. The team has shown outstanding expertise and dedication to quality.',
            highlight: 'transformed our business operations',
            rating: 5,
            linkedin: '#'
        },
        {
            name: 'David Chen',
            position: 'CTO, InnovateTech',
            company: 'InnovateTech Inc.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            content: 'Their attention to detail and innovative approach to problem-solving sets them apart. The ERP system they developed exceeded our expectations.',
            highlight: 'exceeded our expectations',
            rating: 5,
            linkedin: '#'
        },
        {
            name: 'Dristi Singh',
            position: 'Digital Marketing Strategist',
            company: 'Bluehawks Pottukko',
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
            content: 'The digital marketing platform delivered exceptional ROI for our campaigns. Their strategic insights helped us increase our online presence by 75%.',
            highlight: 'increase our online presence by 75%',
            rating: 5,
            linkedin: '#'
        },
        {
            name: 'Rupesh Patel',
            position: 'Founder & CEO',
            company: 'Apna Chaiwala Ku',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
            content: 'The e-commerce solution they built revolutionized our tea delivery business. Sales increased by 120% within three months of implementation.',
            highlight: 'increased by 120% within three months',
            rating: 5,
            linkedin: '#'
        },
        {
            name: 'Emily Rodriguez',
            position: 'Operations Director',
            company: 'Global Logistics',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
            content: 'The inventory management system has streamlined our operations and improved efficiency by 60%. Exceptional service and support throughout.',
            highlight: 'improved efficiency by 60%',
            rating: 5,
            linkedin: '#'
        },
        {
            name: 'Michael Brown',
            position: 'Marketing Director',
            company: 'Brand Innovators',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
            content: 'The website redesign has led to a 45% increase in user engagement and conversion rates. The team\'s creativity and technical skills are exceptional.',
            highlight: '45% increase in user engagement',
            rating: 5,
            linkedin: '#'
        }
    ];

    // Handle window resize events
    useEffect(() => {
        const handleResize = () => {
            // Only needed for responsive layouts managed by CSS
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto rotate testimonials
    useEffect(() => {
        if (isPaused) return;
        
        const interval = setInterval(() => {
            goToNext();
        }, 5000);
        
        return () => clearInterval(interval);
    }, [activeIndex, isPaused]);

    // Intersection observer for animations
    useEffect(() => {
        // Force visibility after a short delay as a fallback
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            });
        }, { threshold: 0.1 });
        
        if (testimonialContainerRef.current) {
            observer.observe(testimonialContainerRef.current);
        }
        
        return () => {
            clearTimeout(timer);
            if (testimonialContainerRef.current) {
                observer.unobserve(testimonialContainerRef.current);
            }
        };
    }, []);

    const goToPrev = () => {
        setActiveIndex((prev) => 
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setActiveIndex((prev) => 
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    const renderStars = (rating) => {
        return [...Array(rating)].map((_, index) => (
            <FaStar key={index} className="text-yellow-400" />
        ));
    };

    // Highlight specific text in testimonials
    const highlightText = (text, highlight) => {
        if (!highlight) return text;
        
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) => 
            part.toLowerCase() === highlight.toLowerCase() 
                ? <span key={index} className="text-primary-400 font-semibold">{part}</span> 
                : part
        );
    };

    return (
        <section className="py-24 relative overflow-hidden" id="testimonials">
            {/* Background */}
            <div className="absolute inset-0 bg-dark-900/95"></div>
            <div className="absolute inset-0 bg-grid-white/5"></div>
            <div className="noise-pattern"></div>
            
            {/* Background gradient blobs */}
            <div className="absolute w-[500px] h-[500px] -bottom-64 left-1/2 transform -translate-x-1/2 bg-primary-500/5 rounded-full filter blur-3xl"></div>
            <div className="absolute w-[300px] h-[300px] top-40 -right-20 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute w-[300px] h-[300px] bottom-40 -left-20 bg-accent-500/10 rounded-full filter blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 mb-6 glass-card text-white text-sm rounded-full">
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-6">What Our Customers Say</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Don't just take our word for it — hear what our clients have to say about our solutions.
                    </p>
                </div>

                <div 
                    ref={testimonialContainerRef}
                    className={`transform transition-all duration-1000 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                    }`}
                >
                    {/* Desktop View - Carousel */}
                    <div className="hidden lg:block max-w-6xl mx-auto">
                        <div className="relative glass-card rounded-2xl overflow-hidden p-8 border border-white/10 shadow-glow-sm">
                            <div className="shimmer absolute inset-0 opacity-10 pointer-events-none"></div>
                            
                            {/* Quote icon */}
                            <div className="absolute -top-10 -left-10 text-accent-500/20 opacity-50">
                                <FaQuoteLeft className="w-40 h-40" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-10 items-center relative z-10">
                                {/* Left: Testimonial Content */}
                                <div 
                                    className="relative h-full"
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index}
                                            className={`transition-all duration-500 absolute top-0 left-0 right-0 ${
                                                index === activeIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'
                                            }`}
                                        >
                                            <div className="mb-6">
                                                <div className="flex items-center space-x-1 mb-5">
                                                    {renderStars(testimonial.rating)}
                                                </div>
                                                <p className="text-xl text-gray-300 italic mb-8 leading-relaxed">
                                                    "{highlightText(testimonial.content, testimonial.highlight)}"
                                                </p>
                                            </div>

                                            <div className="flex items-center">
                                <div className="relative">
                                    <img 
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                                        className="w-14 h-14 rounded-full object-cover border-2 border-primary-500/30"
                                                    />
                                                    <a 
                                                        href={testimonial.linkedin}
                                                        className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full p-1.5 hover:scale-110 transition-transform"
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FaLinkedinIn className="text-white text-xs" />
                                                    </a>
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="font-bold text-white">{testimonial.name}</h3>
                                                    <p className="text-sm text-gray-400">{testimonial.position}</p>
                                                    <p className="text-sm text-primary-400">{testimonial.company}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Right: Testimonial Images */}
                                <div className="relative">
                                    <div className="rounded-xl overflow-hidden relative h-[400px] perspective-1000 transform-preserve-3d">
                                        {testimonials.map((testimonial, index) => {
                                            // Calculate position for 3D carousel effect
                                            const distance = ((index - activeIndex) + testimonials.length) % testimonials.length;
                                            const normalizedDistance = distance <= testimonials.length / 2 ? distance : distance - testimonials.length;
                                            const zIndex = 10 - Math.abs(normalizedDistance);
                                            
                                            let transform = '';
                                            let opacity = 1;
                                            
                                            if (normalizedDistance === 0) {
                                                transform = 'translateZ(100px) scale(1)';
                                                opacity = 1;
                                            } else if (normalizedDistance === 1 || normalizedDistance === -3) {
                                                transform = 'translateZ(50px) translateX(50%) scale(0.8)';
                                                opacity = 0.7;
                                            } else if (normalizedDistance === -1 || normalizedDistance === 3) {
                                                transform = 'translateZ(50px) translateX(-50%) scale(0.8)';
                                                opacity = 0.7;
                                            } else {
                                                transform = 'translateZ(0) scale(0.6)';
                                                opacity = 0.4;
                                            }
                                            
                                            return (
                                                <div 
                                                    key={index}
                                                    className="absolute inset-0 transition-all duration-500"
                                                    style={{
                                                        zIndex,
                                                        transform,
                                                        opacity
                                                    }}
                                                >
                                                    <div className="w-full h-full relative overflow-hidden rounded-xl">
                                                        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-dark-900/80"></div>
                                                        <img 
                                                            src={testimonial.image}
                                                            alt="Client background"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    {/* Company logos (decorative) */}
                                    {testimonials.map((_, index) => (
                                        <div 
                                            key={index}
                                            className={`absolute rounded-lg glass-card p-3 border border-white/10 shadow-glow-sm transition-all duration-500 ${
                                                index === activeIndex ? 'opacity-100' : 'opacity-0'
                                            }`}
                                            style={{
                                                top: `${20 + Math.random() * 60}%`,
                                                left: `${20 + Math.random() * 60}%`,
                                                transform: `rotate(${-5 + Math.random() * 10}deg)`
                                            }}
                                        >
                                            <div className="w-10 h-10 rounded-md bg-white/10"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation buttons */}
                            <div className="flex justify-center mt-10 space-x-4">
                                <button 
                                    onClick={goToPrev}
                                    className="w-10 h-10 rounded-full glass-card border border-white/10 flex items-center justify-center text-white hover:text-primary-400 transition-colors"
                                >
                                    <FaArrowLeft />
                                </button>
                                
                                <div className="flex items-center space-x-2">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all ${
                                                index === activeIndex 
                                                    ? 'w-8 bg-primary-500' 
                                                    : 'bg-white/20 hover:bg-white/40'
                                            }`}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                
                                <button 
                                    onClick={goToNext}
                                    className="w-10 h-10 rounded-full glass-card border border-white/10 flex items-center justify-center text-white hover:text-primary-400 transition-colors"
                                >
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Mobile View - Cards */}
                    <div className="lg:hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div 
                                    key={index}
                                    className="glass-card rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
                                >
                                    <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center mb-6">
                                            <div className="relative">
                                                <img 
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="w-14 h-14 rounded-full object-cover border-2 border-primary-500/30"
                                                />
                                                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full p-1.5">
                                                    <FaQuoteLeft className="text-white text-xs" />
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="font-bold text-white">{testimonial.name}</h3>
                                                <p className="text-xs text-gray-400">{testimonial.position}</p>
                                                <p className="text-xs text-primary-400">{testimonial.company}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-gray-300 italic text-sm">"{highlightText(testimonial.content, testimonial.highlight)}"</p>
                                        </div>

                                        <div className="flex items-center space-x-1">
                                            {renderStars(testimonial.rating)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
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

export default Testimonials;