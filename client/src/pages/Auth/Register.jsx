// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { NavLink } from 'react-router-dom';

// const RegistrationPage = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const formik = useFormik({
//         initialValues: {
//             fullName: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//             rememberMe: false
//         },
//         validationSchema: Yup.object({
//             fullName: Yup.string().required('Required'),
//             email: Yup.string().email('Invalid email address').required('Required'),
//             password: Yup.string()
//                 .min(8, 'Must be at least 8 characters')
//                 .required('Required'),
//             confirmPassword: Yup.string()
//                 .oneOf([Yup.ref('password'), null], 'Passwords must match')
//                 .required('Required')
//         }),
//         onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//         }
//     });

//     // Animation variants
//     const container = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     const item = {
//         hidden: { opacity: 0, y: 10 },
//         show: { 
//             opacity: 1, 
//             y: 0,
//             transition: {
//                 type: "spring",
//                 stiffness: 100
//             }
//         }
//     };

//     return (
//         <div className="w-full min-h-screen bg-[#fdf8ee] flex items-center justify-center p-4">
//             <motion.div 
//                 className="w-full max-w-5xl rounded-xl overflow-hidden flex flex-col lg:flex-row"
//                 initial={{ scale: 0.98 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 {/* Left Side - Registration Form */}
//                 <motion.div 
//                     className="w-full lg:w-1/2 p-6 sm:p-8 bg-white shadow-2xl rounded-4xl flex flex-col justify-center"
//                     variants={container}
//                     initial="hidden"
//                     animate="show"
//                 >
//                     {/* Title */}
//                     <motion.h2 
//                         className="text-2xl sm:text-3xl text-center font-bold mb-2 sm:mb-4 text-gray-800"
//                         variants={item}
//                     >
//                         Create <motion.span 
//                             className='text-[#FF7426]'
//                             animate={{ 
//                                 scale: [1, 1.05, 1],
//                                 rotate: [0, 2, -2, 0]
//                             }}
//                             transition={{
//                                 duration: 4,
//                                 repeat: Infinity,
//                                 repeatDelay: 3
//                             }}
//                         >
//                             Account
//                         </motion.span>
//                     </motion.h2>

