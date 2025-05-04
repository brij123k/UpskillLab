import React, { useState } from 'react';
import { FiSearch, FiBriefcase, FiBookmark, FiClock } from 'react-icons/fi';

const StudentJobs = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const jobs = [
    { 
      id: 1, 
      title: "Frontend Developer Intern", 
      company: "TechCorp", 
      location: "Remote", 
      type: "Internship", 
      posted: "2 days ago",
      skills: ["React", "JavaScript", "CSS"],
      saved: false
    },
    { 
      id: 2, 
      title: "Python Developer", 
      company: "DataSystems", 
      location: "Bangalore", 
      type: "Full-time", 
      posted: "1 week ago",
      skills: ["Python", "Django", "SQL"],
      saved: true
    },
    { 
      id: 3, 
      title: "UI/UX Designer", 
      company: "CreativeMinds", 
      location: "Mumbai", 
      type: "Contract", 
      posted: "3 days ago",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      saved: false
    }
  ];

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSaveJob = (jobId) => {
    // In real app, this would update backend
    alert(`Job ${jobId} save status toggled`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#4D2C5E] mb-6">Job Opportunities</h1>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab('recommended')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'recommended' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Recommended
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'saved' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Saved Jobs
            </button>
            <button
              onClick={() => setActiveTab('applied')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'applied' ? 'bg-[#4D2C5E] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Applied
            </button>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#4D2C5E] text-lg">{job.title}</h3>
                    <p className="text-gray-700">{job.company} • {job.location}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <FiBriefcase className="mr-1" />
                      <span>{job.type}</span>
                      <span className="mx-2">•</span>
                      <FiClock className="mr-1" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleSaveJob(job.id)}
                    className={`p-2 rounded-full ${job.saved ? 'text-[#FF7426]' : 'text-gray-400 hover:text-[#4D2C5E]'}`}
                  >
                    <FiBookmark className={job.saved ? 'fill-current' : ''} />
                  </button>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] mr-2">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-[#FF7426] text-white rounded-lg hover:bg-[#E65100]">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 text-center text-gray-500 rounded-lg shadow-sm">
            No jobs found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentJobs;