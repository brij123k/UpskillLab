import React, { useEffect, useState } from 'react';
import { FiUser, FiEdit, FiSave, FiLock, FiMail, FiPhone, FiCalendar, FiMapPin, FiBook } from 'react-icons/fi';
import { getDataHandler, getDataHandlerWithToken } from '../../../config/services';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    dob: "",
    location: "",
    education: "",
    university: "",
    graduationYear: "",
    skills: [],
    bio: "",
    studentType: ""
  });

  const studentProfileHandler = async () => {
    try {
      const response = await getDataHandlerWithToken('studentProfile');
      const coursesResponse = await getDataHandler('courseDisplay');
      console.log(response)
      setAllCourses(coursesResponse.data || []);
      setBatches(response.batch || []);

      if (response) {
        const { user, student } = response;
        
        setProfileData({
          name: student?.fullName || "N/A",
          email: user?.email || "N/A",
          mobileNumber: user?.mobileNumber||"N/A",
          dob: "N/A",
          location: "N/A",
          education: "N/A",
          university: "N/A",
          graduationYear: "N/A",
          skills: [],
          bio: "",
          studentType: student?.studentType || "N/A"
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      message.error('Failed to fetch profile data');
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
          rate: batch.rate // Assuming rate is available in batch data
        } : null;
      }).filter(Boolean);
      console.log(enrolled)
      setEnrolledCourses(enrolled);
    }
  }, [batches, allCourses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
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
            <div className="h-24 w-24 rounded-full border-4 border-white bg-[#4D2C5E] flex items-center justify-center text-white text-3xl font-bold">
  {profileData.name.split(' ').map(n => n[0]).join('')}
</div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-[#FF7426] text-white p-2 rounded-full hover:bg-[#E65100]">
                  <FiEdit />
                </button>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-white/90">Student Type: {profileData.studentType}</p>
              {enrolledCourses.length > 0 && (
                <p className="text-white/80">{enrolledCourses.length} Enrolled Courses</p>
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
                    name="mobileNumber"
                    value={profileData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                  />
                ) : (
                  <p className="text-gray-800">{profileData.mobileNumber}</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">Student Type</label>
                <p className="text-gray-800">{profileData.studentType}</p>
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
                  {profileData.skills.length > 0 ? (
                    profileData.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-[#4D2C5E]/10 text-[#4D2C5E] rounded-full text-sm"
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
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
                />
              ) : (
                <p className="text-gray-800 whitespace-pre-line">
                  {profileData.bio || "No bio added yet"}
                </p>
              )}
            </div>
          </div>

          {/* Enrolled Courses */}
          {enrolledCourses.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-[#4D2C5E] mb-4 flex items-center">
                <FiBook className="mr-2" />
                My Enrolled Courses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
                    <div className="relative h-40 bg-gradient-to-r from-[#4D2C5E] to-[#7B4D8D]">
                      {course.courseImage ? (
                        <img 
                          src={course.courseImage} 
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
                        <span className="text-sm text-gray-600">Batch: {course.batchCode}</span>
                        {/* <Tag color={course.status === 'Active' ? 'green' : 'red'}>
                          {course.status}
                        </Tag> */}
                        {/* <span className={`px-2 py-1 rounded text-xs ${
      course.status === 'Active' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {course.status}
    </span> */}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Started: {new Date(course.startDate).toLocaleDateString()}
                      </p>
                      {course.courseRating && (
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-gray-700">{course.courseRating}</span>
                        </div>
                      )}
                      {course.discountedPrice && (
  <div className="mt-2">
    <div className="flex items-baseline">
      <span className="text-lg font-bold text-[#4D2C5E]">
        ₹{course.discountedPrice}
      </span>
      {course.originalPrice && (
        <>
          <span className="ml-2 text-sm text-gray-400 line-through">
            ₹{course.originalPrice}
          </span>
          <span className="ml-2 px-2 py-0.5 bg-[#FF7426] text-white text-xs rounded-full">
            {Math.round((1 - course.discountedPrice/course.originalPrice)*100)}% OFF
          </span>
        </>
      )}
    </div>
  </div>
)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;