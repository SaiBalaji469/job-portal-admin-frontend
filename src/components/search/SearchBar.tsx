import React, { useState } from 'react';
import { SearchFilters } from '../../types';
import { Search, MapPin, Briefcase } from 'lucide-react';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters: SearchFilters;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialFilters }) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [minSalary, maxSalary] = filters.salaryRange;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, query: e.target.value });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, location: e.target.value });
  };

  const handleJobTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, jobType: e.target.value });
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const isMin = e.target.name === 'minSalary';

    setFilters({
      ...filters,
      salaryRange: isMin
        ? [value, filters.salaryRange[1]]
        : [filters.salaryRange[0], value],
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <form onSubmit={handleSearch} className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search By Job Title, Role"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={filters.query}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
            value={filters.location}
            onChange={handleLocationChange}
          >
            <option value="">Preferred Location</option>
            <option value="bangalore">Bangalore</option>
            <option value="chennai">Chennai</option>
            <option value="delhi">Delhi</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="mumbai">Mumbai</option>
            <option value="pune">Pune</option>
          </select>
        </div>

        <div className="flex-1 relative">
          <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
            value={filters.jobType}
            onChange={handleJobTypeChange}
          >
            <option value="">Job Type</option>
            <option value="fulltime">Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div className="flex-1">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Salary Per Month</span>
            <span>₹{minSalary / 1000}k - ₹{maxSalary / 1000}k</span>
          </div>
          <div className="relative h-6 flex items-center">
            <input
              type="range"
              name="minSalary"
              min="0"
              max="200000"
              step="10000"
              value={minSalary}
              onChange={handleSalaryChange}
              className="absolute w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
            />
            <input
              type="range"
              name="maxSalary"
              min="0"
              max="200000"
              step="10000"
              value={maxSalary}
              onChange={handleSalaryChange}
              className="absolute w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:w-10">
          <button
            type="submit"
            className="w-10 h-10 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
            title="Apply Filters"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
