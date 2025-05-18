import React from 'react';

const Footer = ({ isSidebarOpen }) => {
  return (
    <footer className={`fixed bottom-0 left-0 right-0 bg-white shadow-md z-20 transition-all duration-300 ${
      isSidebarOpen ? 'ml-64' : 'ml-16'
    }`}>
      <div className="p-4 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;