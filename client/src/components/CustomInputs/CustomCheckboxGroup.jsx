import React from 'react';

const CustomCheckboxGroup = ({ label, name, options, formik, required = false }) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let newValues = [...formik.values[name]];
    
    if (checked) {
      newValues.push(value);
    } else {
      newValues = newValues.filter(item => item !== value);
    }
    
    formik.setFieldValue(name, newValues);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
  type="checkbox"
  id={`${name}-${option.value}`}
  name={name}
  value={option.value}
  onChange={handleCheckboxChange}
  onBlur={formik.handleBlur}
  checked={formik.values[name].includes(option.value)}
  className="h-5 w-5 accent-[#4d2c5e] rounded border-gray-300 focus:ring-[#4d2c5e]"
/>
            <label htmlFor={`${name}-${option.value}`} className="ml-3 text-sm font-medium text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-sm text-red-500">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default CustomCheckboxGroup;