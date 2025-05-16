import React, { useEffect, useState } from 'react';
import { 
  FiTrendingUp, 
  FiBarChart2, 
  FiDollarSign, 
  FiBook, 
  FiPlus,
  FiLink,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiTrash2
} from 'react-icons/fi';
import { getDataHandlerWithToken, postDataHandlerWithToken } from '../../../config/services';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const MarketAnalysis = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pdf: null,
    image: null,
    link: '',
    isApproved: false,
    tags: [],
    courseId: '',
    newTag: ''
  });

  // Fetch resources
  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await getDataHandlerWithToken('resources');
      setResources(response.resources || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'pdf' || name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle description change for rich text editor
  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  // Add new tag
  const addTag = () => {
    if (formData.newTag && !formData.tags.includes(formData.newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag],
        newTag: ''
      });
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('isApproved', formData.isApproved);
      formDataToSend.append('courseId', formData.courseId);
      formData.tags.forEach(tag => formDataToSend.append('tags[]', tag));
      if (formData.pdf) formDataToSend.append('pdf', formData.pdf);
      if (formData.image) formDataToSend.append('image', formData.image);

      await postDataHandlerWithToken('resources', formDataToSend, true);
      toast.success('Resource added successfully!');
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        pdf: null,
        image: null,
        link: '',
        isApproved: false,
        tags: [],
        courseId: '',
        newTag: ''
      });
      fetchResources();
    } catch (error) {
      console.error('Error adding resource:', error);
      toast.error('Failed to add resource');
    }
  };

  // Mock data for market analysis
  const trendingSkills = [
    { skill: "Python Programming", demand: "High", avgSalary: "₹8-12 LPA", courses: 24 },
    { skill: "Data Science", demand: "Very High", avgSalary: "₹10-15 LPA", courses: 18 },
    { skill: "Web Development", demand: "High", avgSalary: "₹6-10 LPA", courses: 32 },
    { skill: "Cloud Computing", demand: "Growing", avgSalary: "₹9-14 LPA", courses: 12 },
  ];

  const studentInterests = [
    { course: "Python Fundamentals", students: 145, trend: "up" },
    { course: "Machine Learning", students: 98, trend: "up" },
    { course: "React JS", students: 76, trend: "steady" },
    { course: "DevOps", students: 52, trend: "up" },
  ];

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#4D2C5E] mb-6">Market Analysis & Resources</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#4D2C5E]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Trending Skills</p>
              <p className="text-2xl font-bold text-[#4D2C5E]">12</p>
            </div>
            <div className="p-3 rounded-full bg-[#FF7426]/10 text-[#FF7426]">
              <FiTrendingUp className="text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#4D2C5E]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Salary Increase</p>
              <p className="text-2xl font-bold text-[#4D2C5E]">25%</p>
            </div>
            <div className="p-3 rounded-full bg-[#4D2C5E]/10 text-[#4D2C5E]">
              <FiDollarSign className="text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-[#4D2C5E]/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Resources Available</p>
              <p className="text-2xl font-bold text-[#4D2C5E]">{resources.length}</p>
            </div>
            <div className="p-3 rounded-full bg-[#FF7426]/10 text-[#FF7426]">
              <FiBook className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Resource Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 bg-[#4D2C5E] text-white rounded-lg hover:bg-[#5F3A73] transition-colors"
        >
          <FiPlus className="mr-2" />
          {showForm ? 'Cancel' : 'Add Resource'}
        </button>
      </div>

      {/* Add Resource Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <h2 className="text-xl font-bold text-[#4D2C5E] mb-4">Add New Resource</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course ID *</label>
                <input
                  type="text"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <ReactQuill
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  theme="snow"
                  className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">External Link</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approval Status *</label>
                <select
                  name="isApproved"
                  value={formData.isApproved}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                  required
                >
                  <option value={false}>Pending</option>
                  <option value={true}>Approved</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
                <input
                  type="file"
                  name="pdf"
                  onChange={handleInputChange}
                  accept=".pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags *</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formData.newTag}
                    onChange={(e) => setFormData({...formData, newTag: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4D2C5E]"
                    placeholder="Add new tag"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-[#4D2C5E] text-white rounded-md hover:bg-[#5F3A73] transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <span className="text-sm">{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        <FiXCircle size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#4D2C5E] text-white rounded-md hover:bg-[#5F3A73] transition-colors"
              >
                Submit Resource
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Resources List */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center">
          <FiBook className="mr-2" />
          Available Resources
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4D2C5E]"></div>
          </div>
        ) : resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map(resource => (
              <div key={resource._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {resource.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={resource.image} 
                      alt={resource.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                      }}
                    />
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-[#4D2C5E]">{resource.title}</h3>
                    <span className={`flex items-center text-xs ${
                      resource.isApproved ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {resource.isApproved ? (
                        <FiCheckCircle className="mr-1" />
                      ) : (
                        <FiXCircle className="mr-1" />
                      )}
                      {resource.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags?.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: resource.description }} />
                  
                  <div className="flex flex-wrap gap-2">
                    {resource.link && (
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-1 bg-[#4D2C5E]/10 text-[#4D2C5E] rounded-md text-sm hover:bg-[#4D2C5E]/20 transition-colors"
                      >
                        <FiLink className="mr-1" /> Visit
                      </a>
                    )}
                    {resource.pdf && (
                      <a
                        href={resource.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-3 py-1 bg-[#FF7426]/10 text-[#FF7426] rounded-md text-sm hover:bg-[#FF7426]/20 transition-colors"
                      >
                        <FiDownload className="mr-1" /> PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <FiBook className="mx-auto text-4xl mb-3" />
            <p>No resources available yet</p>
          </div>
        )}
      </div>
      
      {/* Market Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Skills */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center">
            <FiTrendingUp className="mr-2" />
            Trending Skills in Market
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Skill</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Demand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Avg. Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D2C5E] uppercase tracking-wider">Courses</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trendingSkills.map((skill, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{skill.skill}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        skill.demand === "Very High" ? "bg-red-100 text-red-800" :
                        skill.demand === "High" ? "bg-orange-100 text-orange-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {skill.demand}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{skill.avgSalary}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{skill.courses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Student Interests */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-[#4D2C5E] mb-4 flex items-center">
            <FiBarChart2 className="mr-2" />
            Student Interests
          </h2>
          
          <div className="space-y-4">
            {studentInterests.map((course, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{course.course}</h3>
                  <span className={`flex items-center text-sm ${
                    course.trend === "up" ? "text-green-600" : "text-gray-600"
                  }`}>
                    {course.trend === "up" ? "↑ Growing" : "→ Steady"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-[#4D2C5E] h-2.5 rounded-full" 
                    style={{ width: `${(course.students / 200) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{course.students} students</span>
                  <span>Last updated: 1 week ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;