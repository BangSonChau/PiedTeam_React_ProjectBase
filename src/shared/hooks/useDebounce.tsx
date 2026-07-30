import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);

    // Xóa timer khi component unmount hoặc value/delay thay đổi
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}