//                     {/* Form */}
//                     <form onSubmit={formik.handleSubmit} className="space-y-3 sm:space-y-4">
                        // {/* Full Name */}
                        // <motion.div variants={item}>
                        //     <div className="relative">
                        //         <input
                        //             type="text"
                        //             id="fullName"
                        //             name="fullName"
                        //             onChange={formik.handleChange}
                        //             onBlur={formik.handleBlur}
                        //             value={formik.values.fullName}
                        //             className="w-full px-0 py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-[#4D2C5E] focus:outline-none focus:ring-0 peer"
                        //         />
                        //         <label
                        //             htmlFor="fullName"
                        //             className={`absolute left-0 text-gray-500 transition-all duration-200 pointer-events-none
                        //                 ${formik.values.fullName ? 
                        //                 'text-[#4D2C5E] text-xs sm:text-sm -translate-y-5' : 
                        //                 'top-2 text-sm sm:text-base peer-focus:text-[#4D2C5E] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:-translate-y-5'}
                        //             `}
                        //         >
                        //             Full Name
                        //         </label>
                        //     </div>
                        //     <AnimatePresence>
                        //         {formik.touched.fullName && formik.errors.fullName && (
                        //             <motion.p
                        //                 className="mt-1 text-xs sm:text-sm text-red-500"
                        //                 initial={{ opacity: 0, height: 0 }}
                        //                 animate={{ opacity: 1, height: 'auto' }}
                        //                 exit={{ opacity: 0, height: 0 }}
                        //             >
                        //                 {formik.errors.fullName}
                        //             </motion.p>
                        //         )}
                        //     </AnimatePresence>
                        // </motion.div>

                        // {/* Email */}
                        // <motion.div variants={item}>
                        //     <div className="relative">
                        //         <input
                        //             type="email"
                        //             id="email"
                        //             name="email"
                        //             onChange={formik.handleChange}
                        //             onBlur={formik.handleBlur}
                        //             value={formik.values.email}
                        //             className="w-full px-0 py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-[#4D2C5E] focus:outline-none focus:ring-0 peer"
                        //         />
                        //         <label
                        //             htmlFor="email"
                        //             className={`absolute left-0 text-gray-500 transition-all duration-200 pointer-events-none
                        //                 ${formik.values.email ? 
                        //                 'text-[#4D2C5E] text-xs sm:text-sm -translate-y-5' : 
                        //                 'top-2 text-sm sm:text-base peer-focus:text-[#4D2C5E] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:-translate-y-5'}
                        //             `}
                        //         >
                        //             Email
                        //         </label>
                        //     </div>
                        //     <AnimatePresence>
                        //         {formik.touched.email && formik.errors.email && (
                        //             <motion.p
                        //                 className="mt-1 text-xs sm:text-sm text-red-500"
                        //                 initial={{ opacity: 0, height: 0 }}
                        //                 animate={{ opacity: 1, height: 'auto' }}
                        //                 exit={{ opacity: 0, height: 0 }}
                        //             >
                        //                 {formik.errors.email}
                        //             </motion.p>
                        //         )}
                        //     </AnimatePresence>
                        // </motion.div>

                        // {/* Password */}
                        // <motion.div variants={item}>
                        //     <div className="relative">
                        //         <input
                        //             type={showPassword ? "text" : "password"}
                        //             id="password"
                        //             name="password"
                        //             onChange={formik.handleChange}
                        //             onBlur={formik.handleBlur}
                        //             value={formik.values.password}
                        //             className="w-full px-0 py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-[#4D2C5E] focus:outline-none focus:ring-0 peer pr-8"
                        //         />
                        //         <label
                        //             htmlFor="password"
                        //             className={`absolute left-0 text-gray-500 transition-all duration-200 pointer-events-none
                        //                 ${formik.values.password ? 
                        //                 'text-[#4D2C5E] text-xs sm:text-sm -translate-y-5' : 
                        //                 'top-2 text-sm sm:text-base peer-focus:text-[#4D2C5E] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:-translate-y-5'}
                        //             `}
                        //         >
                        //             Password
                        //         </label>
                        //         <motion.button
                        //             type="button"
                        //             className="absolute right-0 bottom-2 text-gray-500 hover:text-[#FF7426]"
                        //             onClick={() => setShowPassword(!showPassword)}
                        //             whileHover={{ scale: 1.1 }}
                        //             whileTap={{ scale: 0.9 }}
                        //         >
                        //             {showPassword ? (
                        //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        //                     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        //                     <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        //                     <path d="M3.293 3.293a1 1 0 011.414 0l12 12a1 1 0 01-1.414 1.414l-12-12a1 1 0 010-1.414z" />
                        //                 </svg>
                        //             ) : (
                        //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        //                     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        //                     <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        //                 </svg>
                        //             )}
                        //         </motion.button>
                        //     </div>
                        //     <AnimatePresence>
                        //         {formik.touched.password && formik.errors.password && (
                        //             <motion.p
                        //                 className="mt-1 text-xs sm:text-sm text-red-500"
                        //                 initial={{ opacity: 0, height: 0 }}
                        //                 animate={{ opacity: 1, height: 'auto' }}
                        //                 exit={{ opacity: 0, height: 0 }}
                        //             >
                        //                 {formik.errors.password}
                        //             </motion.p>
                        //         )}
                        //     </AnimatePresence>
                        // </motion.div>

                        // {/* Confirm Password */}
                        // <motion.div variants={item}>
                        //     <div className="relative">
                        //         <input
                        //             type={showConfirmPassword ? "text" : "password"}
                        //             id="confirmPassword"
                        //             name="confirmPassword"
                        //             onChange={formik.handleChange}
                        //             onBlur={formik.handleBlur}
                        //             value={formik.values.confirmPassword}
                        //             className="w-full px-0 py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-[#4D2C5E] focus:outline-none focus:ring-0 peer pr-8"
                        //         />
                        //         <label
                        //             htmlFor="confirmPassword"
                        //             className={`absolute left-0 text-gray-500 transition-all duration-200 pointer-events-none
                        //                 ${formik.values.confirmPassword ? 
                        //                 'text-[#4D2C5E] text-xs sm:text-sm -translate-y-5' : 
                        //                 'top-2 text-sm sm:text-base peer-focus:text-[#4D2C5E] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:-translate-y-5'}
                        //             `}
                        //         >
                        //             Confirm Password
                        //         </label>
                        //         <motion.button
                        //             type="button"
                        //             className="absolute right-0 bottom-2 text-gray-500 hover:text-[#FF7426]"
                        //             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        //             whileHover={{ scale: 1.1 }}
                        //             whileTap={{ scale: 0.9 }}
                        //         >
                        //             {showConfirmPassword ? (
                        //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        //                     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        //                     <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        //                     <path d="M3.293 3.293a1 1 0 011.414 0l12 12a1 1 0 01-1.414 1.414l-12-12a1 1 0 010-1.414z" />
                        //                 </svg>
                        //             ) : (
                        //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        //                     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        //                     <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        //                 </svg>
                        //             )}
                        //         </motion.button>
                        //     </div>
                        //     <AnimatePresence>
                        //         {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        //             <motion.p
                        //                 className="mt-1 text-xs sm:text-sm text-red-500"
                        //                 initial={{ opacity: 0, height: 0 }}
                        //                 animate={{ opacity: 1, height: 'auto' }}
                        //                 exit={{ opacity: 0, height: 0 }}
                        //             >
                        //                 {formik.errors.confirmPassword}
                        //             </motion.p>
                        //         )}
                        //     </AnimatePresence>
                        // </motion.div>

                        // {/* Remember Me */}
                        // <motion.div 
                        //     className="flex items-center"
                        //     variants={item}
                        // >
                        //     <motion.input
                        //         id="rememberMe"
                        //         name="rememberMe"
                        //         type="checkbox"
                        //         checked={formik.values.rememberMe}
                        //         onChange={formik.handleChange}
                        //         className="h-4 w-4 text-[#4D2C5E] focus:ring-[#4D2C5E] border-gray-300 rounded"
                        //         whileHover={{ scale: 1.1 }}
                        //         whileTap={{ scale: 0.9 }}
                        //     />
                        //     <label htmlFor="rememberMe" className="ml-2 block text-sm sm:text-base text-gray-700">
                        //         Remember Me
                        //     </label>
                        // </motion.div>

