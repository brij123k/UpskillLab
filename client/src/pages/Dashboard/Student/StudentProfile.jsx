import React, { useEffect, useState, useRef } from 'react';
import { FiUser, FiEdit, FiSave, FiMail, FiPhone, FiBook, FiX, FiUpload, FiChevronRight } from 'react-icons/fi';
import { getDataHandler, getDataHandlerWithToken, patchTokenDataHandler, patchTokenDataHandlerFormData } from '../../../config/services';
import { message } from 'antd';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    _id: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    college: "",
    studentType: "",
    image: "",
    bio: "",
    skills: []
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [imageFile, setImageFile] = useState(null); // New state for image file
  const fileInputRef = useRef(null);

  const studentProfileHandler = async () => {
    try {
      setLoading(true);
      const response = await getDataHandlerWithToken('studentProfile');
      const coursesResponse = await getDataHandler('courseDisplay');
      setAllCourses(coursesResponse.data || []);

      if (response) {
        const { user, student, batch } = response;
        console.log("API Response:", response);
        
        setBatches(batch || []);
        
        setProfileData({
          _id: student?._id || "",
          fullName: student?.fullName || "N/A",
          email: user?.email || "N/A",
          mobileNumber: user?.mobileNumber || "N/A",
          college: student?.college || "N/A",
          studentType: student?.studentType || "N/A",
          image: student?.image || "",
          bio: student?.bio || "",
          skills: Array.isArray(student?.skills) ? student.skills : 
                (student?.skills ? JSON.parse(student.skills) : [])
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      message.error('Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    studentProfileHandler();
  }, []);

  // Match enrolled courses with batch data
  useEffect(() => {
    if (batches.length > 0 && allCourses.length > 0) {
      const enrolled = batches.map(batch => {
        const course = allCourses.find(c => c._id === batch.course);
        return course ? {
          ...course,
          batchCode: batch.batchCode,
          startDate: batch.startDate,
          status: batch.active ? 'Active' : 'Inactive',
          imageUrl: batch.imageUrl,
          batchData: batch
        } : null;
      }).filter(Boolean);
      setEnrolledCourses(enrolled);
    }
  }, [batches, allCourses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Create FormData object
      const formData = new FormData();
      
      // Append all fields to FormData
      formData.append('_id', profileData._id);
      formData.append('fullName', profileData.fullName);
      formData.append('email', profileData.email);
      formData.append('mobileNumber', profileData.mobileNumber);
      formData.append('college', profileData.college);
      formData.append('studentType', profileData.studentType);
      formData.append('bio', profileData.bio);

      profileData.skills.forEach((skill, index) => {
      formData.append(`skills[${index}]`, skill);
    });
      
      // Append image file if it exists
      if (imageFile) {
        formData.append('image', imageFile);
      }

      // Use FormData handler for the request
      const response = await patchTokenDataHandlerFormData('profile', formData);
      
      console.log("Update response:", response);
      setIsEditing(false);
      setImageFile(null); // Reset image file after successful upload
      message.success('Profile updated successfully!');
      
      // Refresh profile data
      await studentProfileHandler();
    } catch (err) {
      console.error('Error updating profile:', err);
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, e.target.value.trim()]
      });
      e.target.value = '';
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...profileData.skills];
    newSkills.splice(index, 1);
    setProfileData({ ...profileData, skills: newSkills });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store the file object for FormData submission
    setImageFile(file);
    
    // Create preview URL for immediate display
    const previewUrl = URL.createObjectURL(file);
    setProfileData({ ...profileData, image: previewUrl });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const showCourseDetails = (course) => {
    setSelectedCourse(course);
  };

  const closeCourseDetails = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {loading && (
        <div className="fixed inset-0 bg-[#00000063] bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-transparent p-6 rounded-lg shadow-lg flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#fff] mr-3"></div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E]">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and enrolled courses</p>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
              >
                <FiX className="mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] transition disabled:opacity-50"
              >
                <FiSave className="mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-[#FF7426] text-white rounded-lg hover:bg-[#E65100] transition shadow-md"
            >
              <FiEdit className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-8">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4D8D] p-6 text-white relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative flex flex-col md:flex-row items-center gap-6 z-10">
              <div className="relative group">
                {profileData.image ? (
                  <img 
                    src={profileData.image} 
                    alt={profileData.fullName} 
                    className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                  />
                ) : (
                  <div className="h-28 w-28 rounded-full border-4 border-white bg-[#4D2C5E] flex items-center justify-center text-white text-4xl font-bold shadow-md">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                {isEditing && (
                  <>
                    <button 
                      onClick={triggerFileInput}
                      className="absolute bottom-0 right-0 bg-[#FF7426] text-white p-2 rounded-full hover:bg-[#E65100] transition transform hover:scale-105 shadow-md flex items-center justify-center"
                    >
                      <FiUpload size={16} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </>
                )}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
                <p className="text-white/90 mb-1">Student Type: {profileData.studentType.replace(/_/g, ' ')}</p>
                {enrolledCourses.length > 0 && (
                  <p className="text-white/80">
                    {enrolledCourses.length} Enrolled {enrolledCourses.length === 1 ? 'Course' : 'Courses'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#4D2C5E] mb-4 flex items-center">
                <FiUser className="mr-2" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profileData.fullName}</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                    <FiMail className="mr-1" /> Email
                  </label>
                  <p className="text-gray-800 font-medium">{profileData.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                    <FiPhone className="mr-1" /> Phone
                  </label>
                  
                    <p className="text-gray-800 font-medium">{profileData.mobileNumber}</p>
              
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1">College/University</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="college"
                      value={profileData.college}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profileData.college}</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Student Type</label>
                  {isEditing ? (
                    <select
                      name="studentType"
                      value={profileData.studentType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                    >
                      <option value="REGULAR">Regular</option>
                      <option value="WORKING_PROFESSIONAL">Working Professional</option>
                      <option value="STUDENT">Student</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-medium">{profileData.studentType.replace(/_/g, ' ')}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#4D2C5E] mb-4">Skills</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {isEditing ? (
                  <>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {profileData.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="flex items-center px-3 py-1 bg-[#4D2C5E] text-white rounded-full text-sm"
                        >
                          {skill}
                          <button 
                            onClick={() => removeSkill(index)}
                            className="ml-2 text-white/70 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add a skill and press Enter"
                      onKeyDown={handleSkillAdd}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Press Enter to add a skill</p>
                  </>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.length > 0 ? (
                      profileData.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-[#4D2C5E]/10 text-[#4D2C5E] rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills added yet</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#4D2C5E] mb-4">About Me</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {isEditing ? (
                  <>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Tell us about yourself..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                      maxLength="500"
                    />
                    <p className="text-xs text-gray-500 mt-1">{profileData.bio.length}/500 characters</p>
                  </>
                ) : (
                  <p className="text-gray-800 whitespace-pre-line">
                    {profileData.bio || "No bio added yet"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        {enrolledCourses.length > 0 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#4D2C5E] mb-4 flex items-center">
                <FiBook className="mr-2" />
                My Enrolled Courses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition transform hover:-translate-y-1 cursor-pointer"
                    onClick={() => showCourseDetails(course)}
                  >
                    <div className="relative h-40 bg-gradient-to-r from-[#4D2C5E] to-[#7B4D8D]">
                      {course.imageUrl ? (
                        <img 
                          src={course.imageUrl} 
                          alt={course.courseName} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                          <FiBook className="text-4xl" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h4 className="text-white font-semibold text-lg">{course.courseName}</h4>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-gray-600 font-medium">Batch: {course.batchCode}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          course.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Started: {formatDate(course.startDate)}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-lg font-bold text-[#4D2C5E]">
                          ₹{course.discountedPrice || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default StudentProfile;