import React, { useEffect, useRef } from "react";
import {
  FaArrowRight,
  FaRocket,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";
import { throttle } from "../utils/performance";

const Hero = () => {
  const heroRef = useRef(null);

  const features = [
    { icon: <FaRocket />, text: "Fast Development" },
    { icon: <FaChartLine />, text: "Scalable Solutions" },
    { icon: <FaLightbulb />, text: "Innovative Design" },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-dark-950"
    >
      {/* Background gradient and shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="morphing-shape w-[55vw] h-[55vw] -top-[10vw] -left-[10vw]"></div>
        <div className="morphing-shape w-[60vw] h-[60vw] -bottom-[30vw] -right-[20vw] animation-delay-2000 from-secondary-600 to-primary-500"></div>
        <div className="absolute inset-0 bg-dark-950/60 backdrop-filter backdrop-blur-sm"></div>
        <div className="noise-pattern"></div>
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern"></div>

      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Text Content - 3 columns */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm glass-card text-white mb-6">
                <span className="inline-block w-2 h-2 rounded-full bg-accent-500 mr-2 animate-pulse"></span>
                Innovating Digital Solutions
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-4">
              Transform Your
              <span className="relative mx-4">
                <span className="gradient-text relative z-10">Digital</span>
                <svg
                  className="absolute -bottom-4 left-0 w-full h-3 text-accent-500"
                  viewBox="0 0 100 15"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q40,15 80,8 Q90,4 100,8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
              </span>
              <br />
              Presence
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl opacity-0 animate-slideInUp animation-delay-200">
              We create innovative digital solutions that help businesses thrive
              in the modern world. Let's build something amazing together.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-3 gap-4 mb-10 opacity-0 animate-slideInUp animation-delay-300">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center lg:items-start p-4 rounded-xl glass-card hover:shadow-inner-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-accent-500 text-2xl mb-2 group-hover:scale-110 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-white text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center lg:justify-start opacity-0 animate-slideInUp animation-delay-400">
              <button
                className="neo-button group"
                onClick={() => {
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="absolute inset-0 border border-white/10 rounded-full"></span>
                <span className="relative z-10 text-white flex items-center">
                  Get in Touch
                  <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="neo-button-effect bg-gradient-to-r from-accent-500 to-secondary-500"></span>
              </button>
            </div>
          </div>

          {/* 3D Visual area - 2 columns */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="relative h-[600px] perspective-1000">
              {/* Floating card with parallax effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 perspective-1000 w-full h-full">
                <div className="relative card-3d w-full h-full max-w-md mx-auto">

                  {/* Background decorative elements */}
                  <div
                    className="parallax-hero absolute w-40 h-40 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full opacity-20 blur-xl"
                    data-speed="2"
                    style={{ top: "10%", right: "5%" }}
                  ></div>
                  <div
                    className="parallax-hero absolute w-60 h-60 bg-gradient-to-br from-accent-500 to-secondary-500 rounded-full opacity-20 blur-xl"
                    data-speed="1.5"
                    style={{ bottom: "10%", left: "0%" }}
                  ></div>
                </div>
              </div>

              {/* Floating particles */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.3,
                    animation: `float ${
                      Math.random() * 2 + 2
                    }s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave design */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="w-full text-dark-900 h-auto"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L40 114C80 108 160 96 240 90C320 84 400 84 480 90C560 96 640 108 720 108C800 108 880 96 960 84C1040 72 1120 60 1200 60C1280 60 1360 72 1400 78L1440 84V120H1400C1360 120 1280 120 1200 120C1120 120 1040 120 960 120C880 120 800 120 720 120C640 120 560 120 480 120C400 120 320 120 240 120C160 120 80 120 40 120H0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
