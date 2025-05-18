import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUser, fetchAlbumsByUser } from '../../services/api';
import { getAvatarUrl } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const userData = await fetchUser(id);
        const albumsData = await fetchAlbumsByUser(id);
        
        setUser(userData);
        setAlbums(albumsData);
      } catch (error) {
        console.error('Error loading user details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <div className="text-center py-8">User not found</div>;
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/users" className="text-blue-500 hover:underline">← Back to Users</Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center mb-6">
          <img 
            src={getAvatarUrl(user.name)} 
            alt={`${user.name}'s avatar`} 
            className="w-20 h-20 rounded-full mr-6"
          />
          <div>
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <div className="space-y-1">
              <div>
                <span className="font-medium">Email: </span>
                <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">
                  {user.email}
                </a>
              </div>
              <div>
                <span className="font-medium">Phone: </span>
                <a href={`tel:${user.phone}`} className="text-blue-500 hover:underline">
                  {user.phone}
                </a>
              </div>
              <div>
                <span className="font-medium">Website: </span>
                <a 
                  href={`https://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <p className="mb-4">
            {user.address.street}, {user.address.suite}<br />
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>
        
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Company</h2>
          <p className="font-medium">{user.company.name}</p>
          <p className="text-gray-600 italic mb-2">{user.company.catchPhrase}</p>
          <p className="text-gray-600">{user.company.bs}</p>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Albums</h2>
        {albums.length === 0 ? (
          <p>No albums found for this user.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b py-2 px-4 text-left font-semibold">ID</th>
                  <th className="border-b py-2 px-4 text-left font-semibold">Title</th>
                  <th className="border-b py-2 px-4 text-center font-semibold w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {albums.map(album => (
                  <tr key={album.id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">{album.id}</td>
                    <td className="py-2 px-4">{album.title}</td>
                    <td className="py-2 px-4 text-center">
                      <Link 
                        to={`/albums/${album.id}`}
                        className="bg-white hover:bg-gray-100 text-black border border-gray-200 px-3 py-1.5 rounded-lg cursor-pointer flex items-center gap-2 transition-shadow hover:shadow-sm w-auto"
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
        )}
      </div>
    </div>
  );
};

export default UserDetail;