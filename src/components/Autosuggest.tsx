import { ArrowDropDown } from '@mui/icons-material';
import { PropsWithoutRef, ReactNode, useRef, useState } from 'react';
import { useLocalizationContext } from '../contexts/localizationContext';
import { useClickOutside } from '../hooks/element';

interface AutosuggestProps<T> {
  items: T[];
  onSelect: (selectedValue: T) => void;
  className?: string;
  defaultItem?: T;
  getStartAdornment?: (item: T) => ReactNode;
  getItemLabel?: (item: T) => string;
}

function Autosuggest<T>({
  items,
  onSelect,
  className,
  getStartAdornment,
  getItemLabel,
}: PropsWithoutRef<AutosuggestProps<T>>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { resources } = useLocalizationContext();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => {
    setIsMenuOpened(false);
  });

  const getLabel = (item: T | null) => {
    if (!item) return '';
    if (getItemLabel) return getItemLabel(item);

    if (typeof item === 'string') return item;

    throw Error('If the item is not string there should be getItemLabel provided');
  };

  const getFullLabel = (item: T | null) => {
    if (!item) return <div>{resources.default_autosuggest_label}</div>;

    return (
      <div className="flex items-center">
        {getStartAdornment && <div className="mr-2 flex h-6 w-6 items-center">{getStartAdornment(item)}</div>}
        {getLabel(item)}
      </div>
    );
  };

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <button
        type="button"
        className="flex w-full rounded bg-gray-700 p-2 pl-4 text-gray-300 hover:bg-gray-600 active:bg-gray-500"
        onClick={() => setIsMenuOpened(!isMenuOpened)}
      >
        {getFullLabel(selectedItem)}
        <ArrowDropDown className="ml-auto" />
      </button>
      {isMenuOpened && (
        <div className="absolute mt-1 flex max-h-60 w-full flex-col overflow-scroll rounded bg-gray-700 py-1 text-gray-300">
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

export default Autosuggest;
