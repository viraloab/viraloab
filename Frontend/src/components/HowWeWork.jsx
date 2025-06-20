import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaLightbulb, FaCode, FaRocket, FaCogs, FaTimes, FaCheck, FaUsers, FaChartLine, FaRegClock } from 'react-icons/fa';

const HowWeWork = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);

    const steps = [
        {
            number: '01',
            title: 'Discovery',
            description: 'We begin by deeply understanding your goals, challenges, and vision to establish clear objectives.',
            icon: <FaSearch />,
            color: 'from-primary-500 to-primary-600'
        },
        {
            number: '02',
            title: 'Strategy',
            description: 'Our team crafts a comprehensive, tailored plan aligned with your business objectives.',
            icon: <FaLightbulb />,
            color: 'from-secondary-500 to-secondary-600'
        },
        {
            number: '03',
            title: 'Execution',
            description: 'We bring your vision to life with precision, creativity, and cutting-edge technology.',
            icon: <FaCode />,
            color: 'from-accent-500 to-accent-600'
        },
        {
            number: '04',
            title: 'Optimization',
            description: 'We continuously improve and refine our approach based on data-driven insights and feedback.',
            icon: <FaCogs />,
            color: 'from-primary-600 to-secondary-600'
        },
        {
            number: '05',
            title: 'Launch',
            description: 'Your solution is deployed with a strategic rollout plan ensuring maximum impact and adoption.',
            icon: <FaRocket />,
            color: 'from-secondary-600 to-accent-600'
        }
    ];

    // Detailed information for the modal
    const detailedSteps = [
        {
            title: 'Discovery',
            icon: <FaSearch className="text-primary-500" />,
            description: 'The foundation of our approach begins with a deep dive into your business ecosystem. We conduct thorough research to understand your industry, competitors, target audience, and unique challenges.',
            keyPoints: [
                'In-depth stakeholder interviews',
                'Market and competitive analysis',
                'User and audience research',
                'Technical audit and assessment',
                'Goals and KPI definition'
            ],
            duration: '1-2 weeks',
            deliverables: 'Discovery document, Strategic brief, Project scope'
        },
        {
            title: 'Strategy',
            icon: <FaLightbulb className="text-secondary-500" />,
            description: 'With insights from the discovery phase, we develop a comprehensive roadmap that outlines the strategic approach, technical requirements, and creative direction tailored specifically to your goals.',
            keyPoints: [
                'User experience mapping',
                'Technical architecture planning',
                'Content and messaging strategy',
                'Budget and resource allocation',
                'Project timeline and milestones'
            ],
            duration: '1-3 weeks',
            deliverables: 'Strategic roadmap, Technical specifications, Creative brief'
        },
        {
            title: 'Execution',
            icon: <FaCode className="text-accent-500" />,
            description: 'This is where concepts transform into reality. Our cross-functional teams collaborate to build your solution with precision and creativity, maintaining open communication throughout the process.',
            keyPoints: [
                'Agile development methodology',
                'Regular progress updates',
                'Iterative design and development',
                'Quality assurance testing',
                'Client feedback integration'
            ],
            duration: '4-12 weeks',
            deliverables: 'Working prototypes, Code repositories, Design assets, Documentation'
        },
        {
            title: 'Optimization',
            icon: <FaCogs className="text-primary-400" />,
            description: 'We believe in continuous improvement through data-driven decisions. Our team analyzes performance metrics and user feedback to refine and enhance your solution for optimal results.',
            keyPoints: [
                'A/B testing and experimentation',
                'Performance analysis',
                'User feedback collection',
                'Conversion optimization',
                'Technical refinement'
            ],
            duration: 'Ongoing',
            deliverables: 'Performance reports, Optimization recommendations, Implementation updates'
        },
        {
            title: 'Launch',
            icon: <FaRocket className="text-secondary-400" />,
            description: 'The culmination of our collaborative efforts, launch day is strategically planned to ensure a smooth transition and maximum impact. We provide support throughout the deployment process and beyond.',
            keyPoints: [
                'Launch strategy execution',
                'Final quality assurance',
                'Training and knowledge transfer',
                'Monitoring and support',
                'Post-launch assessment'
            ],
            duration: '1-2 weeks',
            deliverables: 'Final deliverables, Training documentation, Support plan, Success metrics'
        }
    ];

    const additionalInfo = [
        {
            title: 'Client Collaboration',
            icon: <FaUsers className="text-accent-400" />,
            description: 'We believe in transparent, collaborative partnerships. Our clients are integral to the process, with regular check-ins, updates, and opportunities for feedback at every stage.'
        },
        {
            title: 'Results-Focused Approach',
            icon: <FaChartLine className="text-primary-500" />,
            description: 'Every decision we make is guided by data and aligned with your business goals. We track key metrics throughout the process to ensure we\'re delivering measurable results.'
        },
        {
            title: 'Flexible Timeline',
            icon: <FaRegClock className="text-secondary-500" />,
            description: 'We understand that each project is unique. Timelines are customized based on project complexity, scope, and your specific needs while maintaining efficiency and quality.'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [steps.length]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
            
            // Focus on modal when it opens
            if (modalRef.current) {
                modalRef.current.focus();
            }
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    return (
        <section className="py-24 relative overflow-hidden" id="howwework">
            {/* Background */}
            <div className="absolute inset-0 bg-dark-900"></div>
            <div className="absolute inset-0 bg-grid-white"></div>
            <div className="noise-pattern"></div>
            
            {/* Background blobs */}
            <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="morphing-shape w-[40vw] h-[40vw] opacity-30 -bottom-[20vw] -left-[10vw] from-primary-600/30 to-primary-800/30"></div>
                <div className="morphing-shape w-[35vw] h-[35vw] opacity-20 top-[10vh] right-[5vw] animation-delay-2000 from-secondary-600/30 to-secondary-800/30"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 mb-6 glass-card text-white text-sm rounded-full">
                        Our Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">How We Work</h2>
                    <h3 className="text-2xl md:text-3xl font-display font-medium mb-8">
                        <span className="text-gray-300">Simple, Transparent, and </span>
                        <span className="gradient-text">Results-Driven.</span>
                    </h3>
                    <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                        Our process is designed to deliver exceptional results while keeping you informed every step of the way.
                        We believe in transparency and collaboration, ensuring your project exceeds expectations.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* 3D Illustrated Timeline */}
                    <div className="relative">
                        <div className="h-full flex flex-col justify-center">
                            <div className="mb-10">
                                <div className="flex items-center mb-4">
                                    <span className="text-6xl font-display font-bold gradient-text">{steps[activeStep].number}</span>
                                    <span className="text-3xl font-display font-bold text-white ml-4">{steps[activeStep].title}</span>
                                </div>
                                <p className="text-xl text-gray-300">{steps[activeStep].description}</p>
                            </div>
                            
                            {/* Progress bar */}
                            <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                                    style={{ 
                                        width: `${(activeStep + 1) * (100 / steps.length)}%`,
                                        transition: 'width 0.5s ease-in-out' 
                                    }}
                                ></div>
                            </div>
                            
                            {/* Step selectors */}
                            <div className="flex mt-8 space-x-2">
                                {steps.map((step, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveStep(index)}
                                        className={`flex-1 py-3 px-1 rounded-lg transition-all duration-300 ${
                                            activeStep === index 
                                                ? 'glass-card border border-white/10' 
                                                : 'bg-dark-800/50 hover:bg-dark-800'
                                        }`}
                                    >
                                        <span className={`block text-xs font-medium ${
                                            activeStep === index ? 'text-white' : 'text-gray-400'
                                        }`}>
                                            {step.title}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* 3D Visual */}
                    <div className="relative card-3d h-[500px]">
                        {steps.map((step, index) => (
                            <div 
                                key={index}
                                className={`absolute inset-0 flex justify-center items-center transition-all duration-700 ${
                                    activeStep === index 
                                        ? 'opacity-100 transform-none' 
                                        : 'opacity-0 translate-x-20'
                                }`}
                                style={{
                                    zIndex: activeStep === index ? 10 : 0,
                                }}
                            >
                                <div className="card-3d-content relative w-64 h-64">
                                    {/* Glowing circle */}
                                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-20 blur-2xl animate-pulse-slow`}></div>
                                    
                                    {/* Icon wrapper */}
                                    <div className="absolute inset-12 glass-card rounded-full flex items-center justify-center border border-white/20">
                                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-30`}></div>
                                        
                                        {/* Central icon */}
                                        <div className="text-white text-6xl transform hover:scale-110 transition-transform duration-300 relative z-10">
                                            {step.icon}
                                        </div>
                                        
                                        {/* Orbital paths - decorative */}
                                        <div className="absolute inset-0 rounded-full border border-white/5"></div>
                                        <div className="absolute inset-4 rounded-full border border-white/5"></div>
                                    </div>
                                    
                                    {/* Number indicator */}
                                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-dark-800 to-dark-900 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shadow-lg">
                                        <span className="text-white font-display font-bold">{step.number}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Floating particles */}
                        {[...Array(15)].map((_, i) => (
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
                    </div>
                </div>
                
                {/* Learn more button */}
                <div className="text-center mt-16">
                    <button 
                        className="neo-button group"
                        onClick={() => setShowModal(true)}
                    >
                        <span className="absolute inset-0 border border-white/10 rounded-full"></span>
                        <span className="relative z-10 text-white">Learn More About Our Process</span>
                        <span className="neo-button-effect bg-gradient-to-r from-accent-500 to-secondary-500"></span>
                    </button>
                </div>
            </div>

            {/* Detailed Process Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm">
                    <div 
                        ref={modalRef}
                        className="bg-dark-800 rounded-2xl border border-white/10 shadow-2xl w-full max-w-5xl animate-slideInUp flex flex-col"
                        style={{ 
                            maxHeight: '90vh',
                            margin: 'auto'
                        }}
                        tabIndex={-1}
                    >
                        {/* Header with close button */}
                        <div className="sticky top-0 flex justify-between items-center p-4 border-b border-white/10 bg-dark-800/90 backdrop-blur-sm z-10">
                            <h3 className="text-2xl font-display font-bold gradient-text">Our Detailed Process</h3>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-white transition-colors bg-dark-900/50 p-2 rounded-full"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                        
                        {/* Scrollable content */}
                        <div className="overflow-y-auto flex-1 p-6">
                            <div className="text-center mb-10">
                                <p className="text-gray-300 max-w-3xl mx-auto">
                                    At Viraloab, we follow a structured yet flexible approach designed to deliver exceptional results while adapting to your unique needs and challenges.
                                </p>
                            </div>
                            
                            {/* Detailed steps */}
                            <div className="space-y-12 mb-12">
                                {detailedSteps.map((step, index) => (
                                    <div key={index} className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden group">
                                        {/* Step number */}
                                        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full flex items-center justify-center opacity-10 font-display font-bold text-8xl">
                                            {index + 1}
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="relative z-10">
                                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                                <div className="flex-shrink-0">
                                                    <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center text-3xl border border-white/10">
                                                        {step.icon}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex-grow">
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                                        <h4 className="text-2xl font-bold text-white">{step.title}</h4>
                                                        <div className="glass-card px-4 py-1 rounded-full text-xs text-gray-300 mt-2 md:mt-0">
                                                            Typical Duration: {step.duration}
                                                        </div>
                                                    </div>
                                                    
                                                    <p className="text-gray-300 mb-6">{step.description}</p>
                                                    
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        <div>
                                                            <h5 className="text-white font-medium mb-3">Key Activities:</h5>
                                                            <ul className="space-y-2">
                                                                {step.keyPoints.map((point, idx) => (
                                                                    <li key={idx} className="flex items-start">
                                                                        <FaCheck className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                                                                        <span className="text-gray-300 text-sm">{point}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        
                                                        <div>
                                                            <h5 className="text-white font-medium mb-3">Deliverables:</h5>
                                                            <div className="glass-card bg-dark-900/50 p-4 rounded-lg">
                                                                <p className="text-gray-300 text-sm">{step.deliverables}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Animated highlight on hover */}
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Additional information */}
                            <div className="mb-12">
                                <h4 className="text-2xl font-bold text-white text-center mb-8">What Makes Our Process Unique</h4>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {additionalInfo.map((info, index) => (
                                        <div key={index} className="glass-card p-6 rounded-xl border border-white/10 text-center hover:transform hover:-translate-y-2 transition-transform duration-300">
                                            <div className="text-4xl mb-4 flex justify-center">{info.icon}</div>
                                            <h5 className="text-xl font-bold text-white mb-3">{info.title}</h5>
                                            <p className="text-gray-300 text-sm">{info.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* CTA */}
                            <div className="text-center">
                                <button 
                                    onClick={() => {
                                        setShowModal(false);
                                        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="neo-button group"
                                >
                                    <span className="relative z-10 text-white px-8 py-3">Start Your Project Today</span>
                                    <span className="neo-button-effect bg-gradient-to-r from-primary-500 to-secondary-500"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HowWeWork; 