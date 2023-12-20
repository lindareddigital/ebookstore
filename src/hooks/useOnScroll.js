import React, { useEffect, useState } from 'react';

export default function useOnScroll() {
  const [scrollY, setScrollY] = useState<number>(0);
  useEffect(() => {
    setScrollY(window.scrollY);
    const navbarDimensions = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', navbarDimensions);
    return () => {
      window.removeEventListener('scroll', navbarDimensions);
    };
  }, [setScrollY]);

  return scrollY;
}
