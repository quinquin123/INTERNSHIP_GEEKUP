import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to Photo Gallery</h1>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        Explore photos organized by albums and users. View details about each album and user.
      </p>
      <div className="flex justify-center space-x-6">
        <Link 
          to="/albums" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium"
        >
          View Albums
        </Link>
        <Link 
          to="/users" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium"
        >
          View Users
        </Link>
      </div>
    </div>
  );
};

export default HomePage;