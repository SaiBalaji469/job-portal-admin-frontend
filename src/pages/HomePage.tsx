import React, { useState } from 'react';
import JobCard from '../components/jobs/JobCard';
import SearchBar from '../components/search/SearchBar';
import { useJobContext } from '../context/JobContext';
import { SearchFilters } from '../types';
import CreateJobModal from '../components/jobs/CreateJobModal';

const HomePage: React.FC = () => {
  const {
    jobs,
    isLoading,
    error,
    isCreateJobModalOpen,
    setIsCreateJobModalOpen,
  } = useJobContext();

  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
    jobType: '',
    salaryRange: [50000, 80000],
  });

  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setHasSearched(true);
  };

  // Helper function to normalize job type
  const normalizeJobType = (type: string) => type.replace(/\s+/g, '').toLowerCase();

  // Helper function to parse salary and handle LPA conversion
  const parseSalary = (salary: string): number => {
    if (salary.toLowerCase().includes('lpa')) {
      const lpaMatch = salary.match(/([\d.]+)/);
      if (lpaMatch) {
        return Math.round((parseFloat(lpaMatch[1]) * 100000) / 12); // LPA to monthly
      }
    }
    const salaryMatch = salary.match(/([\d,]+)/);
    if (salaryMatch) {
      return parseInt(salaryMatch[1].replace(/,/g, ''), 10);
    }
    return 0; // Default to 0 if salary parsing fails
  };

  // Filtering logic
  const filteredJobs = hasSearched
    ? jobs.filter((job) => {
        const matchesQuery = job.title.toLowerCase().includes(filters.query.toLowerCase());
        const matchesLocation =
          filters.location === '' || job.location.toLowerCase() === filters.location.toLowerCase();
        const matchesJobType =
          filters.jobType === '' || normalizeJobType(job.jobType) === normalizeJobType(filters.jobType);

        const jobSalary = parseSalary(job.salary);
        const matchesSalary =
          jobSalary >= filters.salaryRange[0] && jobSalary <= filters.salaryRange[1];

        // Return job only if it matches all filters
        return matchesQuery && matchesLocation && matchesJobType && matchesSalary;
      })
    : jobs; // If no filter is applied, return all jobs

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} initialFilters={filters} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No jobs found matching your criteria.
            </p>
          )}
        </div>
      </div>

      {isCreateJobModalOpen && (
        <CreateJobModal onClose={() => setIsCreateJobModalOpen(false)} />
      )}
    </>
  );
};

export default HomePage;
