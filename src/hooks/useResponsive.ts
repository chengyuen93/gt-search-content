import { useCallback, useEffect, useState } from 'react';

// can add more sizes if need to
type ResponsiveSizes = {
  isSmallScreen: boolean;
};

const defaultSize: ResponsiveSizes = {
  isSmallScreen: false,
};

export const useResponsive = () => {
  const [sizes, setSizes] = useState<ResponsiveSizes>(defaultSize);

  const handleResize = useCallback(() => {
    const values = {
      xs: 0,
      sm: 700,
      md: 905,
      lg: 1240,
      xl: 1536,
    };

    const width = window.innerWidth;
    setSizes({
      isSmallScreen: width <= values.sm,
    });
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return sizes;
};
