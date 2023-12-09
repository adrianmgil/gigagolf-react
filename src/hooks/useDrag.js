import { useState, useEffect } from 'react';

const useDrag = (ref, deps = [], options) => {
    const {
        onMouseDown = () => {},
        onMouseUp = () => {},
        onMouseMove = () => {},
        onDrag = () => {},
      } = options; 

    const [isDragging, setDragging] = useState(false);

    const handleMouseDown = (e) => {
        setDragging(true);
        onMouseDown(e);
    };

    const handleMouseUp = (e) => {
        setDragging(false);
        onMouseUp(e);
    };

    const handleMouseMove = (e) => {
        onMouseMove(e);
    };

    useEffect(() => {
        const element = ref.current;
        if (element) {
          element.addEventListener('mouseDown', handleMouseDown);
          element.addEventListener('mouseUp', handleMouseUp);
          element.addEventListener('mouseMove', handleMouseMove);
    
          return () => {
            element.removeEventListener('mouseDown', handleMouseDown);
            element.removeEventListener('mouseUp', handleMouseUp);
            element.removeEventListener('mouseMove', handleMouseMove);
          };
        }
    
        return () => {};
      }, [...deps, isDragging]);
          
    return { isDragging };
};

export default useDrag;