import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { initiateOtpLogin, verifyOtp } from '../../config/services';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [otpAttemptId, setOtpAttemptId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    // Formik for combined email and OTP input
    const form = useFormik({
        initialValues: {
            email: '',
            otp: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            otp: Yup.string().when('$otpAttemptId', {
                is: (value) => !!value,
                then: () => Yup.string()
                    .length(6, 'OTP must be 6 digits')
                    .required('Required'),
                otherwise: () => Yup.string(),
            }),
        }),
        context: { otpAttemptId },
        onSubmit: async (values, { setFieldError }) => {
            if (!otpAttemptId) return; // Prevent form submission for email step
            
            setIsLoading(true);
            try {
                // Verify OTP
                const response = await verifyOtp(otpAttemptId, values.otp);
                login({
                    authToken: response.authToken,
                    authTokenExpiryDate: response.authTokenExpiryDate,
                    refreshToken: response.refreshToken,
                });
                // navigate('/Teacher/Dashboard');
            } catch (error) {
                console.error('Error:', error);
                setFieldError('otp', 'Invalid OTP. Please try again.');
            } finally {
                setIsLoading(false);
            }
        },
    });

    const handleSendOtp = async () => {
        if (!form.values.email || form.errors.email) return;
        
        setIsSendingOtp(true);
        try {
            const response = await initiateOtpLogin(form.values.email);
            setOtpAttemptId(response.attemptId);
            toast.success(`OTP sent to ${form.values.email}`);
        } catch (error) {
            console.error('Error:', error);
            form.setFieldError('email', 'Failed to send OTP. Please try again.');
        } finally {
            setIsSendingOtp(false);
        }
    };

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <div className="w-full min-h-screen bg-[#fdf8ee] flex items-center justify-center p-4">
            <motion.div
                className="w-full max-w-5xl rounded-xl overflow-hidden flex flex-col lg:flex-row"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Left Side - Login Form */}
                <motion.div
                    className="w-full sm:w-2/3 sm:m-auto lg:w-1/2 p-6 sm:p-8 bg-white shadow-2xl rounded-4xl flex flex-col justify-center"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Title */}
                    <motion.h2
                        className="text-2xl sm:text-3xl text-center font-bold mb-4 sm:mb-6 text-gray-800"
                        variants={item}
                    >
                        Login with OTP
                    </motion.h2>

                    {/* Email Input with Send OTP Button */}
                    <motion.div variants={item} className="space-y-4">
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                value={form.values.email}
                                className="w-full px-0 py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-[#4D2C5E] focus:outline-none focus:ring-0 peer"
                                disabled={isSendingOtp || otpAttemptId}
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-0 text-gray-500 transition-all duration-200 pointer-events-none
                                    ${form.values.email
                                        ? 'text-[#4D2C5E] text-xs sm:text-sm -translate-y-3'
                                        : 'top-2 text-sm sm:text-base peer-focus:text-[#4D2C5E] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:-translate-y-5'}
                                `}
                            >
                                Email
                            </label>
                            {!otpAttemptId && (
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#4D2C5E] text-white px-4 py-1 rounded-lg text-sm hover:bg-[#5F3A73] transition-colors"
                                    disabled={!form.values.email || !!form.errors.email || isSendingOtp}
                                >
                                    {isSendingOtp ? (
                                        <span className="inline-flex items-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Sending
                                        </span>
                                    ) : 'Send OTP'}
                                </button>
                            )}
                        </div>
                        <AnimatePresence>
                            {form.touched.email && form.errors.email && (
                                <motion.p
                                    className="mt-1 text-xs sm:text-sm text-red-500"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {form.errors.email}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* OTP Input (only shown after OTP is sent) */}
                    <AnimatePresence>
                        {otpAttemptId && (
                            <motion.div
                                variants={item}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4 mt-4"
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength="6"
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                        value={form.values.otp}
                                        className="w-full px-0 py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-[#4D2C5E] focus:outline-none focus:ring-0 peer tracking-widest"
                                        disabled={isLoading}
                                    />
                                    <label
                                        htmlFor="otp"
                                        className={`absolute left-0 text-gray-500 transition-all duration-200 pointer-events-none
                                            ${form.values.otp
                                                ? 'text-[#4D2C5E] text-xs sm:text-sm -translate-y-3'
                                                : 'top-2 text-sm sm:text-base peer-focus:text-[#4D2C5E] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:-translate-y-5'}
                                        `}
                                    >
                                        Enter OTP
                                    </label>
                                </div>
                                <AnimatePresence>
                                    {form.touched.otp && form.errors.otp && (
                                        <motion.p
                                            className="mt-1 text-xs sm:text-sm text-red-500"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            {form.errors.otp}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                                <p className="text-sm text-gray-600">
                                    We've sent a 6-digit OTP to your email. Please check your inbox.
                                </p>

                                {/* Login Button */}
                                <motion.button
                                    type="submit"
                                    onClick={() => form.handleSubmit()}
                                    className="w-full bg-[#4D2C5E] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#5F3A73] transition-colors relative overflow-hidden group text-sm sm:text-base"
                                    disabled={isLoading || !form.values.otp}
                                    whileHover={{
                                        scale: isLoading ? 1 : 1.02,
                                        boxShadow: isLoading
                                            ? 'none'
                                            : '0 4px 8px rgba(77, 44, 94, 0.2)',
                                    }}
                                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                >
                                    {isLoading ? (
                                        <span className="inline-flex items-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Verifying...
                                        </span>
                                    ) : (
                                        'Login'
                                    )}
                                </motion.button>

                                {/* Back to email button */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOtpAttemptId(null);
                                        form.setFieldValue('otp', '');
                                    }}
                                    className="w-full text-[#4D2C5E] py-2 px-4 rounded-lg font-medium hover:underline transition-colors text-sm sm:text-base"
                                    disabled={isLoading}
                                >
                                    Back to email input
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Right Side - Animated Image (same as before) */}
                <motion.div
                    className="hidden lg:flex w-1/2 items-center justify-center p-6 relative overflow-hidden"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.img
                        src="/images/LoginFrame.png"
                        alt="Login Illustration"
                        className="relative z-10 w-full h-auto max-h-[70%] object-contain"
                        animate={{
                            y: [0, -15, 0],
                            scale: [1, 1.02, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
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
                                repeatType: 'reverse',
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;