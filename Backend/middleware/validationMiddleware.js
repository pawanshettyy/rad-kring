const { createError } = require('../utils/errorUtils');

// Validation helper function
const validateFields = (fields, req) => {
  const errors = [];
  
  for (const [field, rules] of Object.entries(fields)) {
    const value = req.body[field];
    
    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
      errors.push(`${field} is required`);
      continue;
    }
    
    // Skip other validations if field is not provided and not required
    if (!value && !rules.required) continue;
    
    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`${field} must be at least ${rules.minLength} characters long`);
    }
    
    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`${field} cannot exceed ${rules.maxLength} characters`);
    }
    
    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push(rules.patternMessage || `${field} format is invalid`);
    }
    
    // Custom validation
    if (rules.custom && !rules.custom(value)) {
      errors.push(rules.customMessage || `${field} is invalid`);
    }
  }
  
  return errors;
};

// Register validation
const validateRegister = (req, res, next) => {
  const validationRules = {
    username: {
      required: true,
      minLength: 3,
      maxLength: 30,
      pattern: /^[a-zA-Z0-9_]+$/,
      patternMessage: 'Username can only contain letters, numbers, and underscores'
    },
    email: {
      required: true,
      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      patternMessage: 'Please provide a valid email address'
    },
    password: {
      required: true,
      minLength: 6,
      maxLength: 128
    }
  };
  
  const errors = validateFields(validationRules, req);
  
  if (errors.length > 0) {
    return next(createError(400, errors.join(', ')));
  }
  
  next();
};

// Login validation
const validateLogin = (req, res, next) => {
  const validationRules = {
    email: {
      required: true,
      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      patternMessage: 'Please provide a valid email address'
    },
    password: {
      required: true
    }
  };
  
  const errors = validateFields(validationRules, req);
  
  if (errors.length > 0) {
    return next(createError(400, errors.join(', ')));
  }
  
  next();
};

// Profile update validation
const validateProfileUpdate = (req, res, next) => {
  const validationRules = {
    username: {
      required: false,
      minLength: 3,
      maxLength: 30,
      pattern: /^[a-zA-Z0-9_]+$/,
      patternMessage: 'Username can only contain letters, numbers, and underscores'
    },
    email: {
      required: false,
      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      patternMessage: 'Please provide a valid email address'
    },
    'profile.firstName': {
      required: false,
      maxLength: 50
    },
    'profile.lastName': {
      required: false,
      maxLength: 50
    },
    'profile.bio': {
      required: false,
      maxLength: 500
    }
  };
  
  // Handle nested profile fields
  const flattenedBody = {};
  for (const [key, value] of Object.entries(req.body)) {
    if (key === 'profile' && typeof value === 'object') {
      for (const [profileKey, profileValue] of Object.entries(value)) {
        flattenedBody[`profile.${profileKey}`] = profileValue;
      }
    } else {
      flattenedBody[key] = value;
    }
  }
  
  req.body = { ...req.body, ...flattenedBody };
  
  const errors = validateFields(validationRules, req);
  
  if (errors.length > 0) {
    return next(createError(400, errors.join(', ')));
  }
  
  next();
};

// Password change validation
const validatePasswordChange = (req, res, next) => {
  const validationRules = {
    currentPassword: {
      required: true
    },
    newPassword: {
      required: true,
      minLength: 6,
      maxLength: 128
    }
  };
  
  const errors = validateFields(validationRules, req);
  
  if (errors.length > 0) {
    return next(createError(400, errors.join(', ')));
  }
  
  // Check if new password is different from current password
  if (req.body.currentPassword === req.body.newPassword) {
    return next(createError(400, 'New password must be different from current password'));
  }
  
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
  validatePasswordChange
};