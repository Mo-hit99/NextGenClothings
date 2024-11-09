export function formatNumber(number) {
    if (number >= 1e9) {
      // Billions (B)
      return (number / 1e9).toFixed(1) + 'B';
    } else if (number >= 1e6) {
      // Millions (M)
      return (number / 1e6).toFixed(1) + 'M';
    } else if (number >= 1e3) {
      // Thousands (K)
      return (number / 1e3).toFixed(1) + 'K';
    } else {
      // Numbers less than 1000
      return number;
    }
  }