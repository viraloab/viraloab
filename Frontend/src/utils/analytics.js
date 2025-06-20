/**
 * Simple analytics module for tracking user events
 * This can be replaced with a more robust solution like Google Analytics, Mixpanel, etc.
 */

// Track key events on the site
export const trackEvent = (eventName, eventProperties = {}) => {
  // Log to console in development
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isDev) {
    console.log('ANALYTICS EVENT:', eventName, eventProperties);
  }
  
  // In production, this would send data to an analytics service
  // Example: window.gtag('event', eventName, eventProperties);
  
  // Store event in localStorage for debugging
  try {
    const existingEvents = JSON.parse(localStorage.getItem('viraloab_analytics') || '[]');
    const newEvent = {
      name: eventName,
      properties: eventProperties,
      timestamp: new Date().toISOString()
    };
    
    existingEvents.push(newEvent);
    localStorage.setItem('viraloab_analytics', JSON.stringify(existingEvents.slice(-50))); // Keep last 50 events
  } catch (error) {
    console.error('Error storing analytics event:', error);
  }
};

// Track page views
export const trackPageView = (pageName) => {
  trackEvent('page_view', { page: pageName });
};

// Track popup interactions
export const trackPopupEvent = (action, popupName) => {
  trackEvent('popup_interaction', { action, popup_name: popupName });
};

// Track button clicks
export const trackButtonClick = (buttonName, buttonLocation) => {
  trackEvent('button_click', { button_name: buttonName, location: buttonLocation });
};

// Track form submissions
export const trackFormSubmission = (formName, formData = {}) => {
  // Remove sensitive data before tracking
  const safeFormData = { ...formData };
  delete safeFormData.password;
  delete safeFormData.email;
  
  trackEvent('form_submission', { 
    form_name: formName,
    has_email: !!formData.email,
    fields_completed: Object.keys(formData).length
  });
};

// Track load performance metrics
export const trackPerformance = () => {
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    const domReadyTime = timing.domComplete - timing.domLoading;
    
    trackEvent('performance_metrics', {
      page_load_time_ms: pageLoadTime,
      dom_ready_time_ms: domReadyTime
    });
  }
};

// Initialize analytics
export const initAnalytics = () => {
  // Track initial page view
  trackPageView(window.location.pathname);
  
  // Track performance after window load
  window.addEventListener('load', () => {
    setTimeout(trackPerformance, 0);
  });
  
  return {
    trackEvent,
    trackPageView,
    trackPopupEvent,
    trackButtonClick,
    trackFormSubmission
  };
}; 