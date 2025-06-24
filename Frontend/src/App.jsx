import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SectionConnector from "./components/SectionConnector";
import PromoPopup from "./components/PromoPopup";
import { initAnalytics } from "./utils/analytics";
import { initPrefetching } from "./utils/prefetch";
import PrivacyPolicyPopup from "./components/PrivacyPolicy";

// Lazy load components to improve initial page load performance
const Services = lazy(() => import("./components/Services"));
const HowWeWork = lazy(() => import("./components/HowWeWork"));
const Clients = lazy(() => import("./components/Clients"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const ContactForm = lazy(() => import("./components/ContactForm"));
const Footer = lazy(() => import("./components/Footer"));

// Simple loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="shimmer w-16 h-16 rounded-full bg-white/5"></div>
  </div>
);

// Create a separate component for the home page to use location-specific effects
const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL, and scroll to that section
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }

    // Scroll animation for sections - reinitialize when we navigate to home
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    // Get all sections with reveal class and make them visible immediately
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((element) => {
      // Reset the element's state when navigating back to home
      element.classList.remove("active");
      observer.observe(element);

      // Force immediate visibility for elements in viewport
      const rect = element.getBoundingClientRect();
      const isInViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (isInViewport) {
        element.classList.add("active");
      }
    });

    // Scroll to top when navigating back to home
    if (!location.hash) {
      window.scrollTo(0, 0);
    }

    return () => observer.disconnect();
  }, [location]);

  return (
    <main>
      <section id="home">
        <Hero />
      </section>

      <SectionConnector variant="wave" />

      <div className="relative">
        <section id="services" className="reveal">
          <Suspense fallback={<SectionLoader />}>
            <Services />
          </Suspense>
        </section>

        <SectionConnector variant="tech" />

        <section id="howwework" className="reveal">
          <Suspense fallback={<SectionLoader />}>
            <HowWeWork />
          </Suspense>
        </section>

        <SectionConnector variant="dots" />

        <section id="clients" className="reveal">
          <Suspense fallback={<SectionLoader />}>
            <Clients />
          </Suspense>
        </section>

        <SectionConnector variant="wave" />
        <section id="aboutUs" className="reveal">
          <Suspense fallback={<SectionLoader />}>
            <AboutUs />
          </Suspense>
        </section>

        <SectionConnector variant="tech" />

        <section id="contact" className="reveal">
          <Suspense fallback={<SectionLoader />}>
            <ContactForm />
          </Suspense>
        </section>
      </div>
    </main>
  );
};

// Scroll to top component for route changes
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
};

function App() {
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(true);

  // Initialize analytics and prefetching
  useEffect(() => {
    // Initialize analytics
    initAnalytics();

    // Setup prefetching for critical resources
    initPrefetching({
      // Add image paths that should be prefetched
      images: ["/images/logo.svg", "/images/hero-bg.svg"],
      // Add external domains to preconnect to
      connections: [
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
      ],
      // Add critical font resources - using Google Fonts directly
      fonts: [],
      // Delay prefetching to not compete with critical resources
      delay: 2500,
    });
  }, []);

  // Function to handle closing the popup
  const handleClosePromoPopup = () => {
    setShowPromoPopup(false);
  };

  // Function to determine device type based on window width
  function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width >= 768 && width < 1024) return "tablet";
    return "desktop";
  }

  function closePrivacyPolicy(policy) {
    setShowPrivacy(policy);
    setShowPromoPopup(true);
  }

  return (
    <Router>
      {
        <>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>

          {showPrivacy && (
            <PrivacyPolicyPopup onClose={() => closePrivacyPolicy(false)} />
          )}

          {"desktop" == getDeviceType() && showPromoPopup && (
            <PromoPopup onClose={handleClosePromoPopup} />
          )}
        </>
      }
    </Router>
  );
}

export default App;
