import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const mobileWidth = window.innerWidth < 768;
      setIsMobile(mobileWidth);
      
      // Auto close sidebar on mobile
      if (mobileWidth) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Mobile Overlay to close sidebar when clicked outside */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
      />
      
      <Header 
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      
      <main
        className={`min-h-screen pt-16 transition-all duration-300 ${
          isSidebarOpen ? 
            'md:ml-64' : // Sidebar open on desktop
            'ml-0 md:ml-16' // Sidebar closed
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;