import React, { useState, useEffect } from 'react';
import { FaCalendar, FaUser, FaArrowRight, FaTags, FaBookmark } from 'react-icons/fa';

const Blog = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [animatedPosts, setAnimatedPosts] = useState([]);
    
    const blogPosts = [
        {
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
            title: 'The Future of Custom Software Development',
            excerpt: 'Explore the latest trends and innovations shaping the future of custom software development.',
            author: 'John Smith',
            date: 'Apr 8, 2024',
            category: 'Technology',
            readTime: '5 min read'
        },
        {
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
            title: 'How AI is Transforming Business Solutions',
            excerpt: 'Discover how artificial intelligence is revolutionizing business software solutions.',
            author: 'Emma Wilson',
            date: 'Apr 6, 2024',
            category: 'AI & ML',
            readTime: '7 min read'
        },
        {
            image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3',
            title: 'Essential Features of Modern ERP Systems',
            excerpt: 'Learn about the must-have features in modern enterprise resource planning solutions.',
            author: 'Michael Brown',
            date: 'Apr 4, 2024',
            category: 'ERP',
            readTime: '4 min read'
        }
    ];

    const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
    
    const filteredPosts = activeFilter === 'All' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === activeFilter);

    useEffect(() => {
        // Animation for blog posts
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const postIndex = parseInt(entry.target.dataset.index);
                    setAnimatedPosts(prev => [...prev, postIndex]);
                }
            });
        }, { threshold: 0.1 });

        const postElements = document.querySelectorAll('.blog-post');
        postElements.forEach(element => {
            observer.observe(element);
        });

        return () => {
            postElements.forEach(element => observer.unobserve(element));
        };
    }, [filteredPosts]);

    return (
        <section className="py-24 relative overflow-hidden" id="blog">
            {/* Background */}
            <div className="absolute inset-0 bg-dark-900/95"></div>
            <div className="absolute inset-0 bg-grid-white/5"></div>
            <div className="noise-pattern"></div>
            
            {/* Background gradient */}
            <div className="absolute w-96 h-96 -top-40 -right-20 bg-primary-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute w-96 h-96 -bottom-40 -left-20 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 mb-6 glass-card text-white text-sm rounded-full">
                        Our Blog
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-6">Latest Insights</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        Stay updated with our latest thoughts on technology, innovation, and digital transformation.
                    </p>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                activeFilter === category
                                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow'
                                    : 'glass-card border border-white/10 text-gray-300 hover:text-white hover:border-white/30'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <article 
                            key={index}
                            data-index={index}
                            className={`blog-post glass-card rounded-2xl overflow-hidden relative border border-white/10 hover:border-white/30 transition-all duration-500 transform ${
                                animatedPosts.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                            }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Shimmer effect */}
                            <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none"></div>
                            
                            <div className="relative h-56 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent z-10"></div>
                                <img 
                                    src={post.image}
                                    alt={post.title}
                                    className={`w-full h-full object-cover transition-all duration-700 ${
                                        hoveredIndex === index ? 'scale-110 filter brightness-75' : 'scale-100'
                                    }`}
                                />
                                
                                {/* Category badge */}
                                <div className="absolute top-4 right-4 z-20">
                                    <span className="glass-card text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                                        {post.category}
                                    </span>
                                </div>
                                
                                {/* Bookmark button */}
                                <button className="absolute top-4 left-4 z-20 w-8 h-8 glass-card rounded-full flex items-center justify-center text-gray-300 hover:text-primary-400 border border-white/20 transition-colors">
                                    <FaBookmark className="text-xs" />
                                </button>
                            </div>
                            
                            <div className="p-6 relative">
                                {/* Meta info */}
                                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                                    <div className="flex items-center">
                                        <FaCalendar className="mr-2 text-primary-400" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaUser className="mr-2 text-secondary-400" />
                                        <span>{post.author}</span>
                                    </div>
                                    <span className="text-gray-500">{post.readTime}</span>
                                </div>
                                
                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors">
                                    {post.title}
                                </h3>
                                
                                {/* Excerpt */}
                                <p className="text-gray-400 mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                
                                {/* Read more button */}
                                <a 
                                    href="#" 
                                    className="neo-button-sm group inline-flex items-center text-sm"
                                >
                                    <span className="relative z-10 text-white flex items-center">
                                        Read more
                                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                    <span className="neo-button-effect bg-gradient-to-r from-primary-500 to-secondary-500"></span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
                
                {/* View all button */}
                <div className="text-center mt-16">
                    <button className="neo-button group">
                        <span className="absolute inset-0 border border-white/10 rounded-full"></span>
                        <span className="relative z-10 text-white">View All Articles</span>
                        <span className="neo-button-effect bg-gradient-to-r from-accent-500 to-secondary-500"></span>
                    </button>
                </div>
            </div>
            
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
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

export default Blog; 