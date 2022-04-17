import { ArrowDropDown } from '@mui/icons-material';
import { PropsWithoutRef, ReactNode, useRef, useState } from 'react';
import { useClickOutside } from '../hooks/element';

export interface DropDownProps<T> {
  items: T[];
  onSelect: (selectedValue: T) => void;
  hideLabel?: boolean;
  getStartAdornment?: (item: T) => ReactNode;
  getItemLabel?: (item: T) => string;
}

function Dropdown<T>({
  items,
  onSelect,
  getStartAdornment,
  hideLabel,
  getItemLabel,
}: PropsWithoutRef<DropDownProps<T>>) {
  const [selectedItem, setSelectedItem] = useState<T>(items[0]);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => {
    setIsMenuOpened(false);
  });

  const getLabel = (item: T) => {
    if (getItemLabel) return getItemLabel(item);

    if (typeof item === 'string') return item;

    throw Error('If the item is not string there should be getItemLabel provided');
  };

  const getFullLabel = (item: T) => (
    <div className="flex items-center">
      {getStartAdornment && <div className="flex h-6 w-6 items-center">{getStartAdornment(item)}</div>}
      {!hideLabel && getLabel(selectedItem)}
    </div>
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className="flex rounded bg-gray-700 p-2 pl-4 text-gray-300 hover:bg-gray-600 active:bg-gray-500"
        onClick={() => setIsMenuOpened(!isMenuOpened)}
      >
        {getFullLabel(selectedItem)}
        <ArrowDropDown className="ml-auto" />
      </button>
      {isMenuOpened && (
        <div className="absolute right-0 mt-1 flex flex-col rounded bg-gray-700 py-1 text-gray-300">
          {items.map((item) => (
            <button
              key={getLabel(item)}
              type="button"
              className="px-6 py-2 hover:bg-gray-600 active:bg-gray-500"
              onClick={() => {
                if (item === selectedItem) return;

                setSelectedItem(item);
                onSelect(item);
                setIsMenuOpened(false);
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
