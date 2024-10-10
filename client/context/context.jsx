import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [categoryItem, setCategoryItem] = useState(null);

  return (
    <CategoryContext.Provider value={{ categoryItem, setCategoryItem }}>
      {children}
    </CategoryContext.Provider>
  );
};
