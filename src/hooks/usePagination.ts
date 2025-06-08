"use client";

import { useState, useMemo } from 'react';

export function usePagination<T>(data : T[] , itemsPerPage: number = 5){
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);// totalPages ex: 1,2,3...

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage: setCurrentPage,
  };
};
