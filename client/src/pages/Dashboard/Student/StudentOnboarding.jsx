import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiArrowLeft, FiUpload, FiUser, FiAward, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';
import { getDataHandlerWithToken, patchTokenDataHandlerFormData } from '../../../config/services';
import { motion, AnimatePresence } from 'framer-motion';
import { message } from 'antd';

const StudentOnboarding = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        profileImageFile: null,
        image: null,
        skills: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [imageError, setImageError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileRes = await getDataHandlerWithToken('profile');
                setProfile(profileRes);

                if (profileRes && (!profileRes.fullName || !profileRes.image)) {
                    setFormData({
                        fullName: profileRes.fullName || '',
                        profileImageFile: null,
                        image: profileRes.image || null,
                        skills: profileRes.skills || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setImageError('Please upload an image file');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setImageError('Image size should be less than 5MB');
                return;
            }
            
            setImageError('');
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    profileImageFile: file,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const submitProfileData = async () => {
        try {
            setSubmitting(true);
            const formDataToSend = new FormData();

            formDataToSend.append('fullName', formData.fullName);
            if (formData.profileImageFile) {
                formDataToSend.append('image', formData.profileImageFile);
            }
            if (formData.skills) {
                formDataToSend.append('skills', formData.skills);
            }

            const response = await patchTokenDataHandlerFormData("profile", formDataToSend);
            setProfile(response);
            return true;
        } catch (error) {
            message.error('Failed to update profile');
            console.error('Error updating profile:', error);
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async () => {
        const success = await submitProfileData();
        if (success) {
            setCompleted(true);
            setTimeout(() => {
                navigate('/student/dashboard');
            }, 1500);
        }
    };

    const nextStep = async () => {
        // Validate required fields before proceeding
        if (currentStep === 1) {
            // Check if image is uploaded
            if (!formData.profileImageFile && !formData.image) {
                setImageError('Profile image is required');
                return;
            }
            
            // Check if name is provided
            if (!formData.fullName.trim()) {
                message.error('Please enter your full name');
                return;
            }
            
            // Save data and proceed to next step
            const success = await submitProfileData();
            if (success) {
                setCurrentStep(prev => prev + 1);
            }
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => setCurrentStep(prev => prev - 1);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
            </div>
        );
    }

    if (profile?.fullName && profile?.image && !completed) {
        setTimeout(() => {
                navigate('/student/dashboard');
            }, 1500);
    }

    const steps = [
        {
            title: "Welcome to Your Learning Journey!",
            content: (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <div className="mx-auto w-40 h-40 bg-gradient-to-r from-[#4D2C5E] to-[#7B4D8D] rounded-full flex items-center justify-center mb-6 shadow-lg">
                        <FiUser className="text-5xl text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#4D2C5E] mb-4">Welcome TO Upskillab</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Let's personalize your learning experience. We'll help you set up your profile in just a few steps.
                    </p>
                </motion.div>
            ),
            button: (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-[#4D2C5E] to-[#7B4D8D] text-white rounded-lg font-medium flex items-center mx-auto shadow-md"
                >
                    Get Started <FiArrowRight className="ml-2" />
                </motion.button>
            )
        },
        {
            title: "Complete Your Profile",
            content: (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    <div className="flex flex-col items-center">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="relative w-32 h-32 rounded-full bg-gray-100 mb-4 overflow-hidden shadow-md border-2 border-[#4D2C5E]/20"
                        >
                            {formData.image ? (
                                <img
                                    src={formData.image}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <FiUser className="text-4xl" />
                                </div>
                            )}
                            <label className="absolute inset-0 flex items-center justify-center z-30 bg-transparent bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-full cursor-pointer">
                                <div className="bg-white p-2 rounded-full shadow-md">
                                    <FiUpload className="text-[#4D2C5E]" />
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    required
                                />
                            </label>
                        </motion.div>
                        <p className="text-sm text-gray-500">Click to upload your profile picture *</p>
                        {imageError && (
                            <p className="text-sm text-red-500 mt-1">{imageError}</p>
                        )}
                    </div>

                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E] focus:border-[#4D2C5E] transition"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Skills (Optional)</label>
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E] focus:border-[#4D2C5E] transition"
                                placeholder="e.g. JavaScript, Design, Marketing"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            ),
            button: (
                <motion.div
                    className="flex justify-between mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-300 rounded-lg font-medium flex items-center shadow-sm"
                    >
                        <FiArrowLeft className="mr-2" /> Back
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextStep}
                        className="px-6 py-3 bg-gradient-to-r from-[#4D2C5E] to-[#7B4D8D] text-white rounded-lg font-medium flex items-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>Continue <FiArrowRight className="ml-2" /></>
                        )}
                    </motion.button>
                </motion.div>
            )
        },
        {
            title: "You're All Set!",
            content: (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    {completed ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            className="mx-auto w-40 h-40 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg"
                        >
                            <FiCheck className="text-5xl text-green-600" />
                        </motion.div>
                    ) : (
                        <div className="mx-auto w-40 h-40 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                            <FiAward className="text-5xl text-white" />
                        </div>
                    )}
                    <h2 className="text-3xl font-bold text-[#4D2C5E] mb-4">
                        {completed ? 'Profile Saved!' : 'Profile Complete!'}
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        {completed ? 'Taking you to your dashboard...' : 'Thank you for completing your profile!'}
                    </p>
                </motion.div>
            ),
            button: completed ? null : (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-[#4D2C5E] to-[#7B4D8D] text-white rounded-lg font-medium flex items-center mx-auto shadow-md"
                >
                    Go to Dashboard <FiArrowRight className="ml-2" />
                </motion.button>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f9f5ff] to-[#f0ebfa] flex items-center justify-center p-4">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-[#4D2C5E]/10"
                >
                    <div className="mb-6">
                        <div className="flex justify-center space-x-2 mb-4">
                            {steps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 rounded-full transition-all duration-300 ${index <= currentStep
                                            ? index === currentStep
                                                ? 'bg-[#7B4D8D] w-8'
                                                : 'bg-[#4D2C5E] w-6'
                                            : 'bg-gray-200 w-2'
                                        }`}
                                />
                            ))}
                        </div>
                        <h1 className="text-2xl font-bold text-center text-[#4D2C5E]">
                            {steps[currentStep].title}
                        </h1>
                    </div>

                    <div className="mb-8">
                        {steps[currentStep].content}
                    </div>

                    {steps[currentStep].button}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default StudentOnboarding;