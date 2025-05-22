import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser, FiMail, FiPhone, FiBook, FiAward, FiLink2, FiFileText, FiBriefcase } from 'react-icons/fi';
import { postDataHandler } from '../config/services';

const TeacherRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    qualification: '',
    expertise: '',
    social_links: {
      facebook: '',
      twitter: '',
      linkedin: '',
      github: ''
    },
    bio: '',
    experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('social_links.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        social_links: {
          ...prev.social_links,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await postDataHandler("registerTeacher", formData);
      toast.success('Registration submitted successfully!');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        mobileNumber: '',
        qualification: '',
        expertise: '',
        social_links: {
          facebook: '',
          twitter: '',
          linkedin: '',
          github: ''
        },
        bio: '',
        experience: ''
      });
    } catch (error) {
      // console.error('Error submitting registration:', error);
      toast.error(error?.data?.message || 'Failed to submit registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4D2C5E]/10 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-[#4D2C5E]">
            Join Our Teaching Team
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Share your knowledge and inspire the next generation
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-[#4D2C5E] py-4 px-6">
            <h3 className="text-xl font-semibold text-white">
              Teacher Registration Form
            </h3>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Personal Information */}
              <div className="sm:col-span-2">
                <h4 className="text-lg font-medium text-[#4D2C5E] mb-4 border-b border-[#FF7426]/30 pb-2">
                  Personal Information
                </h4>
              </div>
              
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-[#4D2C5E]" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426]"
                    required
                    placeholder="John Doe"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-[#4D2C5E]" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426]"
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-[#4D2C5E]" />
                  </div>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426]"
                    required
                    placeholder="+1234567890"
                  />
                </div>
              </div>
              
              {/* Education & Expertise */}
              <div className="sm:col-span-2 mt-6">
                <h4 className="text-lg font-medium text-[#4D2C5E] mb-4 border-b border-[#FF7426]/30 pb-2">
                  Education & Expertise
                </h4>
              </div>
              
              <div className="relative">
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">
                  Highest Qualification*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiBook className="h-5 w-5 text-[#4D2C5E]" />
                  </div>
                  <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426]"
                    required
                    placeholder="MSc Computer Science"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">
                  Area of Expertise*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiAward className="h-5 w-5 text-[#4D2C5E]" />
                  </div>
                  <input
                    type="text"
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426]"
                    required
                    placeholder="Web Development, Data Science"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiBriefcase className="h-5 w-5 text-[#4D2C5E]" />
                  </div>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426]"
                    required
                    placeholder="5 years"
                  />
                </div>
              </div>
              
              {/* Social Links */}
              <div className="sm:col-span-2 mt-6">
                <h4 className="text-lg font-medium text-[#4D2C5E] mb-4 border-b border-[#FF7426]/30 pb-2">
                  Social Links (Optional)
                </h4>
              </div>
              
              <div className="relative">
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLink2 className="h-5 w-5 text-[#4D2C5E]" />
                  </div>
                  <input
                    type="url"
                    id="facebook"
                    name="social_links.facebook"
                    value={formData.social_links.facebook}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426]"
                    placeholder="https://facebook.com/username"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLink2 className="h-5 w-5 text-[#4D2C5E]" />
                  </div>
                  <input
                    type="url"
                    id="twitter"
                    name="social_links.twitter"
                    value={formData.social_links.twitter}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426]"
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLink2 className="h-5 w-5 text-[#4D2C5E]" />
                  </div>
                  <input
                    type="url"
                    id="linkedin"
                    name="social_links.linkedin"
                    value={formData.social_links.linkedin}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426]"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLink2 className="h-5 w-5 text-[#4D2C5E]" />
                  </div>
                  <input
                    type="url"
                    id="github"
                    name="social_links.github"
                    value={formData.social_links.github}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426]"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>
              
              {/* Bio */}
              <div className="sm:col-span-2 mt-6">
                <h4 className="text-lg font-medium text-[#4D2C5E] mb-4 border-b border-[#FF7426]/30 pb-2">
                  About You
                </h4>
              </div>
              
              <div className="sm:col-span-2 relative">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio*
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <FiFileText className="h-5 w-5 text-[#4D2C5E]" />
                  </div>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426]"
                    required
                    placeholder="Tell us about yourself, your teaching philosophy, and why you'd be a great teacher..."
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#FF7426] hover:bg-[#E5671D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D2C5E] transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegistration;