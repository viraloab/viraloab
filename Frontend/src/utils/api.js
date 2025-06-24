// API utility for making requests to the backend

// Get the API URL from environment variables or use a fallback
// Try multiple sources for the API URL
import axios from 'axios';
const API_URL = process.env.VITE_API_URL;

/**
 * Send a contact form submission to the backend
 * @param {Object} formData - The contact form data
 * @returns {Promise} - The response from the API
 */
const usr = process.env.VITE_USR;
const key = process.env.VITE_KEY;
export const submitContactForm = async (formData) => {
  try {
    const response = axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "application/json",
        "usr": usr,
        "x-api-key": key,
      },
      withCredentials: true, 
    });
    return response===undefined ? null : response.status;
  } catch (error) {
    console.error("Error submitting contact form:", error.response?.data || error.message);
    throw error;
  }
};
