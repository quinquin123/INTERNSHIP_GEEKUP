import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/pages/HomePage';
import AlbumList from './components/pages/AlbumList';
import AlbumDetail from './components/pages/AlbumDetail';
import UserList from './components/pages/UserList';
import UserDetail from './components/pages/UserDetail';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/albums" element={<AlbumList />} />
          <Route path="/albums/:id" element={<AlbumDetail />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;