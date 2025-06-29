import React, { useEffect, useState, useRef } from "react";

const Clients = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const clientsRef = useRef(null);

  const clients = [
    {
      logo: "/images/chaiwala.jpg",
      name: "Apna Chai Wala",
      description: "Food & Beverage",
      achievement:
        "Increased local store visits by 85% through targeted social media campaigns and local influencer partnerships.",
    },
    {
      logo: "/images/bluehawks_logo.png",
      name: "Blue Hawks",
      description: "Technology",
      achievement:
        "Grew social media following from 3,000 to 60,000+ followers using multi-platform content strategy and community engagement tactics.",
    },
    {
      logo: "/images/lpu-logo.png",
      name: "LPU",
      description: "Education",
      achievement:
        "Enhanced student enrollment by 42% through strategic digital marketing and virtual campus tour experiences.",
    },
    {
      logo: "/images/Hydro.svg",
      name: "Hydromark",
      description: "Hose Manufacturer",
      achievement:
        "Hydromark achieved a 5% increase in sales by strengthening its digital brand identity. Through a focused website redesign that emphasized industrial reliability, product clarity, and brand consistency, Hydromark established stronger online trust and visibility.",
    },
    {
      logo: "/images/cocox_logo.jpeg",
      name: "Cocox",
      description: "Digital Solutions",
      achievement:
        "Implemented an AI chatbot solution that reduced customer service response time by 73% while maintaining 96% satisfaction rate.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % clients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [clients.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("opacity-100", "translate-y-0");
              entry.target.classList.remove("opacity-0", "translate-y-8");
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    const clientElements = document.querySelectorAll(".client-item");
    clientElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      clientElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!clientsRef.current) return;
      const scrollPosition = window.scrollY;
      const elements = clientsRef.current.querySelectorAll(".parallax-element");

      elements.forEach((el, index) => {
        const speed = index % 2 === 0 ? 0.05 : 0.03;
        el.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="py-32 relative overflow-hidden"
      id="clients"
      ref={clientsRef}
    >
      <div className="absolute inset-0 bg-dark-900/95"></div>
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="noise-pattern opacity-20"></div>

      <div className="absolute w-96 h-96 -top-40 -left-20 bg-primary-500/15 rounded-full filter blur-3xl parallax-element"></div>
      <div className="absolute w-96 h-96 -bottom-40 -right-20 bg-secondary-500/15 rounded-full filter blur-3xl parallax-element"></div>
      <div className="absolute w-64 h-64 top-1/3 right-1/4 bg-blue-500/10 rounded-full filter blur-2xl parallax-element"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-5 py-2 mb-8 glass-card text-white text-sm rounded-full animate-pulse-slow">
            Our Partners in Success
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-8">
            Our Trusted Clients
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            We've had the privilege of working with these amazing organizations
            to deliver exceptional digital experiences that drive real business
            results.
          </p>
        </div>

        {/* Featured Client */}
        <div className="mb-24 max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl border border-white/10 overflow-hidden p-10 md:p-16 shadow-xl shadow-primary-900/10 backdrop-blur-sm">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              <div className="md:col-span-2 relative h-40 md:h-auto mx-auto w-full max-w-[220px]">
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                      index === activeIndex
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-10 scale-95"
                    }`}
                  >
                    <div className="relative">
                      {/* Glowing background effect */}
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-75 blur-md "></div>
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="max-w-full max-h-full object-contain transform transition-transform hover:scale-110 duration-300"
                        />
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:col-span-3 text-left">
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-700 ease-in-out ${
                      index === activeIndex
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 absolute"
                    }`}
                  >
                    <h3 className="text-3xl font-bold text-white mb-3 font-display text-center">
                      {client.name}
                    </h3>

                    <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-primary-300 text-sm mb-5">
                      {client.description}
                    </div>

                    <div className="p-6 glass-card bg-dark-800/50 rounded-xl mt-5 border border-white/5 relative overflow-hidden group">
                      <div className="absolute -inset-[200%] top-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-45 transition-all group-hover:left-full duration-1000 ease-out pointer-events-none"></div>
                      <p className="text-gray-200 leading-relaxed">
                        "{client.achievement}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-3 mt-12">
              {clients.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 scale-125 shadow-md shadow-primary-500/50"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to client ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid of Clients */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="client-item opacity-0 translate-y-8 transition-all duration-500 ease-out"
            >
              <div className="glass-card h-full rounded-xl border border-white/10 p-6 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-3 hover:shadow-xl hover:shadow-primary-900/20 overflow-hidden relative group">
                <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none"></div>

                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-500 ease-out rounded-lg"></div>

                <div className="aspect-square w-full flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-dark-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain filter brightness-100 opacity-70 group-hover:opacity-100 transition-all"
                    />
                </div>

                <div className="text-center mt-auto">
                  <h3 className="font-medium text-white group-hover:text-primary-300 transition-colors text-base truncate">
                    {client.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">
                    {client.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="text-center mt-32 relative">
          <div className="absolute -top-20 left-1/2 w-px h-16 bg-gradient-to-b from-transparent to-primary-500/50"></div>
          <p className="text-primary-400 font-semibold mb-3 tracking-wider text-sm uppercase letter-spacing-wide">
            WHY CLIENTS TRUST US
          </p>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 relative inline-block">
            Delivering Exceptional Results
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full after:content-[''] after:absolute after:w-1/3 after:h-full after:bg-white/70 after:top-0 after:-left-10 after:animate-shimmer after:rounded-full"></span>
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed mt-4">
            Our clients choose us for our technical expertise, creative
            solutions, and unwavering commitment to excellence in every project
          </p>
        </div>

        {/* Animated Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor:
                i % 3 === 0
                  ? "rgba(255,255,255,0.8)"
                  : i % 3 === 1
                  ? "rgba(99,102,241,0.5)"
                  : "rgba(139,92,246,0.5)",
              opacity: Math.random() * 0.5 + 0.3,
              animation: `float ${
                Math.random() * 8 + 10
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
