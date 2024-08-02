import { useEffect, useRef, useState } from 'react';

interface DebouncedValueProps<T> {
  value: T;
  defaultValue: T;
  timeout?: number;
}

export const useDebouncedValue = <T>({
  value,
  defaultValue,
  timeout = 200,
}: DebouncedValueProps<T>) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(defaultValue);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setDebouncedValue(value);
    }, timeout);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [setDebouncedValue, value, timeout]);

  return debouncedValue;
};
