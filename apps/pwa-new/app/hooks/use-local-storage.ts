import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
  id: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") return initialValue;
    const item = window.localStorage.getItem(id);
    return item ? (JSON.parse(item) as T) : initialValue;
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue, id]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    if (typeof window === "undefined") return initialValue;
    const newValue = value instanceof Function ? value(storedValue) : value;

    setStoredValue(newValue);
    window.localStorage.setItem(id, JSON.stringify(newValue));
  };

  useEffect(() => {
    setStoredValue(readValue());
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setValue];
}
