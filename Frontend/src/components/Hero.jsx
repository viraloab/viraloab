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

  useEffect(() => {
    const handleMouseMove = throttle((e) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) / 25;
      const moveY = (y - centerY) / 35;

      document.querySelectorAll(".parallax-hero").forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-speed"));
        const rotateX = Math.max(Math.min(moveY * speed * -0.3, 5), -5);
        const rotateY = moveX * speed * 0.5;

        const originalTransform = el.getAttribute("data-original-transform") || "";
        el.style.transform = `${originalTransform} rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    }, 16);

    const handleMouseLeave = () => {
      document.querySelectorAll(".parallax-hero").forEach((el) => {
        const originalTransform = el.getAttribute("data-original-transform") || "";
        el.style.transform = originalTransform;
      });
    };

    document.querySelectorAll(".parallax-hero").forEach((el) => {
      const computedStyle = window.getComputedStyle(el);
      const originalTransform =
        computedStyle.transform === "none" ? "" : computedStyle.transform;
      el.setAttribute("data-original-transform", originalTransform);
    });

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      heroElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
        heroElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const features = [
    { icon: <FaRocket />, text: "AI-Powered Agility" },
    { icon: <FaChartLine />, text: "Future-Ready Growth" },
    { icon: <FaLightbulb />, text: "Immersive Experiences" },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-dark-950 w-full"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="morphing-shape w-[55vw] h-[55vw] -top-[10vw] -left-[10vw]" />
        <div className="morphing-shape w-[60vw] h-[60vw] -bottom-[30vw] -right-[20vw] animation-delay-2000 from-secondary-600 to-primary-500" />
        <div className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm" />
        <div className="noise-pattern" />
      </div>

      <div className="absolute inset-0 grid-pattern" />

      <div className="w-full px-6 relative z-10 py-20">
        <div className="flex flex-col gap-12 items-center justify-center text-center">
          <div className="space-y-6 w-full lg:w-4/5 xl:w-3/4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm glass-card text-white mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-500 mr-2 animate-pulse"></span>
              AI-Powered Digital Solutions
            </span>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
              Transform Your{" "}
              <span className="relative mx-2">
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
              </span>{" "}
              Presence
            </h1>

            <p className="text-lg text-gray-300 w-full lg:w-3/4 mx-auto">
              We help businesses bloom and brands go viral with innovative,
              AI-powered digital solutions. Together, let’s create something
              unforgettable.
            </p>

            <button
              className="neo-button group mt-6"
              onClick={() => {
                const contactEl = document.getElementById("contact");
                if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="absolute inset-0 border border-white/10 rounded-full"></span>
              <span className="relative z-10 text-white flex items-center">
                Get in Touch
                <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="neo-button-effect bg-gradient-to-r from-accent-500 to-secondary-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
