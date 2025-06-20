/**
 * Set a cookie with the given name, value, and optional days until expiry
 * @param {string} name - The name of the cookie
 * @param {string} value - The value of the cookie
 * @param {number} days - Number of days until the cookie expires (defaults to 7)
 */
export const setCookie = (name, value, days = 7) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
  
  const cookieValue = encodeURIComponent(value) + 
    "; expires=" + expiryDate.toUTCString() + 
    "; path=/; SameSite=Strict";
  
  document.cookie = name + "=" + cookieValue;
};

/**
 * Get a cookie by name
 * @param {string} name - The name of the cookie to retrieve
 * @returns {string|null} The cookie value or null if not found
 */
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }
  
  return null;
};

/**
 * Check if a cookie exists
 * @param {string} name - The name of the cookie to check
 * @returns {boolean} Whether the cookie exists
 */
export const hasCookie = (name) => {
  return getCookie(name) !== null;
};

/**
 * Delete a cookie by name
 * @param {string} name - The name of the cookie to delete
 */
export const deleteCookie = (name) => {
  document.cookie = name + '=; Max-Age=-99999999; path=/';
}; 