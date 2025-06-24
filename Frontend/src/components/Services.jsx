import React, { useState, useRef, useEffect } from "react";
import {
  FaChevronRight,
  FaTimes,
  FaSearch,
  FaLaptopCode,
  FaPalette,
  FaMobileAlt,
  FaBullhorn,
  FaCode,
} from "react-icons/fa";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const modalRef = useRef(null);

  const services = [
    {
      title: "Digital Marketing",
      icon: <FaSearch className="text-3xl" />,
      color: "from-primary-600 to-primary-400",
      description:
        "Boost your online presence with our comprehensive digital marketing services.",
      details: [
        "Search Engine Optimization (SEO)",
        "Social Media Marketing",
        "Pay-Per-Click Advertising",
        "Email Marketing",
        "Content Marketing",
        "Analytics and Reporting",
      ],
    },
    {
      title: "Web & App Development",
      icon: <FaLaptopCode className="text-3xl" />,
      color: "from-secondary-600 to-secondary-400",
      description:
        "Custom digital solutions that deliver exceptional user experiences across all platforms.",
      details: [
        "Responsive Website Design",
        "E-commerce Development",
        "Custom Web Applications",
        "iOS & Android App Development",
        "Cross-Platform Solutions",
        "Progressive Web Apps (PWAs)",
        "UI/UX Design",
        "CMS Implementation",
        "API Development & Integration",
        "Maintenance & Support",
      ],
    },
    {
      title: "AI & Chatbot Solutions",
      icon: <FaCode className="text-3xl" />,
      color: "from-accent-600 to-accent-400",
      description:
        "Custom AI-powered tools and intelligent chatbots to automate processes and enhance customer experiences.",
      details: [
        "Custom Chatbot Development",
        "AI Integration Services",
        "Natural Language Processing",
        "Conversational UI Design",
        "Customer Service Automation",
        "Virtual Assistants",
        "AI Training & Implementation",
        "Chatbot Analytics & Optimization",
        "Multi-Platform Bot Deployment",
        "Voice-Enabled Solutions",
      ],
    },
    {
      title: "Social Media Content Creation",
      icon: <FaMobileAlt className="text-3xl" />,
      color: "from-primary-500 to-accent-500",
      description:
        "Engaging social media content that captivates your audience and builds your brand presence.",
      details: [
        "Professional Content Creation",
        "Video Production & Editing",
        "Graphic Design & Visual Assets",
        "Social Media Strategy",
        "Animation & Motion Graphics",
        "Photography Services",
        "Copywriting & Caption Creation",
        "Content Calendar Planning",
        "Brand Consistency Management",
        "Trend Analysis & Implementation",
      ],
    },
    {
      title: "Branding",
      icon: <FaPalette className="text-3xl" />,
      color: "from-primary-600 to-secondary-500",
      description:
        "Comprehensive branding services to establish a powerful and consistent brand identity.",
      details: [
        "Brand Strategy Development",
        "Logo Design & Visual Identity",
        "Brand Guidelines Creation",
        "Brand Messaging & Voice",
        "Brand Positioning",
        "Rebranding Services",
        "Brand Asset Development",
        "Brand Experience Design",
        "Brand Audit & Analysis",
        "Brand Story Crafting",
      ],
    },
    {
      title: "Influencer Marketing",
      icon: <FaBullhorn className="text-3xl" />,
      color: "from-primary-400 to-accent-400",
      description:
        "Strategic influencer partnerships that drive brand awareness and customer engagement.",
      details: [
        "Influencer Discovery & Vetting",
        "Campaign Strategy & Design",
        "Influencer Outreach & Management",
        "Content Collaboration",
        "Performance Tracking & Analytics",
        "ROI Measurement",
        "Influencer Contract Negotiation",
        "Audience Analysis",
        "Trend Identification",
        "Authentic Brand Storytelling",
      ],
    },
  ];

  const handleServiceClick = (index) => {
    setSelectedService(services[index]);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (selectedService) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedService]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("translate-y-0", "opacity-100");
              entry.target.classList.remove("translate-y-20", "opacity-0");
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    const serviceItems = document.querySelectorAll(".service-card");
    serviceItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      serviceItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" id="services">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900 opacity-70"></div>
      <div className="noise-pattern"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 glass-card text-white text-sm rounded-full">
            Our Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
            Services We Offer
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            We provide cutting-edge solutions to help your business grow and
            thrive in the digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card card-3d group cursor-pointer transform transition-all duration-500 ease-out translate-y-20 opacity-0"
              onClick={() => handleServiceClick(index)}
            >
              <div className="relative glass-card h-full rounded-2xl overflow-hidden p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2">
                {/* Card content */}
                <div className="card-3d-content h-full flex flex-col">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${service.color} shadow-lg`}
                  >
                    <div className="text-white">{service.icon}</div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Button */}
                  <div className="mt-auto flex items-center text-primary-400 group-hover:text-primary-300 transition-colors">
                    <span className="mr-2 text-sm font-medium">Learn More</span>
                    <FaChevronRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Background shimmer */}
                <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm transition-all">
          <div
            ref={modalRef}
            className="bg-dark-800 rounded-2xl w-full max-w-4xl overflow-hidden border border-white/10 shadow-2xl transform transition-transform"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${selectedService.color} mr-4`}
                >
                  <div className="text-white">{selectedService.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6">
              <p className="text-gray-300 mb-8">
                {selectedService.description}
              </p>

              <h4 className="text-xl font-semibold text-white mb-4">
                What We Offer:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedService.details.map((detail, index) => (
                  <div key={index} className="flex items-start">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br ${selectedService.color} mr-3 mt-0.5 flex-shrink-0`}
                    >
                      <FaChevronRight className="text-white text-xs" />
                    </div>
                    <p className="text-gray-300">{detail}</p>
                  </div>
                ))}
              </div>

              {/* Call to action */}
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => {
                    closeModal();
                    document
                      .getElementById("contact")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                  className="neo-button group"
                >
                  <span className="relative z-10 text-white flex items-center px-8 py-3">
                    Get Started
                    <FaChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="neo-button-effect bg-gradient-to-r from-primary-500 to-secondary-500"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