//                         {/* Create Button */}
//                         <motion.button
//                             type="submit"
//                             className="w-full bg-[#4D2C5E] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#5F3A73] transition-colors relative overflow-hidden group text-sm sm:text-base"
//                             variants={item}
//                             whileHover={{ 
//                                 scale: 1.02,
//                                 boxShadow: "0 4px 8px rgba(77, 44, 94, 0.2)"
//                             }}
//                             whileTap={{ scale: 0.98 }}
//                         >
//                             <span className="relative z-10">Create</span>
//                             <motion.span
//                                 className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
//                                 initial={{ scale: 0 }}
//                                 whileHover={{ scale: 1 }}
//                                 transition={{ duration: 0.3 }}
//                             />
//                         </motion.button>

//                         {/* Already Created */}
                        // <motion.div 
                        //     className="text-center text-sm sm:text-base mt-3"
                        //     variants={item}
                        // >
                        //     <span className="text-gray-600">Already Created? </span>
                        //     <NavLink to="/login">
                        //         <motion.span
                        //             className="text-[#FF7426] font-medium hover:underline"
                        //             whileHover={{ scale: 1.05 }}
                        //         >
                        //             Login Here
                        //         </motion.span>
                        //     </NavLink>
                        // </motion.div>

                        // {/* Divider */}
                        // <motion.div 
                        //     className="relative my-3 sm:my-4"
                        //     variants={item}
                        // >
                        //     <div className="absolute inset-0 flex items-center">
                        //         <motion.div 
                        //             className="w-full border-t border-gray-300"
                        //             initial={{ scaleX: 0 }}
                        //             animate={{ scaleX: 1 }}
                        //             transition={{ duration: 0.5 }}
                        //         />
                        //     </div>
                        //     <div className="relative flex justify-center">
                        //         <span className="px-2 bg-white text-gray-500 text-sm">or</span>
                        //     </div>
                        // </motion.div>

                        // {/* Social Sign In */}
                        // <motion.div 
                        //     className="grid grid-cols-3 gap-2 sm:gap-3"
                        //     variants={item}
                        // >
                        //     {['google', 'facebook', 'apple'].map((social, i) => (
                        //         <motion.button
                        //             key={social}
                        //             type="button"
                        //             className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        //             whileHover={{ y: -3, scale: 1.05 }}
                        //             whileTap={{ scale: 0.95 }}
                        //             custom={i}
                        //             initial={{ opacity: 0, y: 10 }}
                        //             animate={{ opacity: 1, y: 0 }}
                        //             transition={{ delay: 0.1 * i }}
                        //         >
                        //             <img 
                        //                 src={`/images/${social}.svg`} 
                        //                 alt={social} 
                        //                 className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" 
                        //             />
                        //             <span className="text-xs sm:text-sm">Sign In</span>
                        //         </motion.button>
                        //     ))}
                        // </motion.div>

                        // {/* Terms */}
                        // <motion.p
                        //     className="text-xs sm:text-sm text-center text-gray-500 mt-3 sm:mt-4"
                        //     variants={item}
                        // >
                        //     By continuing, you agree to the{' '}
                        //     <motion.a 
                        //         href="#" 
                        //         className="text-[#FF7426] hover:underline"
                        //         whileHover={{ scale: 1.05 }}
                        //     >
                        //         Terms of Service
                        //     </motion.a>{' '}
                        //     and{' '}
                        //     <motion.a 
                        //         href="#" 
                        //         className="text-[#FF7426] hover:underline"
                        //         whileHover={{ scale: 1.05 }}
                        //     >
                        //         Privacy Policy
                        //     </motion.a>
                        // </motion.p>
