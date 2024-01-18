import { useEffect, useRef, useState } from 'react';

export function useDebounce(value, action = () => {}, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const debounceTimer = useRef();

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      action();
    }, delay);
  }, [value]);

  return debouncedValue;
}
