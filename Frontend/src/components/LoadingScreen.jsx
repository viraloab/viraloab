import React, { useState, useEffect, useRef } from 'react';
import { checkHealth } from '../utils/api';

const LoadingScreen = ({ onLoad }) => {
    const [loadingStatus, setLoadingStatus] = useState('checking');
    const [apiStatus, setApiStatus] = useState('unknown');
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    
    // Handle mouse movement for 3D effect
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        setMousePosition({ x, y });
    };
    
    useEffect(() => {
        // Simulate loading progress with incremental updates
        const progressInterval = setInterval(() => {
            setLoadingProgress(prev => {
                const increment = Math.random() * 12;
                const newValue = Math.min(prev + increment, 95);
                return newValue;
            });
        }, 180);
        
        // Complete loading after a set time
        const loadingTimer = setTimeout(() => {
            setLoadingProgress(100);
            setLoadingStatus('ready');
            onLoad && onLoad();
        }, 3200);
        
        // Check API health
        const checkApiHealth = async () => {
            try {
                await checkHealth();
                setApiStatus('online');
            } catch (error) {
                console.error('API health check failed:', error);
                setApiStatus('offline');
            }
        };
        
        checkApiHealth();
        
        return () => {
            clearTimeout(loadingTimer);
            clearInterval(progressInterval);
        };
    }, [onLoad]);
    
    // Calculate rotation based on mouse position
    const rotateX = mousePosition.y * 10; // -5 to 5 degrees
    const rotateY = mousePosition.x * -10; // -5 to 5 degrees
    
    // Generate random positions for floating elements
    const generateFloatingElements = (count) => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            size: Math.random() * 15 + 5,
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: Math.random() * 0.5 + 0.1,
            animationDuration: Math.random() * 10 + 5,
            animationDelay: Math.random() * 5,
            blur: Math.random() > 0.7
        }));
    };
    
    const floatingElements = generateFloatingElements(25);
    
    // Calculate which sections of the loading ring should be highlighted
    const ringSegments = 12;
    const activeSegments = Math.floor((loadingProgress / 100) * ringSegments);
    
    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 overflow-hidden ${loadingStatus === 'ready' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{
                background: 'linear-gradient(135deg, rgba(2,6,23,0.95) 0%, rgba(15,23,42,0.98) 100%)',
            }}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Morphing gradient shapes */}
                <div className="absolute top-0 left-0 w-[70vw] h-[70vh] opacity-20 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-full filter blur-3xl animate-morphing"></div>
                <div className="absolute bottom-0 right-0 w-[60vw] h-[60vh] opacity-20 bg-gradient-to-br from-accent-500/30 to-primary-500/30 rounded-full filter blur-3xl animate-morphing animation-delay-2000"></div>
                
                {/* Grid pattern */}
                <div className="absolute inset-0 grid-pattern opacity-10"></div>
                
                {/* Noise texture */}
                <div className="noise-pattern"></div>
                
                {/* Floating elements */}
                {floatingElements.map((el) => (
                    <div
                        key={el.id}
                        className={`absolute rounded-full ${el.blur ? 'blur-sm' : ''}`}
                        style={{
                            width: `${el.size}px`,
                            height: `${el.size}px`,
                            left: `${el.x}%`,
                            top: `${el.y}%`,
                            opacity: el.opacity,
                            background: `linear-gradient(135deg, ${Math.random() > 0.5 ? 'rgba(14,165,233,0.4)' : 'rgba(217,70,239,0.4)'} 0%, rgba(249,115,22,0.4) 100%)`,
                            animationName: 'float',
                            animationDuration: `${el.animationDuration}s`,
                            animationDelay: `${el.animationDelay}s`,
                            animationTimingFunction: 'ease-in-out',
                            animationIterationCount: 'infinite',
                        }}
                    />
                ))}
            </div>
            
            {/* 3D Card with loading animation */}
            <div 
                className="relative w-80 perspective-1000"
                style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    transition: 'transform 0.1s ease-out',
                }}
            >
                {/* Main card with glass effect */}
                <div className="relative glass-card rounded-2xl p-8 backdrop-blur-lg border border-white/10 shadow-neon transform-style-3d">
                    {/* Logo and brand */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative w-20 h-20 mb-4">
                            {/* Animated ring segments */}
                            {Array.from({ length: ringSegments }).map((_, i) => {
                                const angle = (i / ringSegments) * 360;
                                const isActive = i < activeSegments;
                                return (
                                    <div 
                                        key={i}
                                        className={`absolute w-full h-full rounded-full border-2 ${isActive ? 'border-accent-500' : 'border-gray-700'} transition-colors duration-300`}
                                        style={{ 
                                            transform: `rotate(${angle}deg)`,
                                            clipPath: 'polygon(50% 50%, 100% 0%, 100% 33%)',
                                        }}
                                    />
                                );
                            })}
                            
                            {/* Inner circle with logo */}
                            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center shadow-inner-md">
                                <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">V</span>
                            </div>
                            
                            {/* Pulsing ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-primary-500/30 animate-pulse-slow"></div>
                        </div>
                        
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Viraloab
                        </h1>
                    </div>
                    
                    {/* Loading visualization */}
                    <div className="mb-8">
                        {/* Animated waveform visualization */}
                        <div className="h-16 mb-4 flex items-center justify-center gap-1">
                            {Array.from({ length: 16 }).map((_, i) => {
                                const height = Math.sin((i / 16) * Math.PI * 2 + (loadingProgress / 10)) * 50 + 50;
                                const isActive = (i / 16) * 100 <= loadingProgress;
                                const delay = i * 0.05;
                                
                                return (
                                    <div 
                                        key={i}
                                        className={`w-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-t from-accent-500 to-primary-500' : 'bg-gray-700'}`}
                                        style={{ 
                                            height: `${height}%`,
                                            animationDelay: `${delay}s`,
                                            animationDuration: '1.2s',
                                            animationName: isActive ? 'pulse-wave' : '',
                                            animationIterationCount: 'infinite',
                                        }}
                                    />
                                );
                            })}
                        </div>
                        
                        {/* Progress bar */}
                        <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full rounded-full"
                                style={{ 
                                    width: `${loadingProgress}%`,
                                    background: 'linear-gradient(90deg, #0ea5e9, #d946ef, #f97316)',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer 2s linear infinite',
                                }}
                            />
                        </div>
                        
                        {/* Progress percentage */}
                        <div className="mt-2 flex justify-between text-xs">
                            <span className="text-gray-400">Initializing</span>
                            <span className="text-white font-medium">{Math.round(loadingProgress)}%</span>
                        </div>
                    </div>
                    
                    {/* Loading message */}
                    <div className="text-center">
                        <p className="text-gray-300 text-sm mb-1 min-h-[20px]">
                            {loadingProgress < 30 ? 'Loading resources...' : 
                             loadingProgress < 60 ? 'Initializing components...' :
                             loadingProgress < 90 ? 'Preparing your experience...' :
                             'Almost ready...'}
                        </p>
                        
                        {/* API status indicator */}
                        {apiStatus !== 'unknown' && (
                            <div className="inline-flex items-center mt-2 px-3 py-1 rounded-full bg-dark-800/50 text-xs">
                                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${apiStatus === 'online' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
                                <span className="text-gray-400">
                                    {apiStatus === 'online' ? 'API Connected' : 'API Offline'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-accent-500/50 to-transparent blur-sm"></div>
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent blur-md"></div>
            </div>
            
            {/* Tech-inspired decorative elements */}
            <div className="absolute bottom-8 left-8 text-xs text-gray-500 font-mono opacity-50">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="leading-tight">
                        {`> ${(Math.random().toString(36).substring(2, 8))}:${Math.floor(Math.random() * 100)}`}
                    </div>
                ))}
            </div>
            
            <div className="absolute top-8 right-8 text-xs text-gray-500 font-mono opacity-50">
                {`system.init(${Math.round(loadingProgress)}%)`}
            </div>
        </div>
    );
};

export default LoadingScreen; 