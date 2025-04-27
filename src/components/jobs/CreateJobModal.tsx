import React, { useState } from 'react';
import { JobType } from '../../types';
import { useJobContext } from '../../context/JobContext';
import { X, ChevronDown, Calendar } from 'lucide-react';

interface CreateJobModalProps {
  onClose: () => void;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({ onClose }) => {
  const { addJob } = useJobContext();
  const [showJobTypeDropdown, setShowJobTypeDropdown] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'Full Time',
    salaryMin: '',
    salaryMax: '',
    description: '',
    applicationDeadline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleJobTypeSelect = (type: string) => {
    setFormData({
      ...formData,
      jobType: type
    });
    setShowJobTypeDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault();
    
    // Generate a random logo based on company name for demo
    const getCompanyLogo = () => {
      const company = formData.company.toLowerCase().replace(/[^a-z0-9]/g, '');
      return `https://logo.clearbit.com/${company}.com`;
    };
    
    const newJob: JobType = {
      _id: Date.now().toString(),
      title: formData.title,
      company: formData.company,
      companyLogo: getCompanyLogo(),
      location: formData.location,
      jobType: formData.jobType,
      salary: `${parseInt(formData.salaryMax) / 100000}LPA`,
      experience: '1-3 yr Exp',
      postedAt: new Date(),
      isOnsite: true,
      description: formData.description,
      applicationDeadline: formData.applicationDeadline ? new Date(formData.applicationDeadline) : undefined
    };
    
    try {
      await addJob(newJob);
    onClose();
    } catch (error) {
      console.error('Error creating job:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Create Job Opening</h2>
          
          <form onSubmit={(e) => handleSubmit(e, false)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Full Stack Developer"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Amazon, Microsoft, Swiggy"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                    required
                  >
                    <option value="">Choose Preferred Location</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <div className="relative">
                  <div 
                    className="w-full p-2 border border-gray-300 rounded-md flex justify-between items-center cursor-pointer"
                    onClick={() => setShowJobTypeDropdown(!showJobTypeDropdown)}
                  >
                    <span>{formData.jobType || 'Select Job Type'}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                  
                  {showJobTypeDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      <ul>
                        <li 
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleJobTypeSelect('Internship')}
                        >
                          Internship
                        </li>
                        <li 
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleJobTypeSelect('Full Time')}
                        >
                          Full Time
                        </li>
                        <li 
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleJobTypeSelect('Part Time')}
                        >
                          Part Time
                        </li>
                        <li 
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleJobTypeSelect('Contract')}
                        >
                          Contract
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="salaryMin"
                      value={formData.salaryMin}
                      onChange={handleChange}
                      className="w-full pl-6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="salaryMax"
                      value={formData.salaryMax}
                      onChange={handleChange}
                      className="w-full pl-6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="12,00,000"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                <div className="relative">
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Please share a description to let the candidate know more about the job role"
                required
              ></textarea>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
                onClick={() => handleSubmit(event as any, true)}
              >
                Save Draft <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
              >
                Publish <span className="ml-2">»</span>
              </button>
            </div>
          </form>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default CreateJobModal;