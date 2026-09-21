import React, { useState, useCallback,useEffect } from 'react';
import { FiArrowRight, FiCheck, FiUser, FiMail, FiPhone, FiBookOpen, FiBriefcase } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './CommonModal';
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateCourse,
  validateStudentType
} from '../Validations';
import { toast } from "react-toastify";
import { postDataHandler, getDataHandler } from '../../config/services';
const AdmissionFormModal = ({isOpen, onClose,topic=null,brochure=null,currentCourseName=null }) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loader, setLoader] = useState(false);

  const [courses, setCourses] = useState([]);
    const handelCourses = async () => {
      const res = await getDataHandler('courseDisplay');
      if (res && res.data) {
        const newCourses = res.data
          .filter((course)=>course.active===true)
          .map((course, index) => ({
            id: index + 1,
            courseId: course._id,
            courseCode: course.courseCode,
            title: course.courseName,
          }));
        setCourses(newCourses);
      }
    };
  
    useEffect(() => {
      handelCourses();
    }, []);

  // Optimized validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required')
      .test('fullName', function(value) {
        const error = validateFullName(value);
        if (error) return this.createError({ message: error });
        return true;
      }),
    email: Yup.string()
      .required('Email is required')
      .test('email', function(value) {
        const error = validateEmail(value);
        if (error) return this.createError({ message: error });
        return true;
      }),
    phone: Yup.string()
      .required('Phone number is required')
      .test('phone', function(value) {
        const error = validatePhone(value);
        if (error) return this.createError({ message: error });
        return true;
      }),
    course: Yup.string()
      .required('Course selection is required')
      .test('course', function(value) {
        const error = validateCourse(value);
        if (error) return this.createError({ message: error });
        return true;
      }),
    studentType: Yup.string()
      .required('Please select an option')
      .test('studentType', function(value) {
        const error = validateStudentType(value);
        if (error) return this.createError({ message: error });
        return true;
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
          downloadBrochure()
          toast.success('Demo session booked successfully!');
        }
        
      } catch (error) {
        toast.error('Demo session booking Failed!');
      } finally { 
        setLoader(false);
      }
    }

       const downloadBrochure = () => {
        if (brochure==null) {
            window.alert("No brochure available for this course");
            return;
        }

        const link = document.createElement("a");
        link.href = brochure;
        link.setAttribute("download", "");
        link.setAttribute("target", "");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
    };

  // Rest of your component remains the same...
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      course: currentCourseName || '',
      studentType: ''
    },
    validationSchema,
    onSubmit: (values) => {
      demoSessionHandler(values)
        onClose();
        formik.resetForm();
    },
    validateOnBlur: true,
    validateOnChange: false
  });

  // Memoized input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value, false); // Third parameter false to skip validation
  }, [formik]);

  // Memoized radio button handler
  const handleRadioChange = useCallback((value) => {
    formik.setFieldValue('studentType', value, false);
  }, [formik]);

  // Memoized select change handler
  const handleSelectChange = useCallback((e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value, false);
  }, [formik]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={topic!==null?topic:`Start Your Learning Journey`}>
      <AnimatePresence mode="wait">
        {submitSuccess ? (
          <SuccessMessage />
        ) : (
          <FormContent 
            formik={formik}
            handleInputChange={handleInputChange}
            handleRadioChange={handleRadioChange}
            handleSelectChange={handleSelectChange}
            courses={courses}
            currentCourseName={currentCourseName}
          />
        )}
      </AnimatePresence>
    </Modal>
  );
};

// Success Message Component
const SuccessMessage = () => (
  <motion.div
    key="success"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="flex flex-col items-center justify-center py-12"
  >
    <motion.div
      animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
      transition={{ duration: 0.6 }}
      className="mb-6 bg-green-100 p-4 rounded-full"
    >
      <FiCheck className="text-green-500 text-4xl" />
    </motion.div>
    <h3 className="text-2xl font-bold text-[#4D2C5E] mb-2">Application Submitted!</h3>
    <p className="text-gray-600 text-center max-w-md">
      Thank you for your interest. Our team will contact you shortly.
    </p>
  </motion.div>
);

