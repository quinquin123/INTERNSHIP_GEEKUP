export const fetchAlbums = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  return await response.json();
};

export const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return await response.json();
};

export const fetchUser = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return await response.json();
};

export const fetchAlbum = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
  return await response.json();
};

export const fetchAlbumsByUser = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
  return await response.json();
};

export const fetchPhotosByAlbum = async (albumId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
  return await response.json();
};