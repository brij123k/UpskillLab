import React, { useEffect, useState, useRef } from 'react';
import { FiSearch, FiBriefcase, FiBookmark, FiClock, FiX, FiUpload } from 'react-icons/fi';
import { getDataHandler, getDataHandlerWithToken, postDataHandler } from '../../../config/services';
import { formatDistanceToNow } from 'date-fns';
import { message } from 'antd';
import ApiConfig from '../../../config/apiConfig';

const StudentJobs = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [allJobs, setAllJobs] = useState([]); // All available jobs
  const [appliedJobs, setAppliedJobs] = useState([]); // Jobs the student has applied to
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [profile, setProfile] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    jobId: '',
    qualification: {
      collegeName: '',
      passingYear: 0,
      branch: ''
    },
    resume: null
  });
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);

  const jobHandler = async () => {
    try {
      setLoading(true);
      // Fetch all jobs
      const jobsResponse = await getDataHandler('getJobs');
      const profileData = await getDataHandlerWithToken('studentProfile');

      // Fetch applied jobs for this student
      const endpoint = ApiConfig.appliedJobs(profileData.user.email);
      const appliedJobsResponse = await getDataHandlerWithToken(endpoint, null, null, true);

      setProfile(profileData);
      setAllJobs(jobsResponse.jobs || []);
      setAppliedJobs(appliedJobsResponse.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      message.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    jobHandler();
  }, []);

  // Filter jobs based on active tab and search query
  const getFilteredJobs = () => {
    // First filter by search query
    let filtered = allJobs.filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Then filter by active tab
    if (activeTab === 'applied') {
      // Show only applied jobs
      const appliedJobIds = appliedJobs.map(job => job._id);
      filtered = filtered.filter(job => appliedJobIds.includes(job._id));
    } else if (activeTab === 'recommended') {
      // Show only jobs that haven't been applied to
      const appliedJobIds = appliedJobs.map(job => job._id);
      filtered = filtered.filter(job => !appliedJobIds.includes(job._id));
    }

    return filtered;
  };

  const filteredJobs = getFilteredJobs();

  // Update form state once profile is available
  useEffect(() => {
    if (profile) {
      setApplicationForm(prev => ({
        ...prev,
        fullName: profile.student?.fullName || '',
        email: profile.user?.email || '',
        phoneNumber: profile.user?.mobileNumber || '',
        qualification: {
          collegeName: profile.student?.college || '',
        },
      }));
    }
  }, [profile]);

  // const filteredJobs = jobs.filter(job => 
  //   job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
  //   job.company.toLowerCase().includes(searchQuery.toLowerCase())
  // );



  const formatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setApplicationForm({
      ...applicationForm,
      jobId: job._id
    });
    setShowApplicationModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm({
      ...applicationForm,
      [name]: value
    });
  };

  const handleQualificationChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm({
      ...applicationForm,
      qualification: {
        ...applicationForm.qualification,
        [name]: value
      }
    });
  };

  const handleFileChange = (e) => {
    setApplicationForm({
      ...applicationForm,
      resume: e.target.files[0]
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const validateForm = () => {
    const errors = {};
    if (!applicationForm.fullName) errors.fullName = 'Full name is required';
    if (!applicationForm.email) errors.email = 'Email is required';
    if (!applicationForm.phoneNumber) errors.phoneNumber = 'Phone number is required';

    // Validate qualification fields
    if (!applicationForm.qualification.collegeName) errors.collegeName = 'College name is required';
    if (!applicationForm.qualification.passingYear) errors.passingYear = 'Passing year is required';
    if (!applicationForm.qualification.branch) errors.branch = 'Branch is required';

    if (!applicationForm.resume) errors.resume = 'Resume is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      // Create FormData for file upload
      const formData = new FormData();

      formData.append('source', "upskill");
      formData.append('fullName', applicationForm.fullName);
      formData.append('email', applicationForm.email);
      formData.append('phoneNumber', applicationForm.phoneNumber);
      formData.append('jobId', applicationForm.jobId);

      // Append qualification fields correctly for nested object
      formData.append('qualification[collegeName]', applicationForm.qualification.collegeName);
      formData.append('qualification[passingYear]', applicationForm.qualification.passingYear);
      formData.append('qualification[branch]', applicationForm.qualification.branch);

      // Append resume file
      formData.append('resume', applicationForm.resume);

      const response = await postDataHandler("postApplications", formData);

      if (response) {
        message.success('Application submitted successfully!');
        jobHandler()
        setShowApplicationModal(false);
        setApplicationForm({
          fullName: '',
          email: '',
          phoneNumber: '',
          jobId: '',
          qualification: {
            collegeName: '',
            passingYear: 0,
            branch: ''
          },
          resume: null
        });
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      message.error('Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E] mb-2">
            {activeTab === 'applied' ? 'Your Applications' : 'Job Opportunities'}
          </h1>
          <p className="text-gray-600">
            {activeTab === 'applied' ? 'View your submitted applications' : 'Find your dream job from top companies'}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={activeTab === 'applied' ?
                  "Search your applications..." :
                  "Search jobs by title or company..."}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setActiveTab('recommended')}
                className={`px-4 py-2 rounded-xl transition ${activeTab === 'recommended' ? 'bg-[#4D2C5E] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Recommended
              </button>
              <button
                onClick={() => setActiveTab('applied')}
                className={`px-4 py-2 rounded-xl transition ${activeTab === 'applied' ? 'bg-[#4D2C5E] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Applied ({appliedJobs.length})
              </button>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <div
                key={job._id || index}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Job Header with Logo */}
                <div className="p-4 border-b border-gray-100 flex items-center">
                  {job.logo ? (
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="h-12 w-12 object-contain rounded-lg mr-4"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-[#4D2C5E] rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                      {job.company.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-[#4D2C5E]">{job.title}</h3>
                    <p className="text-gray-700 text-sm">{job.company}</p>
                    {activeTab === 'applied' && (
                      <span className="text-xs text-green-600 mt-1">Applied</span>
                    )}
                  </div>
                </div>

                {/* Job Details */}
                <div className="p-4">
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <div className="flex items-center mr-4">
                      <FiBriefcase className="mr-1 text-[#4D2C5E]" />
                      <span>{job.subtitle || 'Full-time'}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="mr-1 text-[#4D2C5E]" />
                      <span>{formatDate(job.createdAt)}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {job.description || 'No description provided'}
                  </p>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 mb-2">REQUIRED SKILLS</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills && job.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-[#4D2C5E]/10 text-[#4D2C5E] rounded-full text-xs font-medium"
                        >
                          {skill.replace(/"/g, '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div className="flex space-x-2">
                      {activeTab === 'recommended' ? (
                        <button
                          onClick={() => handleApplyClick(job)}
                          className="px-3 py-2 text-sm bg-[#FF7426] text-white rounded-lg hover:bg-[#E65100] transition shadow-md"
                        >
                          Apply
                        </button>
                      ) : (
                        <span className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg">
                          Applied
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 text-center rounded-xl shadow-sm border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="h-40 flex items-center justify-center text-gray-400 mb-4">
                <FiBriefcase size={48} className="opacity-30" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                {activeTab === 'applied' ? 'No applications found' : 'No jobs found'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery ?
                  "No results match your search criteria. Try different keywords." :
                  activeTab === 'applied' ?
                    "You haven't applied to any jobs yet." :
                    "There are currently no available jobs. Please check back later."
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] transition"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-[#0000005b] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#4D2C5E]">Apply for {selectedJob?.title}</h2>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={applicationForm.fullName}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50`}
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={applicationForm.email}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50`}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={applicationForm.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50`}
                    />
                    {formErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>}
                  </div> */}

                  {/* Qualification Fields */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Qualification Details *</h3>

                    {profile.student?.college ? <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">College Name *</label>
                      <input
                        type="text"
                        name="collegeName"
                        value={applicationForm.qualification.collegeName}
                        onChange={handleQualificationChange}
                        className={`w-full p-2 border ${formErrors.collegeName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50`}
                      />
                      {formErrors.collegeName && <p className="text-red-500 text-xs mt-1">{formErrors.collegeName}</p>}
                    </div> : ""}

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Passing Year *</label>
                      <input
                        type="number"
                        name="passingYear"
                        value={applicationForm.qualification.passingYear}
                        onChange={handleQualificationChange}
                        min="1900"
                        max="2099"
                        className={`w-full p-2 border ${formErrors.passingYear ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50`}
                      />
                      {formErrors.passingYear && <p className="text-red-500 text-xs mt-1">{formErrors.passingYear}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Branch *</label>
                      <input
                        type="text"
                        name="branch"
                        value={applicationForm.qualification.branch}
                        onChange={handleQualificationChange}
                        className={`w-full p-2 border ${formErrors.branch ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50`}
                      />
                      {formErrors.branch && <p className="text-red-500 text-xs mt-1">{formErrors.branch}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume *</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className={`w-full p-2 border ${formErrors.resume ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]/50 text-left flex justify-between items-center`}
                    >
                      <span className="truncate">
                        {applicationForm.resume ? applicationForm.resume.name : 'Choose file...'}
                      </span>
                      <FiUpload className="text-gray-500" />
                    </button>
                    {formErrors.resume && <p className="text-red-500 text-xs mt-1">{formErrors.resume}</p>}
                    <p className="text-xs text-gray-500 mt-1">Accepted format: PDF</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowApplicationModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#3a2152] transition disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
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

export default StudentJobs;