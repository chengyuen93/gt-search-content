import { useCallback, useEffect, useRef, useState } from 'react';

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

  const handleClearTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      handleClearTimeout();
      setDebouncedValue(value);
    }, timeout);

    return () => {
      handleClearTimeout();
    };
  }, [setDebouncedValue, value, timeout, handleClearTimeout]);

  return debouncedValue;
};
