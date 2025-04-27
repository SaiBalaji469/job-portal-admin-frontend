import React from 'react';
import { JobType } from '../../types';
import { MapPin, Clock, Users, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useJobContext } from '../../context/JobContext';

interface JobCardProps {
  job: JobType;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { deleteJob } = useJobContext();
  const timeAgo = formatDistanceToNow(new Date(job.postedAt), { addSuffix: false });
  const displayTime = timeAgo.includes('hours') || timeAgo.includes('hour') ? '24h Ago' : timeAgo;

  const handleDelete = async () => {
    try {
      await deleteJob(job._id);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative group">
      <button
        onClick={handleDelete}
        className="absolute top-1 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-500 hover:text-red-500 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-sm"
        title="Delete job"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src={job.companyLogo} 
              alt={`${job.company} logo`} 
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/64?text=' + job.company.charAt(0);
              }}
            />
          </div>
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
            {displayTime}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <Users className="h-4 w-4 mr-1" />
          <span>{job.experience}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{job.isOnsite ? 'Onsite' : 'Remote'}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>{job.salary}</span>
        </div>
        
        <ul className="mb-5 text-sm text-gray-600">
          <li className="flex items-start mb-1">
            <span className="mr-2">•</span>
            <p>A user-friendly interface lets you browse stunning photos and videos</p>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <p>Filter destinations based on interests and travel style, and create personalized itineraries</p>
          </li>
        </ul>
        
        <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors duration-300">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;