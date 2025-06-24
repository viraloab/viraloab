import React, { useEffect, useRef, memo, useMemo } from "react";
import { createIntersectionObserver } from "../utils/performance";

const SectionConnector = ({ variant = "default" }) => {
  const connectorRef = useRef(null);

  // Pre-calculate random values for tech connectors to avoid recalculation on re-renders
  const techElements = useMemo(() => {
    if (variant !== "tech") return [];

    return [...Array(48)].map((_, i) => ({
      isPrimary: Math.random() > 0.5,
      width: `${Math.floor(Math.random() * 80) + 20}%`,
      opacity: Math.random() * 0.5 + 0.2,
      gridColumn: `${Math.floor(Math.random() * 12) + 1} / span 1`,
      gridRow: `${Math.floor(i / 12) + 1} / span 1`,
    }));
  }, [variant]);

  useEffect(() => {
    if (!connectorRef.current) return;

    // Use our optimized IntersectionObserver utility
    const observer = createIntersectionObserver(
      connectorRef.current,
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-appear");
            // Once animated, disconnect the observer to save resources
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    return () => observer.disconnect();
  }, []);

  // Different variants for different section transitions
  const renderConnector = () => {
    switch (variant) {
      case "wave":
        return (
          <div
            ref={connectorRef}
            className="relative h-32 w-full overflow-hidden bg-transparent opacity-0 animate-appear-duration will-change-[opacity,transform]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-full h-32 text-dark-900"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,80 C240,120 480,40 720,80 C960,120 1200,40 1440,80 L1440,120 L0,120 Z"
                  fill="currentColor"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary-500/5 filter blur-3xl"></div>
            </div>
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary-500/50 shadow-glow-md animate-float-slow"></div>
            <div className="absolute top-3/4 right-1/4 w-3 h-3 rounded-full bg-secondary-500/50 shadow-glow-md animate-float"></div>
          </div>
        );

      case "dots":
        return (
          <div
            ref={connectorRef}
            className="relative h-24 w-full flex items-center justify-center opacity-0 animate-appear-duration will-change-[opacity,transform]"
          >
            <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-accent-500/30 to-transparent"></div>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                style={{
                  top: `${25 + i * 12.5}%`,
                  opacity: i === 2 ? 1 : 0.5 - Math.abs(2 - i) * 0.2,
                  transform: `scale(${i === 2 ? 1.5 : 1})`,
                }}
              ></div>
            ))}
          </div>
        );

      case "tech":
        return (
          <div
            ref={connectorRef}
            className="relative h-20 w-full opacity-0 animate-appear-duration will-change-[opacity,transform]"
          >
            <div className="absolute inset-0 grid grid-cols-12 gap-1 opacity-10">
              {techElements.map((el, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full ${
                    el.isPrimary ? "bg-primary-500" : "bg-secondary-500"
                  }`}
                  style={{
                    width: el.width,
                    opacity: el.opacity,
                    gridColumn: el.gridColumn,
                    gridRow: el.gridRow,
                  }}
                ></div>
              ))}
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"></div>
          </div>
        );

      default:
        return (
          <div
            ref={connectorRef}
            className="relative h-28 w-full opacity-0 animate-appear-duration will-change-[opacity,transform]"
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-px h-16 opacity-50">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500 to-transparent pulse-opacity"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-80 shadow-glow-md"></div>
            </div>
          </div>
        );
    }
  };

  return renderConnector();
};

// Memoize the component since it doesn't change often
export default memo(SectionConnector);
