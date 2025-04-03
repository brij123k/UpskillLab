import React, { useState } from 'react';
import { FiArrowRight, FiCheck, FiUser, FiMail, FiPhone, FiBookOpen, FiBriefcase } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './CommonModal';

const AdmissionFormModal = ({ isOpen, onClose }) => {
    const [submitSuccess, setSubmitSuccess] = useState(false);

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
        studentType: Yup.string()
            .required('Please select an option')
    });

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
            console.log('Form submitted:', values);
            setSubmitSuccess(true);
            setTimeout(() => {
                onClose();
                setSubmitSuccess(false);
            }, 2000);
        }
    });

    const InputField = ({ icon, label, id, name, type = 'text', placeholder, formik, ...props }) => (
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[name]}
                    className={`pl-10 w-full px-4 py-3 rounded-lg border ${formik.errors[name] && formik.touched[name] ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent transition-all duration-200`}
                    placeholder={placeholder}
                    {...props}
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
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Start Your Learning Journey">
            <AnimatePresence mode="wait">
                {submitSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center py-12"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 10, -10, 0]
                            }}
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
                ) : (
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
                            <InputField
                                icon={<FiUser />}
                                label="Full Name"
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="John Doe"
                                formik={formik}
                            />

                            <InputField
                                icon={<FiMail />}
                                label="Email"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                formik={formik}
                            />

                            <InputField
                                icon={<FiPhone />}
                                label="Phone Number"
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="1234567890"
                                formik={formik}
                            />

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
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.course}
                                        className={`pl-10 w-full px-4 py-3 rounded-lg border ${formik.errors.course && formik.touched.course ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-transparent appearance-none bg-white`}
                                    >
                                        <option value="">Select a course</option>
                                        <option value="web-development">Web Development</option>
                                        <option value="data-science">Data Science</option>
                                        <option value="ux-design">UX/UI Design</option>
                                        <option value="digital-marketing">Digital Marketing</option>
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

                            <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mb-6"
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                I am a: <span className="text-[#FF7426]">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <motion.label
                                    whileHover={{ scale: 1.02 }}
                                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                        formik.values.studentType === 'fresher' 
                                            ? 'border-[#FF7426] bg-[#FFF5EF]' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="relative flex items-center">
                                        <input
                                            type="radio"
                                            name="studentType"
                                            value="fresher"
                                            onChange={formik.handleChange}
                                            checked={formik.values.studentType === 'fresher'}
                                            className="sr-only"  // Hide default radio button
                                        />
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            formik.values.studentType === 'fresher'
                                                ? 'border-[#FF7426] bg-[#FF7426]'
                                                : 'border-gray-300'
                                        }`}>
                                            {formik.values.studentType === 'fresher' && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="ml-3 flex items-center">
                                        <FiUser className={`mr-2 ${
                                            formik.values.studentType === 'fresher'
                                                ? 'text-[#FF7426]'
                                                : 'text-[#4D2C5E]'
                                        }`} />
                                        <span className={`font-medium ${
                                            formik.values.studentType === 'fresher'
                                                ? 'text-[#4D2C5E]'
                                                : 'text-gray-700'
                                        }`}>Fresher</span>
                                    </div>
                                </motion.label>
                        
                                <motion.label
                                    whileHover={{ scale: 1.02 }}
                                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                        formik.values.studentType === 'working' 
                                            ? 'border-[#FF7426] bg-[#FFF5EF]' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="relative flex items-center">
                                        <input
                                            type="radio"
                                            name="studentType"
                                            value="working"
                                            onChange={formik.handleChange}
                                            checked={formik.values.studentType === 'working'}
                                            className="sr-only"  // Hide default radio button
                                        />
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            formik.values.studentType === 'working'
                                                ? 'border-[#FF7426] bg-[#FF7426]'
                                                : 'border-gray-300'
                                        }`}>
                                            {formik.values.studentType === 'working' && (
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="ml-3 flex items-center">
                                        <FiBriefcase className={`mr-2 ${
                                            formik.values.studentType === 'working'
                                                ? 'text-[#FF7426]'
                                                : 'text-[#4D2C5E]'
                                        }`} />
                                        <span className={`font-medium ${
                                            formik.values.studentType === 'working'
                                                ? 'text-[#4D2C5E]'
                                                : 'text-gray-700'
                                        }`}>Working Professional</span>
                                    </div>
                                </motion.label>
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

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-[#4D2C5E] to-[#7B4B9E] hover:from-[#3a2148] hover:to-[#5A3A6B] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg"
                            >
                                Submit Application <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </Modal>
    );
};

export default AdmissionFormModal;