import { useEffect, useState } from "react";

export const useDebouncedValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return (): void => {
      return clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};
