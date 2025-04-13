import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateCourse,
  validateStudentType
} from '../Validations';
import { postDataHandler } from '../../config/services';
import { toast } from "react-toastify";

const AdmissionForm = () => {
  const [loader, setLoader] = useState(false);
  // Form validation schema using external validators
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Required')
      .test('fullname-validation', function(value) {
        const error = validateFullName(value);
        return error ? this.createError({ message: error }) : true;
      }),
    email: Yup.string()
      .required('Required')
      .test('email-validation', function(value) {
        const error = validateEmail(value);
        return error ? this.createError({ message: error }) : true;
      }),
    phone: Yup.string()
      .required('Required')
      .test('phone-validation', function(value) {
        const error = validatePhone(value);
        return error ? this.createError({ message: error }) : true;
      }),
    course: Yup.string()
      .required('Required')
      .test('course-validation', function(value) {
        const error = validateCourse(value);
        return error ? this.createError({ message: error }) : true;
      }),
    studentType: Yup.string()
      .required('Please select a student type')
      .test('student-type-validation', function(value) {
        const error = validateStudentType(value);
        return error ? this.createError({ message: error }) : true;
      })
  });

  const demoSessionHandler = async (values) => {
    try {
      setLoader(true);
      const { fullName, email, phone, course, studentType } = values;
      let data = {
        fullName: fullName,
         email: email,
        phoneNumber: phone,
        course: course,
        experience: studentType
      }
      const res = await postDataHandler('demoSession', data)
      if (res) {
        toast.success('Demo session booked successfully!');
      }
      
    } catch (error) {
      toast.error('Demo session booking Failed!');
    } finally { 
      setLoader(false);
    }

   



  }

  // Rest of your component remains exactly the same...
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      course: '',
      studentType: ''
    },
    validationSchema,
    onSubmit: (values) => {
      demoSessionHandler(values)
      formik.resetForm();
    }
  });

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" id='AdmissionForm'>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-[#4D2C5E] mb-4"
          >
            Start Your <span className="text-[#FF7426]">Learning Journey</span>
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our community of learners and transform your career with expert-led programs
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-gradient-to-br from-[#4D2C5E] to-[#2A1A3A] p-8 rounded-xl text-white h-full">
              <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#FF7426] p-2 rounded-full mr-4 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Expert Instructors</h3>
                    <p className="text-gray-300 mt-1">Learn from industry professionals with real-world experience</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#FF7426] p-2 rounded-full mr-4 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Hands-on Projects</h3>
                    <p className="text-gray-300 mt-1">Build portfolio-worthy projects that demonstrate your skills</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#FF7426] p-2 rounded-full mr-4 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Career Support</h3>
                    <p className="text-gray-300 mt-1">Get resume reviews, interview prep, and job search assistance</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#FF7426] p-2 rounded-full mr-4 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Flexible Learning</h3>
                    <p className="text-gray-300 mt-1">Study at your own pace with our online platform</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[#5A3A6B]">
                <h3 className="font-bold text-lg mb-3">Have questions?</h3>
                <p className="text-gray-300 mb-4">Contact our admissions team for more information</p>
                <NavLink to="/ContactUs" ><button className="bg-[#FF7426] hover:bg-[#E5671D] text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 cursor-pointer">
                  Contact Us
                </button>
                </NavLink>
              </div>
            </div>
          </motion.div>


          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
            id='AdmissionForm'
          >
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-[#4D2C5E] mb-6">Application Form</h2>
              
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-[#FF7426]">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                    className={`w-full px-4 py-3 rounded-lg border ${formik.errors.fullName && formik.touched.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent`}
                    placeholder="John Doe"
                  />
                  {formik.errors.fullName && formik.touched.fullName && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-[#FF7426]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`w-full px-4 py-3 rounded-lg border ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent`}
                    placeholder="john@example.com"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-[#FF7426]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    className={`w-full px-4 py-3 rounded-lg border ${formik.errors.phone && formik.touched.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent`}
                    placeholder="1234567890"
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                  )}
                </div>

                {/* Course Select */}
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                    Course <span className="text-[#FF7426]">*</span>
                  </label>
                  <select
                    id="course"
                    name="course"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.course}
                    className={`w-full px-4 py-3 rounded-lg border ${formik.errors.course && formik.touched.course ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent`}
                  >
                    <option value="">Select a course</option>
                    <option value="web-development">Web Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="ux-design">UX/UI Design</option>
                    <option value="digital-marketing">Digital Marketing</option>
                  </select>
                  {formik.errors.course && formik.touched.course && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.course}</div>
                  )}
                </div>

                {/* Student Type Checkboxes */}
                <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    I am a: <span className="text-[#FF7426]">*</span>
  </label>
  <div className="space-y-2">
    <label className="flex items-center">
      <input
        type="radio"
        name="studentType"
        value="Fresher"
        onChange={formik.handleChange}
        checked={formik.values.studentType === 'Fresher'}
        className="h-4 w-4 text-[#4D2C5E] focus:ring-[#FF7426] border-gray-300 rounded"
      />
      <span className="ml-2 text-gray-700">Fresher</span>
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="studentType"
        value="Working Professional"
        onChange={formik.handleChange}
        checked={formik.values.studentType === 'Working Professional'}
        className="h-4 w-4 text-[#4D2C5E] focus:ring-[#FF7426] border-gray-300 rounded"
      />
      <span className="ml-2 text-gray-700">Working Professional</span>
    </label>
  </div>
  {formik.errors.studentType && (
    <div className="text-red-500 text-sm mt-1">{formik.errors.studentType}</div>
  )}
</div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#4D2C5E] hover:bg-[#3a2148] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  Submit Application <FiArrowRight className="ml-2" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
