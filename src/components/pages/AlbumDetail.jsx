import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import { fetchAlbum, fetchUser, fetchPhotosByAlbum } from '../../services/api';
// eslint-disable-next-line no-unused-vars
import { getAvatarUrl, fixImageUrl } from '../../utils/helpers';

const AlbumDetail = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const albumData = await fetchAlbum(id);
        const userData = await fetchUser(albumData.userId);
        const photosData = await fetchPhotosByAlbum(id);

        setAlbum(albumData);
        setUser(userData);
        setPhotos(photosData);
      } catch (error) {
        console.error('Error loading album details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // Handle photo navigation
  const openPhotoModal = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(index);
  };

  const goToNextPhoto = () => {
    const newIndex = (currentPhotoIndex + 1) % photos.length;
    setCurrentPhotoIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const goToPreviousPhoto = () => {
    const newIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    setCurrentPhotoIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  // Handle zoom in/out
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2.5));
  };
  
  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };
  
  const resetZoom = () => {
    setZoomLevel(1);
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    const photoContainer = document.getElementById('photo-modal-container');
    
    if (!document.fullscreenElement) {
      if (photoContainer.requestFullscreen) {
        photoContainer.requestFullscreen();
      } else if (photoContainer.webkitRequestFullscreen) {
        photoContainer.webkitRequestFullscreen();
      } else if (photoContainer.mozRequestFullScreen) {
        photoContainer.mozRequestFullScreen();
      } else if (photoContainer.msRequestFullscreen) {
        photoContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Mock data for demonstration (this would be replaced by actual API data)
  const mockPhotos = [
    {
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "/api/placeholder/600/600",
      thumbnailUrl: "/api/placeholder/150/150"
    },
    {
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "/api/placeholder/600/600",
      thumbnailUrl: "/api/placeholder/150/150"
    },
    {
      id: 3,
      title: "officia porro iure quia iusto qui ipsa ut modi",
      url: "/api/placeholder/600/600",
      thumbnailUrl: "/api/placeholder/150/150"
    },
    {
      id: 4,
      title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      url: "/api/placeholder/600/600",
      thumbnailUrl: "/api/placeholder/150/150"
    },
    {
      id: 5,
      title: "natus nisi omnis corporis facere molestiae rerum in",
      url: "/api/placeholder/600/600",
      thumbnailUrl: "/api/placeholder/150/150"
    },
    {
      id: 6,
      title: "officia delectus consequatur vero aut veniam explicabo molestias",
      url: "/api/placeholder/600/600",
      thumbnailUrl: "/api/placeholder/150/150"
    },
    {
      id: 7,
      title: "aut porro officiis laborum odit ea laudantium corporis",
      url: "/api/placeholder/600/600",
      thumbnailUrl: "/api/placeholder/150/150"
    },
    {
      id: 8,
      title: "qui eius qui autem sed",
      url: "/api/placeholder/600/600",
      thumbnailUrl: "/api/placeholder/150/150"
    },
    {
      id: 9,
      title: "beatae et provident et ut vel",
      url: "/api/placeholder/600/600",
      thumbnailUrl: "/api/placeholder/150/150"
    },
    {
      id: 10,
      title: "accusamus ea aliquid et amet sequi nemo",
      url: "/api/placeholder/600/600",
      thumbnailUrl: "/api/placeholder/150/150"
    }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!album || !user) {
    return <div className="text-center py-8">Album not found</div>;
  }

  // Use mockPhotos if photos array is empty (for demonstration)
  const displayPhotos = photos.length > 0 ? photos : mockPhotos;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Breadcrumb and Navigation */}
      <div className="bg-white text-gray-600 p-3 flex items-center border-b">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-500">📋</span>
          <Link to="/albums" className="text-blue-600 hover:underline">Albums</Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-700">Show</span>
        </div>
      </div>

      {/* Back Button */}
      <div className="p-4 bg-white">
        <Link
          to="/albums"
          className="flex items-center text-gray-700 hover:text-gray-900 group"
        >
          <span className="mr-2">←</span> 
          <span className="font-medium">Show Album</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="bg-white shadow-sm rounded-lg p-6">
          {/* User Information */}
          <div className="mb-6 pb-4 border-b">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white text-lg font-semibold">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'LG'}
              </div>
              <div>
                <Link to={`/users/${user.id}`} className="text-lg font-medium text-blue-600 hover:text-blue-800">
                  {user?.name || 'Leanne Graham'}
                </Link>
                <div className="text-blue-500">{user?.email || 'Sincere@april.biz'}</div>
              </div>
            </div>
          </div>

          {/* Album Title and Photos */}
          <h2 className="text-2xl font-semibold mb-4">{album?.title || 'quidem molestiae enim'}</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayPhotos.map((photo, index) => (
              <div 
                key={photo.id}
                className="cursor-pointer relative"
                onClick={() => openPhotoModal(photo, index)}
              >
                <img 
                  src={photo.thumbnailUrl} 
                  alt={photo.title} 
                  className="rounded-lg shadow-sm w-full h-32 object-cover" 
                />
                <div className="absolute inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                  <div className="flex items-center gap-2 text-white">
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Preview
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Screen Photo Modal */}
      {selectedPhoto && (
        <div 
          id="photo-modal-container"
          className="fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            // Close modal when clicking outside of the content area
            if (e.target.id === 'photo-modal-container') {
              setSelectedPhoto(null);
              setZoomLevel(1);
            }
          }}
        >
          <div className="bg-white rounded-lg max-w-4xl w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold truncate max-w-md">{selectedPhoto.title}</h3>
              <button
                onClick={() => {
                  setSelectedPhoto(null);
                  setZoomLevel(1);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="flex justify-center overflow-hidden" style={{ height: '60vh' }}>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="object-contain transition-transform duration-200"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  maxHeight: '100%'
                }}
              />
            </div>
            <div className="flex justify-center items-center gap-4 mt-4">
              <button 
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                onClick={goToPreviousPhoto}
                aria-label="Previous photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
              </button>
              <button 
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                onClick={resetZoom}
                aria-label="Reset zoom"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </button>
              <button 
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                onClick={toggleFullscreen}
                aria-label="Toggle fullscreen"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
                </svg>
              </button>
              <button 
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                onClick={zoomOut}
                aria-label="Zoom out"
                disabled={zoomLevel <= 0.5}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"></path>
                </svg>
              </button>
              <button 
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                onClick={zoomIn}
                aria-label="Zoom in"
                disabled={zoomLevel >= 2.5}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
                </svg>
              </button>
              <button 
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                onClick={goToNextPhoto}
                aria-label="Next photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
            <div className="text-center mt-4 text-gray-500">
              <span>{currentPhotoIndex + 1} / {displayPhotos.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumDetail;