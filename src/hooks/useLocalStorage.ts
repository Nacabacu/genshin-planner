import { useState } from 'react';

function useLocalStorage<T extends object>(key: string, initialValue: T): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const dataString = localStorage.getItem(key);

    if (!dataString) return initialValue;

    return JSON.parse(dataString) as T;
  });

  const setLocalStorageValue = (newValue: T) => {
    const dataString = JSON.stringify(newValue);

    localStorage.setItem(key, dataString);
    setValue(newValue);
  };

  return [value, setLocalStorageValue];
}

export default useLocalStorage;
