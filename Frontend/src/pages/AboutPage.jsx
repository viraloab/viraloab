import React from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope, FaGithub } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
    // Company founders data
    const founders = [
        {
            name: "John Smith",
            position: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
            bio: "John founded Viraloab with a vision to transform how businesses engage with technology. With over 10 years of experience in software development and digital strategy, he leads our company's innovation initiatives.",
            social: [
                { icon: <FaLinkedin />, url: "#", label: "LinkedIn" },
                { icon: <FaTwitter />, url: "#", label: "Twitter" },
                { icon: <FaGithub />, url: "#", label: "GitHub" },
                { icon: <FaEnvelope />, url: "mailto:john@viraloab.com", label: "Email" }
            ]
        },
        {
            name: "Sarah Johnson",
            position: "Co-Founder & CTO",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
            bio: "Sarah brings deep technical expertise to Viraloab as our CTO. Her background in AI and machine learning helps us deliver cutting-edge solutions that keep our clients ahead of the curve.",
            social: [
                { icon: <FaLinkedin />, url: "#", label: "LinkedIn" },
                { icon: <FaTwitter />, url: "#", label: "Twitter" },
                { icon: <FaGithub />, url: "#", label: "GitHub" },
                { icon: <FaEnvelope />, url: "mailto:sarah@viraloab.com", label: "Email" }
            ]
        }
    ];

    return (
        <div className="font-sans antialiased text-white bg-dark-950 overflow-x-hidden">
            <Navbar />
            <main>
                <section className="py-24 relative overflow-hidden" id="about">
                    {/* Background */}
                    <div className="absolute inset-0 bg-dark-900/95"></div>
                    <div className="absolute inset-0 grid-pattern"></div>
                    <div className="noise-pattern"></div>
                    
                    {/* Background gradient */}
                    <div className="absolute w-96 h-96 -top-40 -left-20 bg-primary-500/10 rounded-full filter blur-3xl"></div>
                    <div className="absolute w-96 h-96 -bottom-40 -right-20 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
                    
                    <div className="container mx-auto px-4 relative z-10 pt-16">
                        {/* Section Header */}
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 mb-6 glass-card text-white text-sm rounded-full">
                                About Us
                            </span>
                            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-6">Our Story</h1>
                            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                                We are a team of passionate developers, designers, and digital strategists committed to creating innovative solutions that transform businesses.
                            </p>
                        </div>

                        {/* Company Description */}
                        <div className="glass-card rounded-2xl border border-white/10 p-8 md:p-12 mb-16 max-w-4xl mx-auto">
                            <div className="shimmer absolute inset-0 opacity-10 pointer-events-none"></div>
                            
                            <h2 className="text-2xl font-display font-bold text-white mb-6">Our Vision</h2>
                            
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Founded in 2020, Viraloab has quickly established itself as a leader in digital innovation and custom software development. Our mission is to help businesses harness the power of technology to achieve their goals and reach new heights.
                            </p>
                            
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                We believe that every business deserves access to cutting-edge technology solutions that are tailored to their unique needs. Our team combines technical expertise with creative thinking to deliver results that exceed expectations.
                            </p>
                            
                            <p className="text-gray-300 leading-relaxed">
                                From web and mobile app development to digital marketing and branding, we offer comprehensive solutions that help our clients stay ahead in today's competitive digital landscape.
                            </p>
                        </div>

                        {/* Team Section */}
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-white mb-12">Meet Our Leadership</h2>
                        
                        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {founders.map((founder, index) => (
                                <div 
                                    key={index}
                                    className="glass-card rounded-2xl border border-white/10 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-sm h-full"
                                >
                                    <div className="relative h-72 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-transparent z-10"></div>
                                        <img 
                                            src={founder.image} 
                                            alt={founder.name}
                                            className="w-full h-full object-cover"
                                        />
                                        
                                        {/* Social Links */}
                                        <div className="absolute top-4 right-4 z-20 space-y-2">
                                            {founder.social.map((social, idx) => (
                                                <a 
                                                    key={idx}
                                                    href={social.url}
                                                    aria-label={social.label}
                                                    className="w-8 h-8 glass-card rounded-full flex items-center justify-center text-white hover:text-primary-400 border border-white/20 transition-all hover:border-primary-400"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {social.icon}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-1">{founder.name}</h3>
                                        <p className="text-primary-400 mb-4">{founder.position}</p>
                                        <p className="text-gray-300">{founder.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Values or Mission */}
                        <div className="mt-20 text-center">
                            <h2 className="text-2xl font-display font-bold text-white mb-3">Our Values</h2>
                            <p className="text-gray-300 max-w-3xl mx-auto">
                                We are driven by innovation, integrity, and a commitment to excellence in everything we do. 
                                Our clients' success is our success, and we work tirelessly to ensure that each project 
                                delivers real value and meaningful results.
                            </p>
                        </div>
                        
                        {/* Call to Action */}
                        <div className="text-center mt-16">
                            <a 
                                href="/#contact" 
                                className="neo-button group inline-block"
                            >
                                <span className="absolute inset-0 border border-white/10 rounded-full"></span>
                                <span className="relative z-10 text-white px-6 py-3">Get in Touch</span>
                                <span className="neo-button-effect bg-gradient-to-r from-accent-500 to-secondary-500"></span>
                            </a>
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
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage; 