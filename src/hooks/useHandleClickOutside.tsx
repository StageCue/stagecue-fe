import { useEffect, useState } from 'react';

const useHandleClickOutside = (targetRef: React.RefObject<HTMLElement>) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef?.current && !targetRef?.current.contains(event?.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [targetRef]);

  return { isOpen, setIsOpen };
};

export default useHandleClickOutside;
