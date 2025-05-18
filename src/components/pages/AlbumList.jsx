import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import usePagination from '../../hooks/usePagination';
import LoadingSpinner from '../common/LoadingSpinner';
import Pagination from '../common/Pagination';
import { fetchAlbums, fetchUsers } from '../../services/api';
import { getAvatarUrl } from '../../utils/helpers';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { page, itemsPerPage, changePage } = usePagination();
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [albumsData, usersData] = await Promise.all([fetchAlbums(), fetchUsers()]);
        setAlbums(albumsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlbums = albums.slice(startIndex, endIndex);
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Album List</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentAlbums.map(album => {
              const user = users.find(u => u.id === album.userId);
              return (
                <tr key={album.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{album.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{album.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user && (
                      <Link to={`/users/${user.id}`} className="flex items-center space-x-3 hover:text-blue-500">
                        <img 
                          src={getAvatarUrl(user.name)} 
                          alt={`${user.name}'s avatar`} 
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{user.name}</span>
                      </Link>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link 
                      to={`/albums/${album.id}`}
                      className="inline-flex items-center justify-center gap-1 bg-white border border-gray-300 px-3 py-1 text-sm rounded hover:text-blue-500 hover:border-blue-500 transition-colors"
                    >
                      <Eye size={14} />
                      <span>Show</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <Pagination 
        totalItems={albums.length}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={changePage}
      />
    </div>
  );
};

export default AlbumList;