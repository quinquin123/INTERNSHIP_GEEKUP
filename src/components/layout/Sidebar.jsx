import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import picture from '../../asset/geekup-logo-general.svg';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  
  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-16'
      } z-50`}
    >
      {/* Logo area */}
      <div className="flex items-center justify-center h-16 px-4 border-b">
        {isSidebarOpen ? (
          <Link to="/" className="flex items-center">
            <img src={picture} alt="Logo" className="h-8" />
          </Link>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* Empty Logo Space when collapsed */}
          </div>
        )}
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/albums"
              className={`p-3 rounded-lg flex items-center ${
                !isSidebarOpen ? 'justify-center' : ''
              } ${
                isActive('/albums') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100 text-gray-700 hover:text-blue-600'
              } transition-colors duration-200`}
            >
              <svg
                className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
              </svg>
              {isSidebarOpen && <span className="font-medium">Albums</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`p-3 rounded-lg flex items-center ${
                !isSidebarOpen ? 'justify-center' : ''
              } ${
                isActive('/users') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100 text-gray-700 hover:text-blue-600'
              } transition-colors duration-200`}
            >
              <svg
                className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              {isSidebarOpen && <span className="font-medium">Users</span>}
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Toggle button - positioned at the center bottom */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center">
        <button
          onClick={toggleSidebar}
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded-full border border-blue-200 transition-colors duration-200"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
