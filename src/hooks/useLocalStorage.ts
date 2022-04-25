import { Dispatch, SetStateAction, useState } from 'react';

const KEY_PREFIX = 'genshin-planner-';

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(suffix: string, initialValue: T): [T, SetValue<T>] {
  const key = `${KEY_PREFIX}${suffix}`;
  const [value, setValue] = useState<T>(getLocalStorage(suffix, initialValue) as T);

  const setLocalStorageValue = (func: SetStateAction<T>) => {
    const newValue = func instanceof Function ? func(value) : func;
    const dataString = typeof newValue === 'string' ? newValue : JSON.stringify(newValue);

    localStorage.setItem(key, dataString);
    setValue(newValue);
  };

  return [value, setLocalStorageValue];
}

export function getLocalStorage<T>(suffix: string, initialValue: T): T | string {
  const key = `${KEY_PREFIX}${suffix}`;
  const dataString = localStorage.getItem(key);

  if (!dataString) return initialValue;

  try {
    return JSON.parse(dataString);
  } catch {
    return dataString === 'undefined' ? initialValue : dataString;
  }
}

export default useLocalStorage;
