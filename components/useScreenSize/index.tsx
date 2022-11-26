import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize]: any = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
