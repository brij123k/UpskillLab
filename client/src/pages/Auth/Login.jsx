import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { initiateOtpLogin, verifyOtp } from '../../config/services';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
    const [otpAttemptId, setOtpAttemptId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [contactMethod, setContactMethod] = useState('email'); // 'email' or 'phone'
    const navigate = useNavigate();
    const { login } = useAuth();

    // Helper function to validate email
    const isValidEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    // Helper function to validate phone number
    const isValidPhone = (value) => {
        const cleaned = value.replace(/\s/g, '');
        return /^[0-9+\-()]{10,15}$/.test(cleaned);
    };

    const form = useFormik({
        initialValues: {
            contact: '',
            otp: '',
        },
        validationSchema: Yup.object({
            contact: Yup.string()
                .test('valid-contact', 'Please enter a valid email or phone number', function(value) {
                    if (!value) return false;
                    return isValidEmail(value) || isValidPhone(value);
                })
                .required('Required'),
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
            if (!otpAttemptId) return;

            setIsLoading(true);
            try {
                const response = await verifyOtp(otpAttemptId, values.otp);
                login({
                    authToken: response.authToken,
                    authTokenExpiryDate: response.authTokenExpiryDate,
                    refreshToken: response.refreshToken,
                });
            } catch (error) {
                setFieldError('otp', 'Invalid OTP. Please try again.');
            } finally {
                setIsLoading(false);
            }
        },
    });

    const handleSendOtp = async () => {
        if (!form.values.contact || form.errors.contact) return;

        const contactValue = form.values.contact.trim();
        console.log(contactValue)
        const isPhone = isValidPhone(contactValue);
        const isEmail = isValidEmail(contactValue);
        console.log(isPhone,isEmail)

        if (!isEmail && !isPhone) {
            form.setFieldError('contact', 'Please enter a valid email or phone number');
            return;
        }

        setIsSendingOtp(true);
        try {
            // Send the appropriate value based on type
            const response = await initiateOtpLogin(contactValue,isEmail);
            setOtpAttemptId(response.attemptId);
            
            // Show success message with the correct type
            if (isEmail) {
                toast.success(`OTP sent to your email: ${contactValue}`);
            } else if (isPhone) {
                toast.success(`OTP sent to your phone number: ${contactValue}`);
            }
        } catch (error) {
            // Handle error and suggest the other method
            if (isEmail) {
                form.setFieldError('contact', 'Failed to send OTP via email. Please try using your phone number instead.');
                setContactMethod('phone');
            } else if (isPhone) {
                form.setFieldError('contact', 'Failed to send OTP via phone number. Please try using your email instead.');
                setContactMethod('email');
            }
        } finally {
            setIsSendingOtp(false);
        }
    };

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
        <div className="w-full min-h-screen bg-gradient-to-br from-[#F9F5FF] to-[#FFF5F0] flex items-center justify-center p-4 relative">
            {/* Home Button */}
            <NavLink to="/">
                <motion.button
                    className="absolute top-4 left-4 flex items-center gap-2 text-[#4D2C5E] hover:text-[#FF7426] transition-colors z-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaHome className="text-xl" />
                    <span className="hidden sm:inline">Home</span>
                </motion.button>
            </NavLink>
            <motion.div
                className="w-full max-w-5xl rounded-xl overflow-hidden flex flex-col lg:flex-row shadow-2xl"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Left Side - Login Form */}
                <motion.div
                    className="w-full lg:w-1/2 p-8 bg-white rounded-l-xl flex flex-col justify-center relative"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Title */}
                    <motion.div variants={item} className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome Back!
                        </h2>
                        <p className="text-gray-600">
                            Login with your email or phone number to continue
                        </p>
                    </motion.div>

                    {/* Contact Input with Send OTP Button */}
                    <motion.div variants={item} className="space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                value={form.values.contact}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4D2C5E] focus:ring-2 focus:ring-[#4D2C5E]/20 transition-all"
                                disabled={isSendingOtp || otpAttemptId}
                                placeholder="Enter email or phone number"
                            />
                            <AnimatePresence>
                                {form.touched.contact && form.errors.contact && (
                                    <motion.p
                                        className="mt-1 text-sm text-red-500"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {form.errors.contact}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {!otpAttemptId ? (
                            <motion.button
                                type="button"
                                onClick={handleSendOtp}
                                className="w-full bg-[#4D2C5E] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#5F3A73] transition-colors flex items-center justify-center gap-2"
                                disabled={!form.values.contact || !!form.errors.contact || isSendingOtp}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSendingOtp ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
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
                                        Sending OTP...
                                    </>
                                ) : (
                                    'Send OTP'
                                )}
                            </motion.button>
                        ) : null}
                    </motion.div>

                    {/* OTP Input */}
                    <AnimatePresence>
                        {otpAttemptId && (
                            <motion.div
                                variants={item}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-6 mt-6"
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#4D2C5E] focus:ring-2 focus:ring-[#4D2C5E]/20 transition-all tracking-widest"
                                        disabled={isLoading}
                                        placeholder="Enter 6-digit OTP"
                                    />
                                    <AnimatePresence>
                                        {form.touched.otp && form.errors.otp && (
                                            <motion.p
                                                className="mt-1 text-sm text-red-500"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                {form.errors.otp}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <motion.button
                                        type="submit"
                                        onClick={() => form.handleSubmit()}
                                        className="w-full bg-[#FF7426] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#FF8B4A] transition-colors flex items-center justify-center gap-2"
                                        disabled={isLoading || !form.values.otp}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-5 w-5 text-white"
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
                                            </>
                                        ) : (
                                            'Login'
                                        )}
                                    </motion.button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOtpAttemptId(null);
                                            form.setFieldValue('otp', '');
                                        }}
                                        className="w-full text-[#4D2C5E] py-2 px-4 rounded-lg font-medium hover:underline transition-colors flex items-center justify-center gap-2"
                                        disabled={isLoading}
                                    >
                                        <FaArrowLeft /> Change Contact
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Right Side - Illustration */}
                <motion.div
                    className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 bg-[#4D2C5E] relative overflow-hidden"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="absolute inset-0 opacity-10">
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full bg-white"
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
                    </div>

                    <motion.div
                        className="relative z-10 text-center text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.img
                            src="/images/LoginFrame.png"
                            alt="Login Illustration"
                            className="w-full max-w-xs mx-auto mb-8"
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>

            <Helmet>
                <title>Login | Upskillab - Access Your Learning Dashboard</title>
                <meta name="description" content="Login to your Upskillab account to access your courses, progress, and personalized learning dashboard." />
                <meta name="keywords" content="upskilllab login, upkillab login, online education login, upskillab dashboard, login to upskilllab" />
            </Helmet>
        </div>
    );
};

export default LoginPage;