import React, { useState } from 'react';
import { FiUser, FiEdit, FiSave, FiLock, FiMail, FiPhone, FiCalendar, FiMapPin } from 'react-icons/fi';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    dob: "1998-05-15",
    location: "Bangalore, India",
    education: "B.Tech in Computer Science",
    university: "Indian Institute of Technology",
    graduationYear: "2021",
    skills: ["Python", "React", "Data Analysis", "Machine Learning"],
    bio: "Passionate about learning new technologies and applying them to solve real-world problems."
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
    alert('Profile updated successfully!');
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#4D2C5E]">My Profile</h1>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152]"
          >
            <FiSave className="mr-2" />
            Save Profile
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-[#FF7426] text-white rounded-lg hover:bg-[#E65100]"
          >
            <FiEdit className="mr-2" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#4D2C5E] to-[#7B4D8D] p-6 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <img
                src="/images/default-student-avatar.png"
                alt="Profile"
                className="h-24 w-24 rounded-full border-4 border-white"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-[#FF7426] text-white p-2 rounded-full hover:bg-[#E65100]">
                  <FiEdit />
                </button>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-white/90">{profileData.education}</p>
              <p className="text-white/80">{profileData.university}, {profileData.graduationYear}</p>
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
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                  />
                ) : (
                  <p className="text-gray-800">{profileData.name}</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <FiMail className="mr-1" /> Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                  />
                ) : (
                  <p className="text-gray-800">{profileData.email}</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <FiPhone className="mr-1" /> Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                  />
                ) : (
                  <p className="text-gray-800">{profileData.phone}</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <FiCalendar className="mr-1" /> Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dob"
                    value={profileData.dob}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                  />
                ) : (
                  <p className="text-gray-800">{profileData.dob}</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                  <FiMapPin className="mr-1" /> Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                  />
                ) : (
                  <p className="text-gray-800">{profileData.location}</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Password</label>
                <button className="flex items-center text-[#4D2C5E] hover:text-[#3a2152]">
                  <FiLock className="mr-1" />
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#4D2C5E] mb-4">Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Degree</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="education"
                    value={profileData.education}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                  />
                ) : (
                  <p className="text-gray-800">{profileData.education}</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">University</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="university"
                    value={profileData.university}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                  />
                ) : (
                  <p className="text-gray-800">{profileData.university}</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Graduation Year</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="graduationYear"
                    value={profileData.graduationYear}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                  />
                ) : (
                  <p className="text-gray-800">{profileData.graduationYear}</p>
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
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                  />
                </>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-[#4D2C5E]/10 text-[#4D2C5E] rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-xl font-semibold text-[#4D2C5E] mb-4">About Me</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                />
              ) : (
                <p className="text-gray-800 whitespace-pre-line">{profileData.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;