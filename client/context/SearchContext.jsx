import React, { createContext, useState } from "react";

// Create a new Context
export const SearchContext = createContext();

// Create a Provider component
export const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(null);

  return (
    <SearchContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContext.Provider>
  );
};