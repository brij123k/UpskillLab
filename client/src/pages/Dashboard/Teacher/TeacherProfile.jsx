import React, { useEffect, useState } from 'react';
import { FiMail, FiPhone, FiEdit2, FiLinkedin, FiBook, FiAward, FiUser, FiBriefcase,FiGithub,
  FiFacebook,
  FiTwitter } from 'react-icons/fi';
import { getDataHandlerWithToken, patchTokenDataHandler } from '../../../config/services';
import { toast } from 'react-toastify';

const TeacherProfile = () => {
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    mobileNumber: '',
    qualification: '',
    expertise: '',
    experience: '',
    image:'',
    bio: '',
    social_links: { 
      linkedin: '',
      github: '',
      facebook: '',
      twitter: ''
    }
  });

  const profileHandler = async () => {
    setLoading(true);
    try {
      const response = await getDataHandlerWithToken('teacherProfile');
      if (response) {
        setProfile(response);
        setEditData({
          name: response.name || '',
          mobileNumber: response.mobileNumber || '',
          qualification: response.qualification || '',
          expertise: response.expertise || '',
          experience: response.experience || '',
          bio: response.bio || '',
          social_links: {
            linkedin: response.social_links?.linkedin || '',
            github: response.social_links?.github || '',
            facebook: response.social_links?.facebook || '',
            twitter: response.social_links?.twitter || ''
          }
        });
      } else {
        throw new Error(response.message || 'Failed to fetch profile');
      }
    } catch (error) {
      setError(error);
      toast.error("Failed to Load Profile");
      console.error('Error fetching Profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_links.')) {
      const field = name.split('.')[1];
      setEditData(prev => ({
        ...prev,
        social_links: {
          ...prev.social_links,
          [field]: value
        }
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await patchTokenDataHandler('teacherProfile', editData);
      if (response) {
        toast.success("Profile updated successfully!");
        setProfile(response);
        setIsModalOpen(false);
        profileHandler(); // Refresh data
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    profileHandler();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading profile: {error.message}</div>;
  }

  if (!profile) {
    return <div className="p-6">No profile data available</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">My Profile</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#FF7426] text-white px-4 py-2 rounded-lg hover:bg-[#E56722] transition-colors"
        >
          <FiEdit2 /> Edit Profile
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Profile Image Section */}
          <div className="md:w-1/3 bg-[#4D2C5E] p-8 flex flex-col items-center">
          <div className="relative mb-6">
  <div className="w-40 h-40 rounded-full border-4 border-white bg-[#4D2C5E] flex items-center justify-center">
    <span className="text-white text-5xl font-bold">
      {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
    </span>
  </div>
</div>
            <h2 className="text-2xl font-bold text-white text-center">{profile.name}</h2>
            <p className="text-[#FF7426] mt-2">{profile.qualification}</p>
          </div>
          
          {/* Profile Details Section */}
          <div className="md:w-2/3 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#4D2C5E]/10 p-3 rounded-full">
                  <FiMail className="text-[#4D2C5E] text-xl" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Email</h3>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[#4D2C5E]/10 p-3 rounded-full">
                  <FiPhone className="text-[#4D2C5E] text-xl" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Phone</h3>
                  <p className="font-medium">{profile.mobileNumber}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[#4D2C5E]/10 p-3 rounded-full">
                  <FiAward className="text-[#4D2C5E] text-xl" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Expertise</h3>
                  <p className="font-medium">{profile.expertise}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-[#4D2C5E]/10 p-3 rounded-full">
                  <FiBriefcase className="text-[#4D2C5E] text-xl" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Experience</h3>
                  <p className="font-medium">{profile.experience}</p>
                </div>
              </div>
              
              {profile.social_links?.linkedin && (
    <div className="flex items-start gap-4">
      <div className="bg-[#4D2C5E]/10 p-3 rounded-full">
        <FiLinkedin className="text-[#4D2C5E] text-xl" />
      </div>
      <div>
        <h3 className="text-sm text-gray-500">LinkedIn</h3>
        <a 
          href={profile.social_links.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium text-blue-600 hover:underline"
        >
          View Profile
        </a>
      </div>
    </div>
  )}

  {profile.social_links?.github && (
    <div className="flex items-start gap-4">
      <div className="bg-[#4D2C5E]/10 p-3 rounded-full">
        <FiGithub className="text-[#4D2C5E] text-xl" />
      </div>
      <div>
        <h3 className="text-sm text-gray-500">GitHub</h3>
        <a 
          href={profile.social_links.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium text-gray-800 hover:underline"
        >
          View Profile
        </a>
      </div>
    </div>
  )}

  {profile.social_links?.facebook && (
    <div className="flex items-start gap-4">
      <div className="bg-[#4D2C5E]/10 p-3 rounded-full">
        <FiFacebook className="text-[#4D2C5E] text-xl" />
      </div>
      <div>
        <h3 className="text-sm text-gray-500">Facebook</h3>
        <a 
          href={profile.social_links.facebook} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium text-blue-800 hover:underline"
        >
          View Profile
        </a>
      </div>
    </div>
  )}

  {profile.social_links?.twitter && (
    <div className="flex items-start gap-4">
      <div className="bg-[#4D2C5E]/10 p-3 rounded-full">
        <FiTwitter className="text-[#4D2C5E] text-xl" />
      </div>
      <div>
        <h3 className="text-sm text-gray-500">Twitter</h3>
        <a 
          href={profile.social_links.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium text-blue-400 hover:underline"
        >
          View Profile
        </a>
      </div>
    </div>
  )}
            </div>
            
            {/* Bio Section */}
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#4D2C5E]/10 p-3 rounded-full">
                  <FiUser className="text-[#4D2C5E] text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-[#4D2C5E]">About Me</h3>
              </div>
              <p className="text-gray-600 pl-16">{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#00000056] bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#4D2C5E]">Edit Profile</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="mobileNumber"
                      value={editData.mobileNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={editData.qualification}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                    <input
                      type="text"
                      name="expertise"
                      value={editData.expertise}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={editData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
    <input
      type="url"
      name="social_links.linkedin"
      value={editData.social_links.linkedin}
      onChange={handleInputChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent"
      placeholder="https://linkedin.com/in/username"
    />
  </div>
  
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
    <input
      type="url"
      name="social_links.github"
      value={editData.social_links.github}
      onChange={handleInputChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent"
      placeholder="https://github.com/username"
    />
  </div>
  
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
    <input
      type="url"
      name="social_links.facebook"
      value={editData.social_links.facebook}
      onChange={handleInputChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent"
      placeholder="https://facebook.com/username"
    />
  </div>
  
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
    <input
      type="url"
      name="social_links.twitter"
      value={editData.social_links.twitter}
      onChange={handleInputChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent"
      placeholder="https://twitter.com/username"
    />
  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D2C5E] focus:border-transparent"
                  ></textarea>
                </div>
                
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3A2152]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;