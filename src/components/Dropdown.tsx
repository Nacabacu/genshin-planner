import { ArrowDropDown } from '@mui/icons-material';
import { PropsWithoutRef, ReactNode, useRef, useState } from 'react';
import { useMouseDownOutside } from '../hooks/element';

export interface DropDownProps<T> {
  items: T[];
  onSelect: (selectedValue: T) => void;
  selectedItem: T;
  hideLabel?: boolean;
  getStartAdornment?: (item: T) => ReactNode;
  getItemLabel?: (item: T) => string;
}

function Dropdown<T>({
  items,
  onSelect,
  getStartAdornment,
  selectedItem,
  hideLabel,
  getItemLabel,
}: PropsWithoutRef<DropDownProps<T>>) {
  const [value, setValue] = useState<T>(selectedItem);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useMouseDownOutside(wrapperRef, () => {
    setIsMenuOpened(false);
  });

  const getLabel = (item: T) => {
    if (getItemLabel) return getItemLabel(item);

    if (typeof item === 'string') return item;

    throw Error('If the item is not string there should be getItemLabel provided');
  };

  const getFullLabel = (item: T) => (
    <div className="flex items-center">
      {getStartAdornment && <div className="mr-2 flex h-6 w-6 items-center">{getStartAdornment(item)}</div>}
      {!hideLabel && getLabel(value)}
    </div>
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className="flex w-full rounded bg-gray-700 p-2 pl-4 text-gray-300 hover:bg-gray-600 active:bg-gray-500"
        onClick={() => setIsMenuOpened(!isMenuOpened)}
      >
        {getFullLabel(value)}
        <ArrowDropDown className="ml-auto" />
      </button>
      {isMenuOpened && (
        <div className="absolute right-0 z-10 mt-1 flex w-full flex-col rounded bg-gray-700 py-1 text-gray-300 shadow-xl">
          {items.map((item) => (
            <button
              key={getLabel(item)}
              type="button"
              className={`px-6 py-2  ${
                getLabel(value) === getLabel(item)
                  ? 'bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-400'
                  : 'hover:bg-gray-600 active:bg-gray-500'
              }`}
              onClick={() => {
                setIsMenuOpened(false);

                if (item === value) return;

                setValue(item);
                onSelect(item);
              }}
            >
              {getFullLabel(item)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
