// API base configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Utility function for making API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Contact API
export const contactAPI = {
  // Submit contact form
  submitContact: async (contactData) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },

  // Admin: Get all contacts
  getAllContacts: async (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiRequest(`/contact/admin?${searchParams}`);
  },

  // Admin: Update contact status
  updateContactStatus: async (id, updateData) => {
    return apiRequest(`/contact/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  // Admin: Get contact statistics
  getContactStats: async () => {
    return apiRequest('/contact/admin/stats');
  },
};

// News API
export const newsAPI = {
  // Get all news articles
  getAllNews: async (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiRequest(`/news?${searchParams}`);
  },

  // Get single news article
  getNewsById: async (id) => {
    return apiRequest(`/news/${id}`);
  },

  // Get featured news
  getFeaturedNews: async (limit = 5) => {
    return apiRequest(`/news/featured?limit=${limit}`);
  },

  // Get news categories
  getNewsCategories: async () => {
    return apiRequest('/news/categories');
  },

  // Admin: Create news article
  createNews: async (newsData) => {
    return apiRequest('/news/admin', {
      method: 'POST',
      body: JSON.stringify(newsData),
    });
  },

  // Admin: Update news article
  updateNews: async (id, newsData) => {
    return apiRequest(`/news/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newsData),
    });
  },

  // Admin: Delete news article
  deleteNews: async (id) => {
    return apiRequest(`/news/admin/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin: Get all news for admin
  getAllNewsAdmin: async (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiRequest(`/news/admin/all?${searchParams}`);
  },
};

// Newsletter API
export const newsletterAPI = {
  // Subscribe to newsletter
  subscribe: async (subscriptionData) => {
    return apiRequest('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  },

  // Unsubscribe from newsletter
  unsubscribe: async (unsubscribeData) => {
    return apiRequest('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify(unsubscribeData),
    });
  },

  // Update newsletter preferences
  updatePreferences: async (preferencesData) => {
    return apiRequest('/newsletter/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferencesData),
    });
  },

  // Admin: Get all subscribers
  getAllSubscribers: async (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiRequest(`/newsletter/admin?${searchParams}`);
  },

  // Admin: Get newsletter statistics
  getNewsletterStats: async () => {
    return apiRequest('/newsletter/admin/stats');
  },

  // Admin: Export subscribers
  exportSubscribers: async (isActive = true) => {
    return apiRequest(`/newsletter/admin/export?isActive=${isActive}`);
  },
};

// About API
export const aboutAPI = {
  // Get all about content
  getAboutContent: async () => {
    return apiRequest('/about');
  },

  // Get specific about section
  getAboutSection: async (section) => {
    return apiRequest(`/about/${section}`);
  },

  // Admin: Create about content
  createAboutContent: async (contentData) => {
    return apiRequest('/about/admin', {
      method: 'POST',
      body: JSON.stringify(contentData),
    });
  },

  // Admin: Update about content
  updateAboutContent: async (section, contentData) => {
    return apiRequest(`/about/admin/${section}`, {
      method: 'PUT',
      body: JSON.stringify(contentData),
    });
  },

  // Admin: Delete about content
  deleteAboutContent: async (section) => {
    return apiRequest(`/about/admin/${section}`, {
      method: 'DELETE',
    });
  },

  // Admin: Get all about content
  getAllAboutContentAdmin: async () => {
    return apiRequest('/about/admin/all');
  },

  // Admin: Reorder about sections
  reorderAboutContent: async (sections) => {
    return apiRequest('/about/admin/reorder', {
      method: 'PUT',
      body: JSON.stringify({ sections }),
    });
  },
};

// Privacy Policy API
export const privacyAPI = {
  // Get current privacy policy
  getPrivacyPolicy: async () => {
    return apiRequest('/privacy-policy');
  },

  // Get privacy policy by version
  getPrivacyPolicyByVersion: async (version) => {
    return apiRequest(`/privacy-policy/${version}`);
  },

  // Admin: Create privacy policy
  createPrivacyPolicy: async (policyData) => {
    return apiRequest('/privacy-policy/admin', {
      method: 'POST',
      body: JSON.stringify(policyData),
    });
  },

  // Admin: Update privacy policy
  updatePrivacyPolicy: async (version, policyData) => {
    return apiRequest(`/privacy-policy/admin/${version}`, {
      method: 'PUT',
      body: JSON.stringify(policyData),
    });
  },

  // Admin: Delete privacy policy
  deletePrivacyPolicy: async (version) => {
    return apiRequest(`/privacy-policy/admin/${version}`, {
      method: 'DELETE',
    });
  },

  // Admin: Get all privacy policies
  getAllPrivacyPoliciesAdmin: async () => {
    return apiRequest('/privacy-policy/admin/all');
  },

  // Admin: Set active privacy policy
  setActivePrivacyPolicy: async (version) => {
    return apiRequest(`/privacy-policy/admin/${version}/activate`, {
      method: 'PUT',
    });
  },
};

// Utility functions
export const utils = {
  // Handle API errors
  handleError: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    return error.message || 'An unexpected error occurred';
  },

  // Format date for display
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  // Format date and time for display
  formatDateTime: (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone number format
  isValidPhone: (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  },
};

export default {
  contactAPI,
  newsAPI,
  newsletterAPI,
  aboutAPI,
  privacyAPI,
  utils,
};
