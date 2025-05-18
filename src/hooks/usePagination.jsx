import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePagination = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    if (pageParam) {
      setPage(parseInt(pageParam));
    }
  }, [location.search]);
  
  const changePage = (newPage) => {
    setPage(newPage);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', newPage);
    navigate({ search: searchParams.toString() });
  };
  
  return { page, itemsPerPage, changePage };
};

export default usePagination;