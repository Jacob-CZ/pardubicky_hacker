import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: any) => {
      const x = (ev.clientX / window.innerWidth) * 2 - 1;
      const y = (ev.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;