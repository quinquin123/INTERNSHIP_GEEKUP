import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import Pagination from '../common/Pagination';
import usePagination from '../../hooks/usePagination';
import { fetchUsers } from '../../services/api';
import { getAvatarUrl } from '../../utils/helpers';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { page, itemsPerPage, changePage } = usePagination();
  
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, []);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={getAvatarUrl(user.name)} 
                    alt={`${user.name}'s avatar`} 
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                  <a href={`mailto:${user.email}`} className="hover:underline">{user.email}</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                  <a href={`tel:${user.phone}`} className="hover:underline">{user.phone}</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                  <a 
                    href={`https://${user.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {user.website}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link 
                    to={`/users/${user.id}`}
                    className="bg-white hover:bg-gray-100 text-black border border-gray-300 px-2 py-1 rounded cursor-pointer flex items-center gap-1"
                  >
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Show
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination 
        totalItems={users.length}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={changePage}
      />
    </div>
  );
};

export default UserList;