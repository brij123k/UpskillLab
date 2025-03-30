import React from 'react';

const CustomInput = ({ label, name, type = 'text', formik, placeholder, required = false }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className={`w-full px-4 py-3 rounded-lg bg-white ring-2 ring-[#4d2c5e50] ${
          formik.touched[name] && formik.errors[name] 
            ? 'border-red-500 border' 
            : 'border-none'
        } 
        focus:ring-2 focus:ring-[#4d2c5e] focus:outline-none
        transition-all duration-200
        hover:bg-gray-50`}
        placeholder={placeholder}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-sm text-red-500">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default CustomInput;