import React, { useState, useEffect, useRef } from "react";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholderColor = "#1f2937",
  blurDataURL = "",
  width,
  height,
  priority = false,
  onLoad = () => {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  // Handle image loaded event
  const handleImageLoaded = () => {
    setIsLoaded(true);
    onLoad();
  };

  useEffect(() => {
    // If priority is true, load immediately without intersection observer
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading when image is 200px from viewport
        threshold: 0.1,
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [priority]);

  // Predefined aspect ratio container if both width and height are provided
  const aspectRatio =
    width && height ? { paddingBottom: `${(height / width) * 100}%` } : {};

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: placeholderColor,
        ...aspectRatio,
      }}
    >
      {/* Blur-up placeholder */}
      {blurDataURL && !isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center blur-md transition-opacity duration-300"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            opacity: isLoaded ? 0 : 0.5,
          }}
        />
      )}

      {/* Main image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full ${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          style={{
            width: width ? `${width}px` : "100%",
            height: height ? `${height}px` : "100%",
            objectFit: "cover",
            willChange: "opacity",
          }}
          onLoad={handleImageLoaded}
          {...props}
        />
      )}

      {/* Loading indicator */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
