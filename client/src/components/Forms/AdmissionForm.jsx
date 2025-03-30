import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../CustomInputs/CustomInput';
import CustomSelect from '../CustomInputs/CustomSelect';  
import CustomCheckboxGroup from '../CustomInputs/CustomCheckboxGroup';

const AdmissionForm = () => {
  // Form validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required')
      .min(3, 'Name must be at least 3 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    course: Yup.string()
      .required('Course selection is required'),
    studentType: Yup.array()
      .min(1, 'Please select at least one option')
  });

  // Course options
  const courseOptions = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'ux-design', label: 'UX/UI Design' },
    { value: 'digital-marketing', label: 'Digital Marketing' }
  ];

  // Student type options
  const studentTypeOptions = [
    { value: 'fresher', label: 'Fresher' },
    { value: 'working', label: 'Working Professional' }
  ];

  // Formik hook
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      course: '',
      studentType: []
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      alert('Form submitted successfully!');
    }
  });

  return (
    <div className="bg-[#fff] py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
    {/* Left Column - Content - Now comes first in DOM for mobile */}
    <div className="flex flex-col justify-center order-1 lg:order-1">
      <div className="mb-2 md:mb-8 lg:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center lg:text-left font-bold text-black mb-4">
          Application <span className='text-[#FF7426]'>Process</span>
        </h2>
        <p className="text-md sm:text-xl text-center lg:text-left text-gray-700">
          Complete your Admission Process in just 3 simple steps
        </p>
      </div>
      
      <div className="hidden lg:block w-full max-w-md mx-auto h-48 sm:h-56 lg:h-64 relative mb-8">
        {/* Yellow circle background */}
        <div className="absolute w-full h-full rounded-full bg-yellow-400 z-0 shadow-lg"></div>
        
        {/* Image container */}
        <div className="absolute w-full h-full rounded-full overflow-hidden z-10">
          <img 
            src="/images/college.png" 
            alt="Admission process illustration"
            className="absolute top-0 left-0 w-full h-full object-contain shadow-lg transform scale-105 transition-transform duration-500 hover:scale-110"
          />
        </div>
      </div>
      
      <div className='text-center lg:text-left mt-0 md:mt-4 lg:mt-0'>
        <h3 className="text-xl sm:text-3xl font-bold text-[#FF7426] mb-4">
          Book your Demo Session, and Get Amazing Courses <span className='text-black block'>Today!!!</span>
        </h3>
      </div>
    </div>

    {/* Right Column - Form - Now comes second in DOM for mobile */}
    <div className="bg-[#FDF8EE] rounded-xl p-6 sm:p-8 lg:p-10 shadow-2xl order-2 lg:order-2">
      <h3 className="text-xl sm:text-2xl font-bold text-[#4d2c5e] mb-6 text-center">
        Reserve Your Spot for a Free Demo Session
      </h3>
      
      <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-6">
        <CustomInput
          label="Full Name"
          name="fullName"
          type="text"
          formik={formik}
          placeholder="Enter your full name"
          required
        />

        <CustomInput
          label="Email Address"
          name="email"
          type="email"
          formik={formik}
          placeholder="Enter your email"
          required
        />

        <CustomInput
          label="Phone Number"
          name="phone"
          type="tel"
          formik={formik}
          placeholder="Enter your 10-digit phone number"
          required
        />

        <CustomSelect
          label="Choose Course"
          name="course"
          options={courseOptions}
          formik={formik}
          required
        />

        <CustomCheckboxGroup
          label="I am a:"
          name="studentType"
          options={studentTypeOptions}
          formik={formik}
          required
        />

        <div className='pt-4'>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full sm:w-auto mx-auto bg-[#4d2c5e] hover:bg-[#3a2148] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer disabled:opacity-70"
          >
            {formik.isSubmitting ? 'Submitting...' : (
              <>
                Submit <FiArrowRight className="ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default AdmissionForm;