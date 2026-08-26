import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {NavLink, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Required')
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            setSubmissionStatus(null);
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // For demo purposes, always succeed
                setSubmissionStatus('success');
                setShowToast(true);
                
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error) {
                setSubmissionStatus('error');
                setShowToast(true);
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    // Hide toast after 3 seconds (except for success which handles its own redirect)
    useEffect(() => {
        if (showToast && submissionStatus !== 'success') {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast, submissionStatus]);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const toast = {
        hidden: { opacity: 0, y: -50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        },
        exit: { 
            opacity: 0, 
            y: -50,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#fdf8ee] flex items-center justify-center p-4">
            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
                        variants={toast}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className={`px-6 py-3 rounded-lg shadow-lg flex items-center w-[90vw] max-w-xs sm:max-w-md ${
                            submissionStatus === 'success' 
                                ? 'bg-green-100 border border-green-400 text-green-700' 
                                : 'bg-red-100 border border-red-400 text-red-700'
                        }`}>
                            {submissionStatus === 'success' ? (
                                <>
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Password updated! Redirecting to login...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span>Failed to update password. Please try again.</span>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                className="w-full rounded-xl overflow-hidden flex justify-center items-center bg-[#fdf8ee]"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div 
                    className="w-full lg:w-1/3 p-6 sm:p-8 bg-white shadow-2xl rounded-4xl flex flex-col justify-center items-center"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Title */}
                    <motion.h2 
                        className="text-2xl sm:text-3xl text-center font-bold mb-4 sm:mb-6 text-gray-800"
                        variants={item}
                    >
                        Reset Your <motion.span 
                            className='text-[#FF7426]'
                            animate={{ 
                                scale: [1, 1.05, 1],
                                rotate: [0, 2, -2, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatDelay: 3
                            }}
                        >
                            Password
                        </motion.span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p 
                        className="text-sm sm:text-base text-gray-600 text-center mb-6"
                        variants={item}
                    >
                        Create a new password for your account.
                    </motion.p>

                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className="w-full space-y-4 sm:space-y-5">
                        {/* New Password */}
                        <motion.div variants={item}>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="newPassword"
                                    name="newPassword"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.newPassword}
                                    className="w-full px-0 py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-[#4D2C5E] focus:outline-none focus:ring-0 peer pr-8"
                                    disabled={isSubmitting}
                                />
                                <label
                                    htmlFor="newPassword"
                                    className={`absolute left-0 text-gray-500 transition-all duration-200 pointer-events-none
                                        ${formik.values.newPassword ? 
                                        'text-[#4D2C5E] text-xs sm:text-sm -translate-y-3' : 
                                        'top-2 text-sm sm:text-base peer-focus:text-[#4D2C5E] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:-translate-y-5'}
                                    `}
                                >
                                    New Password
                                </label>
                                <motion.button
                                    type="button"
                                    className="absolute right-0 bottom-2 text-gray-500 hover:text-[#FF7426]"
                                    onClick={() => setShowPassword(!showPassword)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            <path d="M3.293 3.293a1 1 0 011.414 0l12 12a1 1 0 01-1.414 1.414l-12-12a1 1 0 010-1.414z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </motion.button>
                            </div>
                            <AnimatePresence>
                                {formik.touched.newPassword && formik.errors.newPassword && (
                                    <motion.p
                                        className="mt-1 text-xs sm:text-sm text-red-500"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {formik.errors.newPassword}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Confirm Password */}
                        <motion.div variants={item}>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                    className="w-full px-0 py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-[#4D2C5E] focus:outline-none focus:ring-0 peer pr-8"
                                    disabled={isSubmitting}
                                />
                                <label
                                    htmlFor="confirmPassword"
                                    className={`absolute left-0 text-gray-500 transition-all duration-200 pointer-events-none
                                        ${formik.values.confirmPassword ? 
                                        'text-[#4D2C5E] text-xs sm:text-sm -translate-y-5' : 
                                        'top-2 text-sm sm:text-base peer-focus:text-[#4D2C5E] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:-translate-y-5'}
                                    `}
                                >
                                    Confirm Password
                                </label>
                                <motion.button
                                    type="button"
                                    className="absolute right-0 bottom-2 text-gray-500 hover:text-[#FF7426]"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            <path d="M3.293 3.293a1 1 0 011.414 0l12 12a1 1 0 01-1.414 1.414l-12-12a1 1 0 010-1.414z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </motion.button>
                            </div>
                            <AnimatePresence>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <motion.p
                                        className="mt-1 text-xs sm:text-sm text-red-500"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {formik.errors.confirmPassword}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className="w-full bg-[#4D2C5E] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#5F3A73] transition-colors relative overflow-hidden group text-sm sm:text-base"
                            variants={item}
                            whileHover={{ 
                                scale: isSubmitting ? 1 : 1.02,
                                boxShadow: isSubmitting ? "none" : "0 4px 8px rgba(77, 44, 94, 0.2)"
                            }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            disabled={isSubmitting}
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </>
                                ) : (
                                    'Update Password'
                                )}
                            </span>
                            {!isSubmitting && (
                                <motion.span
                                    className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </motion.button>

                        {/* Back to Login Link */}
                        <motion.div 
                            className="text-center text-sm sm:text-base mt-4"
                            variants={item}
                        >
                            <span className="text-gray-600">Remember your password? </span>
                            <NavLink to="/login">
                                <motion.span
                                    className="text-[#FF7426] font-medium hover:underline cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Login Here
                                </motion.span>
                            </NavLink>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ResetPasswordPage;