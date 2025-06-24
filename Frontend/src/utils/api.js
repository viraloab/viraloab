// API utility for making requests to the backend

// Get the API URL from environment variables or use a fallback
// Try multiple sources for the API URL
const API_URL = 
  import.meta.env.VITE_API_URL || 
  (window.VITE_API_URL) || 
  (import.meta.env.MODE === 'production' 
    ? 'https://viraloabbackend.vercel.app' 
    : 'http://localhost:5001');

// Remove trailing slash if present
const BASE_API_URL = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;

/**
 * Send a contact form submission to the backend
 * @param {Object} formData - The contact form data
 * @returns {Promise} - The response from the API
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      // Add credentials for cross-origin requests if needed
      credentials: 'include',
    });
    
    if (!response.ok) {
      // Improved error handling with status codes
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

/**
 * Check if the backend is healthy
 * @returns {Promise} - The response from the API
 */
export const checkHealth = async () => {
  try {
    // Ensure we don't have a double slash by using the sanitized base URL
    const healthUrl = `${BASE_API_URL}/api/health`;
    console.log('Checking health at URL:', healthUrl);
    
    const response = await fetch(healthUrl, {
      method: 'GET',
      credentials: 'include', // Add credentials for CORS
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Health check failed with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
}; 