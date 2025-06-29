import React, { useRef } from "react";
import {
  FaArrowRight,
  FaRocket,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-900 via-dark-950 to-black"
    >
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="morphing-shape w-[60vw] h-[60vw] -top-[20vw] -left-[20vw] sm:w-[50vw] sm:h-[50vw]"></div>
        <div className="morphing-shape w-[70vw] h-[70vw] -bottom-[40vw] -right-[30vw] animation-delay-2000 from-secondary-600 to-primary-500"></div>
        <div className="absolute inset-0 bg-dark-950/70 backdrop-blur-md"></div>
        <div className="noise-pattern"></div>
        <div className="grid-pattern"></div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 relative z-10 py-12 sm:py-20">
        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Left Section */}
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-accent-500 to-secondary-500 text-white mb-4 animate-fadeIn">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-2 animate-ping"></span>
              AI - Powered Digital Solutions
            </span>

            <h1 className="text-2xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-3 animate-slideInUp">
              Empower Your
              <span className="relative mx-1 gradient-text inline">Digital</span>
              Identity
            </h1>

            <p className="text-sm sm:text-lg text-gray-300 max-w-md mb-6 animate-fadeIn delay-300 mx-auto sm:mx-0">
              Unlock powerful, responsive, and AI-scalable digital solutions designed to fuel your business growth.
            </p>

            <div className="flex justify-center sm:justify-start animate-fadeIn delay-500">
              <button
                className="neo-button group text-sm sm:text-lg"
                onClick={() => {
                  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
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

          {/* Right Section */}
          <div className="relative w-full h-[250px] sm:h-[500px] lg:h-[600px] mx-auto">
            <div className="relative w-full h-full flex flex-col justify-center items-center animate-float z-10">
              <div className="absolute bg-gradient-to-br from-secondary-500 to-primary-500 w-24 h-24 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full shadow-2xl blur-xl opacity-30 animate-pulse"></div>

              {/* Feature card only for larger screens */}
              <div className="sm:absolute sm:block bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-xl text-center max-w-sm">
                <h3 className="text-white font-semibold text-xl mb-2">Why Choose Us?</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-accent-500">{f.icon}</span> {f.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
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
