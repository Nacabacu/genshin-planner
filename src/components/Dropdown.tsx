import { ArrowDropDown } from '@mui/icons-material';
import { PropsWithoutRef, useRef, useState } from 'react';
import { useClickOutside } from '../hooks/element';

export interface DropdownItem<T> {
  item: T;
  value: string;
}

export interface DropDownProps<T> {
  items: DropdownItem<T>[];
  onSelect: (selectedValue: string) => void;
}

function Dropdown<T extends JSX.Element | string>({ items, onSelect }: PropsWithoutRef<DropDownProps<T>>) {
  const [selectedItem, setSelectedItem] = useState<DropdownItem<T>>(items[0]);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => {
    setIsMenuOpened(false);
  });

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className="inline-flex items-center rounded bg-gray-600 p-2 text-gray-300 hover:bg-gray-700 active:bg-gray-800"
        onClick={() => setIsMenuOpened(!isMenuOpened)}
      >
        {selectedItem.item}
        <ArrowDropDown className="ml-auto" />
      </button>
      {isMenuOpened && (
        <div className="absolute right-0 mt-1 flex flex-col rounded bg-gray-600 py-1 text-gray-300">
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              className="px-6 py-2 hover:bg-gray-700 active:bg-gray-800"
              onClick={() => {
                if (item.value === selectedItem.value) return;

                setSelectedItem(item);
                onSelect(item.value);
                setIsMenuOpened(false);
              }}
            >
              {item.item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
