import React, { useState, useEffect, useRef } from 'react';

/**
 * LazyImage component for optimized image loading
 * Loads images only when they're about to enter the viewport
 * Shows a placeholder until the image is loaded
 */
const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholderClassName = '',
  threshold = 0.1,
  rootMargin = '100px',
  ...rest 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Create an intersection observer to detect when the image is near the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && imgRef.current) {
        observer.disconnect();
      }
    };
  }, [threshold, rootMargin]);

  // Handle image load event
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...rest}>
      {/* Show placeholder until image is loaded */}
      {!isLoaded && (
        <div className={`absolute inset-0 bg-dark-800/50 shimmer ${placeholderClassName}`}></div>
      )}
      
      {/* Only start loading the image when it's near the viewport */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoaded}
        />
      )}
    </div>
  );
};

export default LazyImage; 