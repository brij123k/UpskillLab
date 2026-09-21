import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheck, FiUser, FiLink2 } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { getDataHandlerWithToken, postDataHandlerWithToken, putDataHandlerWithToken, deleteDataHandler } from '../../../config/services';
import ApiConfig from '../../../config/apiConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsTwitterX } from "react-icons/bs";

const StudentTestimonial = () => {
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [profile, setProfile] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    testimonialImageUrl: '',
    email: '',
    description: '',
    socialMediaLinks: [
      { platform: 'Facebook', url: '' },
      { platform: 'X', url: '' },
      { platform: 'Instagram', url: '' },
      { platform: 'LinkedIn', url: '' }
    ]
  });

  // Fetch student's testimonial and profile
  const fetchData = async () => {
    try {
      setLoading(true);
      const [testimonialResponse, profileResponse] = await Promise.all([
        getDataHandlerWithToken('studenttestimonial'),
        getDataHandlerWithToken('studentProfile')
      ]);

      const studentTestimonial = testimonialResponse.testimonials[0];
      const studentProfile = profileResponse;

      if (studentProfile) {
        setProfile(studentProfile);
      }

      if (studentTestimonial) {
        setTestimonial(studentTestimonial);
        setFormData({
          name: studentTestimonial.name,
          testimonialImageUrl: studentTestimonial.testimonialImageUrl,
          email: studentTestimonial.email,
          description: studentTestimonial.description,
          socialMediaLinks: [
            { platform: 'Facebook', url: studentTestimonial.socialMediaLinks?.find(link => link.platform === 'Facebook')?.url || '' },
            { platform: 'X', url: studentTestimonial.socialMediaLinks?.find(link => link.platform === 'Twitter' || link.platform === 'X')?.url || '' },
            { platform: 'Instagram', url: studentTestimonial.socialMediaLinks?.find(link => link.platform === 'Instagram')?.url || '' },
            { platform: 'LinkedIn', url: studentTestimonial.socialMediaLinks?.find(link => link.platform === 'LinkedIn')?.url || '' }
          ]
        });
      } else if (studentProfile) {
        setFormData({
          name: studentProfile.student.fullName,
          testimonialImageUrl: studentProfile.student.image,
          email: profileResponse.user.email,
          description: '',
          socialMediaLinks: [
            { platform: 'Facebook', url: '' },
            { platform: 'X', url: '' },
            { platform: 'Instagram', url: '' },
            { platform: 'LinkedIn', url: '' }
          ]
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialMediaChange = (index, field, value) => {
    const updatedLinks = [...formData.socialMediaLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData(prev => ({ ...prev, socialMediaLinks: updatedLinks }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredLinks = formData.socialMediaLinks.filter(link => link.url.trim() !== '');
      
      let payload;
      if (editMode && testimonial) {
        payload = {
          description: formData.description,
          socialMediaLinks: filteredLinks
        };
        const endpoint = ApiConfig.testimonilaById(testimonial._id);
        await putDataHandlerWithToken(endpoint, payload, null, true);
        toast.success('Testimonial updated successfully!');
      } else {
        payload = {
          ...formData,
          socialMediaLinks: filteredLinks
        };
        await postDataHandlerWithToken("studenttestimonial", payload);
        toast.success('Testimonial created successfully!');
      }
      
      setEditMode(false);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast.error(error.response?.data?.message || 'Failed to save testimonial');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDataHandler(ApiConfig.testimonilaById(testimonial._id), true);
      toast.success('Testimonial deleted successfully!');
      setTestimonial(null);
      if (profile) {
        setFormData({
          name: profile.student.fullName,
          testimonialImageUrl: profile.student.image,
          email: profile.user.email,
          description: '',
          socialMediaLinks: [
            { platform: 'Facebook', url: '' },
            { platform: 'X', url: '' },
            { platform: 'Instagram', url: '' },
            { platform: 'LinkedIn', url: '' }
          ]
        });
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setShowForm(false);
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        testimonialImageUrl: testimonial.testimonialImageUrl,
        email: testimonial.email,
        description: testimonial.description,
        socialMediaLinks: [
          { platform: 'Facebook', url: testimonial.socialMediaLinks?.find(link => link.platform === 'Facebook')?.url || '' },
          { platform: 'X', url: testimonial.socialMediaLinks?.find(link => link.platform === 'Twitter' || link.platform === 'X')?.url || '' },
          { platform: 'Instagram', url: testimonial.socialMediaLinks?.find(link => link.platform === 'Instagram')?.url || '' },
          { platform: 'LinkedIn', url: testimonial.socialMediaLinks?.find(link => link.platform === 'LinkedIn')?.url || '' }
        ]
      });
    } else if (profile) {
      setFormData({
        name: profile.student.fullName,
        testimonialImageUrl: profile.student.image,
        email: profile.user.email,
        description: '',
        socialMediaLinks: [
          { platform: 'Facebook', url: '' },
          { platform: 'X', url: '' },
          { platform: 'Instagram', url: '' },
          { platform: 'LinkedIn', url: '' }
        ]
      });
    }
  };

  const handleAddTestimonial = () => {
    setShowForm(true);
    setEditMode(false);
  };

  const getSocialMediaIcon = (platform) => {
    switch (platform) {
      case 'Facebook':
        return <FaFacebookF className="h-5 w-5" />;
      case 'X':
      case 'Twitter':
        return <BsTwitterX className="h-5 w-5" />;
      case 'Instagram':
        return <FaInstagram className="h-5 w-5" />;
      case 'LinkedIn':
        return <FaLinkedinIn className="h-5 w-5" />;
      default:
        return <FiLink2 className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#FF7426] border-solid"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4D2C5E]/5 to-[#FF7426]/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-[#4D2C5E]/10 transform transition-all duration-300 hover:shadow-xl">
          <h1 className="text-3xl font-bold text-[#4D2C5E] mb-6">My Testimonial</h1>
          
          {showForm ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center mb-6">
                <img 
                  src={formData.testimonialImageUrl || '/images/default-profile.png'} 
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#4D2C5E]/20"
                />
              </div>
              {editMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4D2C5E] mb-2">Full Name</label>
                    <div className="w-full p-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
                      {formData.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4D2C5E] mb-2">Email</label>
                    <div className="w-full p-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
                      {formData.email}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4D2C5E] mb-2">Full Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-[#4D2C5E]/20 rounded-lg focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426] bg-gray-50 text-gray-700"
                      required
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4D2C5E] mb-2">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-[#4D2C5E]/20 rounded-lg focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426] bg-gray-50 text-gray-700"
                      required
                      readOnly
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#4D2C5E] mb-2">Your Testimonial*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full p-3 border border-[#4D2C5E]/20 rounded-lg focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426] bg-gray-50 text-gray-700 resize-none"
                  required
                  placeholder="Share your learning experience..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4D2C5E] mb-3">Social Media Links (optional)</label>
                <div className="space-y-3">
                  {formData.socialMediaLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <select
                        value={link.platform}
                        onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                        className="flex-shrink-0 p-3 border border-[#4D2C5E]/20 rounded-lg focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426] bg-gray-50 text-gray-700"
                      >
                        <option value="Facebook">Facebook</option>
                        <option value="X">X</option>
                        <option value="Instagram">Instagram</option>
                        <option value="LinkedIn">LinkedIn</option>
                      </select>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                        className="flex-1 p-3 border border-[#4D2C5E]/20 rounded-lg focus:ring-2 focus:ring-[#FF7426] focus:border-[#FF7426] bg-gray-50 text-gray-700"
                        placeholder={`${link.platform} profile URL`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2 border border-[#4D2C5E]/30 text-[#4D2C5E] rounded-lg hover:bg-[#4D2C5E]/10 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#FF7426] transition-colors duration-200"
                >
                  {editMode ? 'Update Testimonial' : 'Submit Testimonial'}
                </button>
              </div>
            </form>
          ) : testimonial ? (
            <div className="relative">
              <div className="bg-gradient-to-br from-[#f9f5ff] to-white p-8 rounded-xl border border-[#4D2C5E]/10 shadow-md">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <img 
                      src={testimonial.testimonialImageUrl || '/images/default-profile.png'} 
                      alt={testimonial.name}
                      className="w-28 h-28 rounded-full object-cover border-4 border-[#FF7426]/20 transform transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-[#4D2C5E]">{testimonial.name}</h3>
                        <p className="text-gray-500 text-sm">{testimonial.email}</p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleEdit}
                          className="p-2 text-[#4D2C5E] hover:text-[#FF7426] hover:bg-[#FF7426]/10 rounded-full transition-colors duration-200"
                          title="Edit"
                        >
                          <FiEdit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-full transition-colors duration-200"
                          title="Delete"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-lg italic leading-relaxed mb-6">"{testimonial.description}"</p>
                    
                    {testimonial.socialMediaLinks && testimonial.socialMediaLinks.length > 0 && (
                      <div className="flex space-x-4">
                        {testimonial.socialMediaLinks.map((link, index) => (
                          <a 
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#4D2C5E] hover:text-[#FF7426] transition-colors duration-200 transform hover:scale-110"
                          >
                            {getSocialMediaIcon(link.platform)}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FiUser className="h-10 w-10 text-[#4D2C5E]/50" />
              </div>
              <h3 className="text-xl font-semibold text-[#4D2C5E] mb-3">You haven't shared your experience yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">Help others by sharing your learning journey with us.</p>
              <button
                onClick={handleAddTestimonial}
                className="flex items-center px-6 py-3 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#FF7426] transition-colors duration-200 mx-auto"
              >
                <FiPlus className="mr-2 h-5 w-5" />
                Add Testimonial
              </button>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-[#00000075] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h2 className="text-xl font-semibold text-[#4D2C5E] mb-4">Confirm Deletion</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete your testimonial? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-[#4D2C5E]/30 text-[#4D2C5E] rounded-lg hover:bg-[#4D2C5E]/10 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTestimonial;