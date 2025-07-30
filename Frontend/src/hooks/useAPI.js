import { useState, useEffect, useCallback } from 'react';

// Custom hook for API calls
export const useAPI = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  return { data, loading, error, execute };
};

// Hook for API calls with automatic execution
export const useAPICall = (apiFunction, dependencies = [], autoExecute = true) => {
  const { data, loading, error, execute } = useAPI(apiFunction, dependencies);

  useEffect(() => {
    if (autoExecute) {
      execute();
    }
  }, [execute, autoExecute]);

  return { data, loading, error, refetch: execute };
};

// Hook for form submissions
export const useFormSubmission = (apiFunction) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);
      
      const result = await apiFunction(formData);
      setSuccess(true);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setSuccess(false);
    setError(null);
  }, []);

  return { 
    submit, 
    isSubmitting, 
    success, 
    error, 
    reset 
  };
};

// Hook for paginated data
export const usePagination = (apiFunction, initialParams = {}) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    count: 0,
    totalRecords: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async (newParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const finalParams = { ...params, ...newParams };
      const result = await apiFunction(finalParams);
      
      setData(result.data || []);
      setPagination(result.pagination || {});
      setParams(finalParams);
      
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, params]);

  const nextPage = useCallback(() => {
    if (pagination.current < pagination.total) {
      fetchData({ page: pagination.current + 1 });
    }
  }, [fetchData, pagination]);

  const prevPage = useCallback(() => {
    if (pagination.current > 1) {
      fetchData({ page: pagination.current - 1 });
    }
  }, [fetchData, pagination]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= pagination.total) {
      fetchData({ page });
    }
  }, [fetchData, pagination.total]);

  const updateParams = useCallback((newParams) => {
    fetchData({ ...newParams, page: 1 });
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    pagination,
    loading,
    error,
    fetchData,
    nextPage,
    prevPage,
    goToPage,
    updateParams,
    hasNextPage: pagination.current < pagination.total,
    hasPrevPage: pagination.current > 1
  };
};

// Hook for newsletter subscription
export const useNewsletter = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { submit, isSubmitting, success, error, reset } = useFormSubmission(
    async (data) => {
      const { newsletterAPI } = await import('../services/api');
      return newsletterAPI.subscribe(data);
    }
  );

  const subscribe = useCallback(async (additionalData = {}) => {
    const subscriptionData = {
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      ...additionalData
    };

    if (!subscriptionData.email) {
      throw new Error('Email is required');
    }

    const result = await submit(subscriptionData);
    
    // Clear form on success
    if (result) {
      setEmail('');
      setFirstName('');
      setLastName('');
    }
    
    return result;
  }, [email, firstName, lastName, submit]);

  return {
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    subscribe,
    isSubmitting,
    success,
    error,
    reset
  };
};

// Hook for contact form
export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    preferredTime: '',
    message: ''
  });

  const { submit, isSubmitting, success, error, reset } = useFormSubmission(
    async (data) => {
      const { contactAPI } = await import('../services/api');
      return contactAPI.submitContact(data);
    }
  );

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      contactNo: '',
      preferredTime: '',
      message: ''
    });
    reset();
  }, [reset]);

  const submitForm = useCallback(async () => {
    // Basic validation
    const required = ['name', 'email', 'contactNo', 'preferredTime'];
    for (const field of required) {
      if (!formData[field]?.trim()) {
        throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
      }
    }

    const result = await submit(formData);
    
    // Clear form on success
    if (result) {
      resetForm();
    }
    
    return result;
  }, [formData, submit, resetForm]);

  return {
    formData,
    updateField,
    submitForm,
    resetForm,
    isSubmitting,
    success,
    error
  };
};

// Hook for news data
export const useNews = (params = {}) => {
  const { newsAPI } = require('../services/api');
  
  return usePagination(newsAPI.getAllNews, {
    page: 1,
    limit: 10,
    ...params
  });
};

// Hook for featured news
export const useFeaturedNews = (limit = 5) => {
  const { newsAPI } = require('../services/api');
  
  return useAPICall(
    () => newsAPI.getFeaturedNews(limit),
    [limit]
  );
};

// Hook for about content
export const useAboutContent = () => {
  const { aboutAPI } = require('../services/api');
  
  return useAPICall(aboutAPI.getAboutContent);
};

// Hook for privacy policy
export const usePrivacyPolicy = () => {
  const { privacyAPI } = require('../services/api');
  
  return useAPICall(privacyAPI.getPrivacyPolicy);
};

export default {
  useAPI,
  useAPICall,
  useFormSubmission,
  usePagination,
  useNewsletter,
  useContactForm,
  useNews,
  useFeaturedNews,
  useAboutContent,
  usePrivacyPolicy
};
