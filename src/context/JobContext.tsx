import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { JobType } from '../types';
import axios from 'axios';

const API_URL = 'https://job-portal-admin-backend-cb79.vercel.app/api/';

interface JobContextType {
  jobs: JobType[];
  setJobs: React.Dispatch<React.SetStateAction<JobType[]>>;
  addJob: (job: JobType) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  fetchJobs: () => Promise<void>;
  isCreateJobModalOpen: boolean;
  setIsCreateJobModalOpen: (isOpen: boolean) => void;
  isLoading: boolean;
  error: string | null;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<JobType[]>(`${API_URL}/jobs`);
      setJobs(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const addJob = async (job: JobType) => {
    try {
      const response = await axios.post(`${API_URL}/jobs`, job);
      setJobs((prevJobs) => [response.data, ...prevJobs]);
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/jobs/${id}`);
      setJobs((prevJobs) => prevJobs.filter(job => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  };

  // Fetch jobs when the provider mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobContext.Provider value={{ 
      jobs, 
      setJobs, 
      addJob,
      deleteJob,
      fetchJobs,
      isCreateJobModalOpen, 
      setIsCreateJobModalOpen,
      isLoading,
      error
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};