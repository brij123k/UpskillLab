import React from 'react';
import { FiUser, FiMail, FiPhone, FiEdit } from 'react-icons/fi';

const TeacherProfile = () => {
  // Mock profile data
  const profile = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@upskillab.com",
    phone: "+91 9876543210",
    specialization: "Data Science & Machine Learning",
    experience: "8 years",
    bio: "Passionate educator with expertise in Python, Data Analysis, and AI technologies. Committed to student success through practical, hands-on learning."
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">Teacher Profile</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="relative">
              <img 
                src="/images/default-teacher-avatar.png" 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-[#4D2C5E]/20"
              />
              <button className="absolute bottom-0 right-0 bg-[#FF7426] text-white p-2 rounded-full">
                <FiEdit className="text-sm" />
              </button>
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-[#4D2C5E]">{profile.name}</h2>
              <button className="flex items-center text-[#FF7426]">
                <FiEdit className="mr-1" /> Edit Profile
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <FiMail className="text-[#4D2C5E] mr-2" />
                <span>{profile.email}</span>
              </div>
              
              <div className="flex items-center">
                <FiPhone className="text-[#4D2C5E] mr-2" />
                <span>{profile.phone}</span>
              </div>
              
              <div>
                <h3 className="font-semibold text-[#4D2C5E]">Specialization</h3>
                <p>{profile.specialization}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-[#4D2C5E]">Teaching Experience</h3>
                <p>{profile.experience}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-[#4D2C5E]">Bio</h3>
                <p className="text-gray-600">{profile.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default TeacherProfile;