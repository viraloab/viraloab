import React, { useState, useEffect, useCallback } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { throttle } from "../utils/performance";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const location = useLocation();

  // Updated menu items to include all sections in the homepage
  const menuItems = [
    { title: "Home", href: "/", sectionId: "home" },
    { title: "Services", href: "#services", sectionId: "services" },
    { title: "How We Work", href: "#howwework", sectionId: "howwework" },
    { title: "Clients", href: "#clients", sectionId: "clients" },
    { title: "About Us", href: "#aboutUs", sectionId: "aboutUs" },
    { title: "Contact", href: "#contact", sectionId: "contact" },
  ];

  // Create a memoized, throttled scroll handler for better performance
  const handleScroll = useCallback(
    throttle(() => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Only update active menu item based on scroll when on homepage
      if (location.pathname === "/") {
        // Get all sections with IDs
        const sections = document.querySelectorAll("section[id]");

        // Create an array to track which sections are in view
        const inViewSections = Array.from(sections).map((section) => {
          const sectionTop = section.getBoundingClientRect().top;
          const sectionBottom = section.getBoundingClientRect().bottom;
          const windowHeight = window.innerHeight;

          // Check if section is in viewport with priority for sections near the top
          const isInView =
            (sectionTop < windowHeight * 0.5 && sectionBottom > 0) ||
            (sectionTop < 0 && sectionBottom > windowHeight * 0.3);

          return {
            id: section.id,
            inView: isInView,
            topPosition: sectionTop, // For priority sorting
          };
        });

        // Find all sections in view, prioritize the one closest to the top of the screen
        const sectionsInView = inViewSections
          .filter((section) => section.inView)
          .sort((a, b) => {
            // If a section is near the top of the screen, prioritize it
            if (a.topPosition > -100 && a.topPosition < 100) return -1;
            if (b.topPosition > -100 && b.topPosition < 100) return 1;

            // Otherwise sort by position
            return Math.abs(a.topPosition) - Math.abs(b.topPosition);
          });

        // Set active menu item based on the first section in view
        if (sectionsInView.length > 0) {
          const currentSectionId = sectionsInView[0].id;
          const matchingItem = menuItems.find(
            (item) => item.sectionId === currentSectionId
          );

          if (matchingItem) {
            setActiveItem(matchingItem.title);
          }
        } else if (offset < 100) {
          // If no section is in view and we're at the top, set Home as active
          setActiveItem("Home");
        }
      }
    }, 100),
    [location.pathname]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Trigger once to set initial active state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Update active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find((item) => {
      if (currentPath === "/" && item.href === "/") return true;
      return false;
    });

    if (currentItem) {
      setActiveItem(currentItem.title);
    }
  }, [location.pathname]);

  const handleNavClick = (item) => {
    setActiveItem(item.title);

    // If it's a section on the homepage
    if (item.href.startsWith("#")) {
      // If we're already on the homepage
      if (location.pathname === "/") {
        const element = document.getElementById(item.href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 rounded-xl ${
        scrolled ? "glass-dark py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-500 to-secondary-500 rounded-full animate-pulse-slow"></div>
              <div className="absolute inset-1 bg-dark-900 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">V</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-2xl font-bold ${
                  scrolled ? "gradient-text" : "text-white"
                }`}
              >
                Viraloab
              </span>
              <span
                className={`text-xs tracking-wide ${
                  scrolled ? "text-dark-400" : "text-primary-300"
                }`}
              >
                viral on all bits and bytes
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <div
              className={`p-1 rounded-full ${
                scrolled ? "glass-card" : "bg-dark-900/30"
              }`}
            >
              <div className="flex items-center">
                {/* Only show first 6 menu items in desktop nav to avoid overcrowding */}
                {menuItems.slice(0, 6).map((item, index) => (
                  <Link
                    key={index}
                    to={
                      item.href.startsWith("#") && location.pathname !== "/"
                        ? "/" + item.href
                        : item.href
                    }
                    onClick={() => handleNavClick(item)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      activeItem === item.title
                        ? "text-white"
                        : scrolled
                        ? "text-dark-300 hover:text-white"
                        : "text-white/70 hover:text-white"
                    } ${
                      item.isUnique ? "ml-2 border border-accent-500/30" : ""
                    }`}
                  >
                    {activeItem === item.title && (
                      <span
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${
                          item.isUnique
                            ? "from-secondary-600 to-accent-600"
                            : "from-primary-500 to-accent-500"
                        } animate-fadeIn`}
                      ></span>
                    )}
                    <span className="relative z-10">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <div
              className={`absolute inset-0 rounded-full ${
                isOpen ? "bg-accent-500/20" : "bg-transparent"
              } transition-all duration-300`}
            ></div>
            {isOpen ? (
              <FaTimes
                className={`relative z-10 ${
                  scrolled ? "text-white" : "text-white"
                }`}
              />
            ) : (
              <FaBars
                className={`relative z-10 ${
                  scrolled ? "text-white" : "text-white"
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 transform ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0 pointer-events-none"
          }`}
        >
          <div className="glass-dark backdrop-blur-lg mt-2 rounded-b-xl p-4 mx-4 space-y-3 border-t border-white/5">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={
                  item.href.startsWith("#") && location.pathname !== "/"
                    ? "/" + item.href
                    : item.href
                }
                className={`block px-4 py-2 rounded-lg ${
                  activeItem === item.title
                    ? "bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-white"
                    : "text-dark-300 hover:text-white"
                } transition-colors duration-300 text-sm ${
                  item.isUnique ? "border border-accent-500/30" : ""
                }`}
                onClick={() => {
                  setActiveItem(item.title);
                  if (item.href.startsWith("#") && location.pathname === "/") {
                    const element = document.getElementById(
                      item.href.substring(1)
                    );
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                  setIsOpen(false);
                }}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