//                     </form>
//                 </motion.div>

//                 {/* Right Side - Animated Image */}
                // <motion.div 
                //     className="hidden lg:flex w-1/2 items-center justify-center p-6 relative overflow-hidden"
                //     initial={{ opacity: 0, x: 50 }}
                //     animate={{ opacity: 1, x: 0 }}
                //     transition={{ delay: 0.3 }}
                // >
                //     <motion.img
                //         src="/images/RegisterFrame.png"
                //         alt="Signup Illustration"
                //         className="relative z-10 w-full h-auto max-h-[70%] object-contain"
                //         animate={{
                //             y: [0, -15, 0],
                //             scale: [1, 1.02, 1]
                //         }}
                //         transition={{
                //             duration: 8,
                //             repeat: Infinity,
                //             ease: "easeInOut"
                //         }}
                //     />

                //     {/* Floating elements */}
                //     {[...Array(8)].map((_, i) => (
                //         <motion.div
                //             key={i}
                //             className="absolute rounded-full bg-white/10"
                //             style={{
                //                 width: Math.random() * 100 + 50,
                //                 height: Math.random() * 100 + 50,
                //                 left: `${Math.random() * 100}%`,
                //                 top: `${Math.random() * 100}%`,
                //             }}
                //             animate={{
                //                 y: [0, Math.random() * 100 - 50],
                //                 x: [0, Math.random() * 100 - 50],
                //                 opacity: [0.1, 0.3, 0.1],
                //             }}
                //             transition={{
                //                 duration: Math.random() * 15 + 10,
                //                 repeat: Infinity,
                //                 repeatType: "reverse",
                //             }}
                //         />
                //     ))}
                // </motion.div>
