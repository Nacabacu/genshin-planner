import { useState } from 'react';

const KEY_PREFIX = 'genshin-planner-';

function useLocalStorage<T>(suffix: string, initialValue: T): [T, (newValue: T) => void] {
  const key = `${KEY_PREFIX}${suffix}`;
  const [value, setValue] = useState<T>(() => {
    const dataString = localStorage.getItem(key);

    if (!dataString) return initialValue;

    try {
      return JSON.parse(dataString);
    } catch {
      return dataString === 'undefined' ? initialValue : dataString;
    }
  });

  const setLocalStorageValue = (newValue: T) => {
    const dataString = typeof newValue === 'string' ? newValue : JSON.stringify(newValue);

    localStorage.setItem(key, dataString);
    setValue(newValue);
  };

  return [value, setLocalStorageValue];
}

export default useLocalStorage;
