import React, { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateCourse,
  validateStudentType
} from '../Validations';
import { postDataHandler, getDataHandler } from '../../config/services';
import { toast } from "react-toastify";

const ExitIntentModalData = () => {
  const [loader, setLoader] = useState(false);
  const [courses, setCourses] = useState([]);
  const [imageData, setImageData] = useState([]);

  const handelCourses = async () => {
    const res = await getDataHandler('courseDisplay');
    if (res && res.data) {
      const newCourses = res.data
        .filter((course) => course.active === true)
        .map((course, index) => ({
          id: index + 1,
          courseId: course._id,
          courseCode: course.courseCode,
          title: course.courseName,
        }));
      setCourses(newCourses);
    }
  };

  const fetchMarketingPrompt = async () => {
    try {
      const res = await fetch('https://api.upskillab.com/api/marketing-prompt');
      const data = await res.json();
      setImageData(data);
    } catch (error) {
      console.error('Error fetching marketing prompt:', error);
    }
  };

  useEffect(() => {
    handelCourses();
    fetchMarketingPrompt();
  }, []);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Required')
      .test('fullname-validation', function (value) {
        const error = validateFullName(value);
        return error ? this.createError({ message: error }) : true;
      }),
    email: Yup.string()
      .required('Required')
      .test('email-validation', function (value) {
        const error = validateEmail(value);
        return error ? this.createError({ message: error }) : true;
      }),
    phone: Yup.string()
      .required('Required')
      .test('phone-validation', function (value) {
        const error = validatePhone(value);
        return error ? this.createError({ message: error }) : true;
      }),
    course: Yup.string()
      .required('Required')
      .test('course-validation', function (value) {
        const error = validateCourse(value);
        return error ? this.createError({ message: error }) : true;
      }),
    studentType: Yup.string()
      .required('Please select a student type')
      .test('student-type-validation', function (value) {
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
      };
      const res = await postDataHandler('demoSession', data);
      if (res) {
        toast.success('Demo session booked successfully!');
      }
    } catch (error) {
      toast.error('Demo session booking Failed!');
    } finally {
      setLoader(false);
    }
  };

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
      demoSessionHandler(values);
      formik.resetForm();
    }
  });

  return (
    <div className="bg-gray-50 px-2 py-2 sm:px-4 lg:px-6" id="AdmissionForm">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Left Section (Images) */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-1/2 flex-1"
          >
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 h-full">
              <h1 className="text-xl sm:text-2xl font-bold text-[#4D2C5E] mb-4 sm:mb-6">OFFER BY UPSKILLAB</h1>
              {imageData.length > 0 ? (
                imageData.map((item) => (
                  <div key={item._id} className="mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {/* <p className="mt-2 text-center text-sm text-gray-700">{item.name}</p> */}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Loading images...</p>
              )}
              <div className="block mt-4 text-center">
                <a
                  href="https://upskillab.com/#AdmissionForm"
                  className="inline-block bg-[#4D2C5E] hover:bg-[#3a2148] text-white font-medium py-2 px-6 rounded-lg transition-all duration-300"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Section (Form) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block w-full lg:w-1/2 flex-1"
            id="AdmissionForm"
          >
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 h-full">
              <h2 className="text-xl sm:text-2xl font-bold text-[#4D2C5E] mb-4 sm:mb-6">Application Form</h2>

              <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Full Name */}
                <div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                    className={`w-full px-3 py-2 rounded-lg border ${formik.errors.fullName && formik.touched.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent`}
                    placeholder="John Doe"
                  />
                  {formik.errors.fullName && formik.touched.fullName && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`w-full px-3 py-2 rounded-lg border ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent`}
                    placeholder="john@example.com"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    className={`w-full px-3 py-2 rounded-lg border ${formik.errors.phone && formik.touched.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent`}
                    placeholder="Phone Number"
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                  )}
                </div>

                {/* Course */}
                <div>
                  <select
                    id="course"
                    name="course"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.course}
                    className={`w-full px-3 py-2 rounded-lg border ${formik.errors.course && formik.touched.course ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent`}
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.title} value={course.title}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                  {formik.errors.course && formik.touched.course && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.course}</div>
                  )}
                </div>

                {/* Student Type */}
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
                  {formik.errors.studentType && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.studentType}</div>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#4D2C5E] hover:bg-[#3a2148] text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
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

export default ExitIntentModalData;
