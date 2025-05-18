export const getAvatarUrl = (name) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
};

export const fixImageUrl = (url) => {
  return url.replace('https://via.placeholder.com', 'https://dummyjson.com/image');
};