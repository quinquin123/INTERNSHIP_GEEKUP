import React from 'react';
import { Link } from 'react-router-dom';
import picture from '../../asset/geekup-logo-general.svg';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className="fixed top-0 right-0 left-0 bg-white shadow-sm z-40 h-16">
      <div className={`flex items-center justify-between h-full transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-16'
      }`}>
        {/* Menu button - only visible on mobile */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden ml-4 text-gray-600 hover:text-gray-800"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo in Header - Only visible when sidebar is collapsed */}
          {!isSidebarOpen && (
            <Link to="/" className="ml-4 text-xl font-bold text-blue-600 flex items-center">
              <img src={picture} alt="Logo" className="h-8" />
            </Link>
          )}
        </div>
        
        {/* Right side actions if needed */}
        <div className="flex items-center mr-4">
          {/* User profile, notifications, etc. can go here */}
        </div>
      </div>
    </header>
  );
};

export default Header;