/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to wait
 * @param {boolean} immediate - Whether to execute at the beginning of the wait period
 * @returns {Function} The debounced function
 */
export const debounce = (func, wait = 100, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const context = this;
    
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(context, args);
  };
};

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to wait between executions
 * @returns {Function} The throttled function
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function executedFunction(...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Check if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} offset - Optional offset to trigger earlier visibility
 * @returns {boolean} Whether the element is in the viewport
 */
export const isInViewport = (element, offset = 0) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.bottom >= 0 - offset &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) + offset &&
    rect.right >= 0 - offset
  );
};

/**
 * Optimize rendering of elements when they're in the viewport
 * @param {HTMLElement} element - The element to observe
 * @param {Function} callback - Function to call when element enters/exits viewport
 * @param {Object} options - IntersectionObserver options
 * @returns {IntersectionObserver} The observer instance
 */
export const createIntersectionObserver = (element, callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };
  
  const observer = new IntersectionObserver(callback, defaultOptions);
  
  if (element) {
    observer.observe(element);
  }
  
  return observer;
}; 