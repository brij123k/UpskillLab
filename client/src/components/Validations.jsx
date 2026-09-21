// Base validation function template
const validateField = (value, rules) => {
    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  };
  
  // Full Name Validator
  export const validateFullName = (value) => {
    const rules = [
      (v) => (!v && 'Full name is required'),
      (v) => (v.length < 3 && 'Must be at least 3 characters'),
      (v) => (v.length > 50 && 'Cannot exceed 50 characters'),
      (v) => (!/^[a-zA-Z ]+$/.test(v) && 'Only alphabets and spaces allowed')
    ];
    return validateField(value, rules);
  };
  
  // Email Validator
  export const validateEmail = (value) => {
    const rules = [
      (v) => (!v && 'Email is required'),
      (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && 'Invalid email format')
    ];
    return validateField(value, rules);
  };
  
  // Phone Number Validator
  export const validatePhone = (value) => {
    const rules = [
      (v) => (!v && 'Phone number is required'),
      (v) => (!/^\d{10}$/.test(v) && 'Must be 10 digits'),
      (v) => (!/^[0-9]+$/.test(v) && 'Only numbers allowed')
    ];
    return validateField(value, rules);
  };
  
  // Password Validator
  export const validatePassword = (value) => {
    const rules = [
      (v) => (!v && 'Password is required'),
      (v) => (v.length < 8 && 'Must be at least 8 characters'),
      (v) => (!/[A-Z]/.test(v) && 'Needs at least one uppercase letter'),
      (v) => (!/[a-z]/.test(v) && 'Needs at least one lowercase letter'),
      (v) => (!/\d/.test(v) && 'Needs at least one number'),
      (v) => (!/[@$!%*?&]/.test(v) && 'Needs at least one special character')
    ];
    return validateField(value, rules);
  };
  
  // Confirm Password Validator
  export const validateConfirmPassword = (value, password) => {
    const rules = [
      (v) => (!v && 'Please confirm your password'),
      (v) => (v !== password && 'Passwords do not match')
    ];
    return validateField(value, rules);
  };

  export const validateCourse = (value) => {
    if (!value) return 'Course selection is required';
    return null;
  };
  
  export const validateStudentType = (value) => {
    if (!value || value.length === 0) return 'Please select at least one option';
    return null;
  };