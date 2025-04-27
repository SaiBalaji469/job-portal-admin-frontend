import React from 'react';
import { Link } from 'react-router-dom';
import { useJobContext } from '../../context/JobContext';

const Navbar: React.FC = () => {
  const { setIsCreateJobModalOpen } = useJobContext();

  return (
    <div className="w-full flex justify-center px-4 py-6">
      <nav className="w-full max-w-7xl bg-white rounded-full shadow-lg px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center">
              <img src="/favicon.ico" alt="Project Bolt Logo" className="h-8 w-8" />
            </Link>
            
            <div className="flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600 font-medium">
                Home
              </Link>
              <Link to="/jobs" className="text-gray-600 hover:text-purple-600 font-medium">
                Find Jobs
              </Link>
              <Link to="/talents" className="text-gray-600 hover:text-purple-600 font-medium">
                Find Talents
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600 font-medium">
                About us
              </Link>
              <Link to="/testimonials" className="text-gray-600 hover:text-purple-600 font-medium">
                Testimonials
              </Link>
            </div>
          </div>

          <button
            onClick={() => setIsCreateJobModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-lg font-medium transition-colors duration-300"
          >
            Create Jobs
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