//             </motion.div>
//         </div>
//     );
// };

// export default RegistrationPage;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required')
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            setSubmissionStatus(null);
            
            try {
                // Simulate API call to send verification code
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // For demo, assume success
                setSubmissionStatus('success');
                
                // In real app, you would:
                // 1. Store the email in context/state/storage
                // 2. Redirect to OTP page with email as parameter
                setTimeout(() => {
                    navigate('/VerifyOTP', { state: { email: values.email } });
                }, 2000);
                
            } catch (error) {
                setSubmissionStatus('error');
            } finally {
                setIsSubmitting(false);
            }
        }
    });

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

    const statusMessage = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <div className="w-full min-h-screen bg-[#fdf8ee] flex items-center justify-center p-4">
            <motion.div 
                className="w-full max-w-5xl rounded-xl overflow-hidden flex flex-col lg:flex-row"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Status Message */}
                <AnimatePresence>
                    {submissionStatus && (
                        <motion.div
                            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg flex items-center ${
                                submissionStatus === 'success' 
                                    ? 'bg-green-100 border border-green-400 text-green-700' 
                                    : 'bg-red-100 border border-red-400 text-red-700'
                            }`}
                            variants={statusMessage}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {submissionStatus === 'success' ? (
                                <>
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Verification code sent! Redirecting...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span>Failed to send verification code. Please try again.</span>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Left Side - Registration Form */}
                <motion.div 
                    className="w-full lg:w-1/2 p-6 sm:p-8 bg-white shadow-2xl rounded-4xl flex flex-col justify-center"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Title */}
                    <motion.h2 
                        className="text-2xl sm:text-3xl text-center font-bold mb-2 sm:mb-4 text-gray-800"
                        variants={item}
                    >
                        Create <motion.span 
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
                            Account
                        </motion.span>
                    </motion.h2>

                    {/* Form */}
                    <form onSubmit={formik.handleSubmit} className="space-y-3 sm:space-y-4">
                        {/* Full Name */}
                        <motion.div variants={item}>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fullName}
                                    className="w-full px-0 py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-[#4D2C5E] focus:outline-none focus:ring-0 peer"
                                />
                                <label
                                    htmlFor="fullName"
                                    className={`absolute left-0 text-gray-500 transition-all duration-200 pointer-events-none
                                        ${formik.values.fullName ? 
                                        'text-[#4D2C5E] text-xs sm:text-sm -translate-y-5' : 
                                        'top-2 text-sm sm:text-base peer-focus:text-[#4D2C5E] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:-translate-y-5'}
                                    `}
                                >
                                    Full Name
                                </label>
                            </div>
                            <AnimatePresence>
                                {formik.touched.fullName && formik.errors.fullName && (
                                    <motion.p
                                        className="mt-1 text-xs sm:text-sm text-red-500"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {formik.errors.fullName}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={item}>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className="w-full px-0 py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-[#4D2C5E] focus:outline-none focus:ring-0 peer"
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-0 text-gray-500 transition-all duration-200 pointer-events-none
                                        ${formik.values.email ? 
                                        'text-[#4D2C5E] text-xs sm:text-sm -translate-y-5' : 
                                        'top-2 text-sm sm:text-base peer-focus:text-[#4D2C5E] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:-translate-y-5'}
                                    `}
                                >
                                    Email
                                </label>
                            </div>
                            <AnimatePresence>
                                {formik.touched.email && formik.errors.email && (
                                    <motion.p
                                        className="mt-1 text-xs sm:text-sm text-red-500"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {formik.errors.email}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Password */}
                        <motion.div variants={item}>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className="w-full px-0 py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-[#4D2C5E] focus:outline-none focus:ring-0 peer pr-8"
                                />
                                <label
                                    htmlFor="password"
                                    className={`absolute left-0 text-gray-500 transition-all duration-200 pointer-events-none
                                        ${formik.values.password ? 
                                        'text-[#4D2C5E] text-xs sm:text-sm -translate-y-5' : 
                                        'top-2 text-sm sm:text-base peer-focus:text-[#4D2C5E] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:-translate-y-5'}
                                    `}
                                >
                                    Password
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
                                {formik.touched.password && formik.errors.password && (
                                    <motion.p
                                        className="mt-1 text-xs sm:text-sm text-red-500"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {formik.errors.password}
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

                        {/* Remember Me */}
                        <motion.div 
                            className="flex items-center"
                            variants={item}
                        >
                            <motion.input
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                checked={formik.values.rememberMe}
                                onChange={formik.handleChange}
                                className="h-4 w-4 text-[#4D2C5E] focus:ring-[#4D2C5E] border-gray-300 rounded"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm sm:text-base text-gray-700">
                                Remember Me
                            </label>
                        </motion.div>

                        {/* Create Button */}
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
                                        Sending Code...
                                    </>
                                ) : (
                                    'Create Account'
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

                        <motion.div 
                            className="text-center text-sm sm:text-base mt-3"
                            variants={item}
                        >
                            <span className="text-gray-600">Already Created? </span>
                            <NavLink to="/login">
                                <motion.span
                                    className="text-[#FF7426] font-medium hover:underline"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Login Here
                                </motion.span>
                            </NavLink>
                        </motion.div>

                        {/* Divider */}
                        <motion.div 
                            className="relative my-3 sm:my-4"
                            variants={item}
                        >
                            <div className="absolute inset-0 flex items-center">
                                <motion.div 
                                    className="w-full border-t border-gray-300"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-2 bg-white text-gray-500 text-sm">or</span>
                            </div>
                        </motion.div>

                        {/* Social Sign In */}
                        <motion.div 
                            className="grid grid-cols-3 gap-2 sm:gap-3"
                            variants={item}
                        >
                            {['google', 'facebook', 'apple'].map((social, i) => (
                                <motion.button
                                    key={social}
                                    type="button"
                                    className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    custom={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                >
                                    <img 
                                        src={`/images/${social}.svg`} 
                                        alt={social} 
                                        className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" 
                                    />
                                    <span className="text-xs sm:text-sm">Sign In</span>
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Terms */}
                        <motion.p
                            className="text-xs sm:text-sm text-center text-gray-500 mt-3 sm:mt-4"
                            variants={item}
                        >
                            By continuing, you agree to the{' '}
                            <motion.a 
                                href="#" 
                                className="text-[#FF7426] hover:underline"
                                whileHover={{ scale: 1.05 }}
                            >
                                Terms of Service
                            </motion.a>{' '}
                            and{' '}
                            <motion.a 
                                href="#" 
                                className="text-[#FF7426] hover:underline"
                                whileHover={{ scale: 1.05 }}
                            >
                                Privacy Policy
                            </motion.a>
                        </motion.p>
                    </form>
                </motion.div>

                {/* Right Side - Animated Image */}
                <motion.div 
                    className="hidden lg:flex w-1/2 items-center justify-center p-6 relative overflow-hidden"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.img
                        src="/images/RegisterFrame.png"
                        alt="Signup Illustration"
                        className="relative z-10 w-full h-auto max-h-[70%] object-contain"
                        animate={{
                            y: [0, -15, 0],
                            scale: [1, 1.02, 1]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Floating elements */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-white/10"
                            style={{
                                width: Math.random() * 100 + 50,
                                height: Math.random() * 100 + 50,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, Math.random() * 100 - 50],
                                x: [0, Math.random() * 100 - 50],
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: Math.random() * 15 + 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default RegistrationPage;