// Form Content Component
const FormContent = ({ formik, handleInputChange, handleRadioChange, handleSelectChange,courses ,currentCourseName}) => (
  <motion.div
    key="form"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-5"
  >
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-gray-600"
    >
      Join our community of learners and transform your career with expert-led programs
    </motion.p>

    <form onSubmit={formik.handleSubmit} className="space-y-1">
      <FormInput
        icon={<FiUser />}
        label="Full Name"
        id="fullName"
        name="fullName"
        type="text"
        placeholder="John Doe"
        formik={formik}
        onChange={handleInputChange}
      />

      <FormInput
        icon={<FiMail />}
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="john@example.com"
        formik={formik}
        onChange={handleInputChange}
      />

      <FormInput
        icon={<FiPhone />}
        label="Phone Number"
        id="phone"
        name="phone"
        type="tel"
        placeholder="1234567890"
        formik={formik}
        onChange={handleInputChange}
      />

      <CourseSelect 
        formik={formik}
        handleSelectChange={handleSelectChange}
        courses={courses}
        currentCourseName={currentCourseName}
      />

      <StudentTypeRadio 
        formik={formik}
        handleRadioChange={handleRadioChange}
      />

      <SubmitButton />
    </form>
  </motion.div>
);

// Reusable Form Input Component
const FormInput = React.memo(({ icon, label, id, name, type, placeholder, formik, onChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="mb-4"
  >
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-[#FF7426]">*</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className={`pl-10 w-full px-4 py-3 rounded-lg border ${
          formik.errors[name] && formik.touched[name] ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent transition-all duration-200`}
        placeholder={placeholder}
      />
    </div>
    {formik.errors[name] && formik.touched[name] && (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-sm mt-1"
      >
        {formik.errors[name]}
      </motion.div>
    )}
  </motion.div>
));

// Course Select Component
const CourseSelect = React.memo(({ formik, handleSelectChange, courses,currentCourseName }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="mb-4"
  >
    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
      Course <span className="text-[#FF7426]">*</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <FiBookOpen />
      </div>
      <select
        id="course"
  name="course"
  onChange={handleSelectChange}
  onBlur={formik.handleBlur}
  value={currentCourseName !== null ? currentCourseName : formik.values.course}
  disabled={currentCourseName !== null} // This disables the select if currentCourseName exists
  className={`pl-10 w-full px-4 py-3 rounded-lg border ${
    formik.errors.course && formik.touched.course 
      ? 'border-red-500' 
      : 'border-gray-300'
  } focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent appearance-none bg-white ${
    currentCourseName !== null ? 'bg-gray-100 cursor-not-allowed' : ''
  }`}
      >
        <option value="">Select a course</option>
        {courses
        .map((course) => (
          <option key={course.title} value={course.title}>
            {course.title}
          </option>
        ))}
      </select>
    </div>
    {formik.errors.course && formik.touched.course && (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-sm mt-1"
      >
        {formik.errors.course}
      </motion.div>
    )}
  </motion.div>
));

// Student Type Radio Component
const StudentTypeRadio = React.memo(({ formik, handleRadioChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="mb-6"
  >
    <label className="block text-sm font-medium text-gray-700 mb-3">
      I am a: <span className="text-[#FF7426]">*</span>
    </label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StudentRadioOption
        value="Fresher"
        icon={<FiUser />}
        label="Fresher"
        checked={formik.values.studentType === 'Fresher'}
        onChange={() => handleRadioChange('Fresher')}
      />
      <StudentRadioOption
        value="Working Professional"
        icon={<FiBriefcase />}
        label="Working Professional"
        checked={formik.values.studentType === 'Working Professional'}
        onChange={() => handleRadioChange('Working Professional')}
      />
    </div>
    {formik.errors.studentType && (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-sm mt-1"
      >
        {formik.errors.studentType}
      </motion.div>
    )}
  </motion.div>
));

// Student Radio Option Component
const StudentRadioOption = React.memo(({ value, icon, label, checked, onChange }) => (
  <motion.label
    whileHover={{ scale: 1.02 }}
    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
      checked ? 'border-[#FF7426] bg-[#FFF5EF]' : 'border-gray-200 hover:border-gray-300'
    }`}
  >
    <div className="relative flex items-center">
      <input
        type="radio"
        name="studentType"
        value={value}
        onChange={onChange}
        checked={checked}
        className="sr-only"
      />
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        checked ? 'border-[#FF7426] bg-[#FF7426]' : 'border-gray-300'
      }`}>
        {checked && <div className="w-2 h-2 rounded-full bg-white"></div>}
      </div>
    </div>
    <div className="ml-3 flex items-center">
      {React.cloneElement(icon, {
        className: `mr-2 ${checked ? 'text-[#FF7426]' : 'text-[#4D2C5E]'}`
      })}
      <span className={`font-medium ${checked ? 'text-[#4D2C5E]' : 'text-gray-700'}`}>
        {label}
      </span>
    </div>
  </motion.label>
));

// Submit Button Component
const SubmitButton = React.memo(() => (
  <motion.button
    type="submit"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] hover:from-[#3a2148] hover:to-[#5A3A6B] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg"
  >
    Submit Application <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
  </motion.button>
));

export default AdmissionFormModal;