export const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str; // Return the original string if it's within the limit
    }
  
    // Truncate string and add '...' at the end
    return str.slice(0, maxLength - 3) + '...';
  };
  