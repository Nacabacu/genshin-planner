import { ArrowDropDown } from '@mui/icons-material';
import { PropsWithoutRef, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useLocalizationContext } from '../contexts/localizationContext';
import { useMouseDownOutside } from '../hooks/element';

interface AutosuggestProps<T> {
  items: T[];
  onSelect: (selectedValue: T) => void;
  className?: string;
  placeholder?: string;
  defaultItem?: T;
  resetAfterSelect?: boolean;
  getStartAdornment?: (item: T) => ReactNode;
  getItemLabel?: (item: T) => string;
}

function Autosuggest<T>({
  items,
  onSelect,
  className,
  placeholder,
  resetAfterSelect,
  getStartAdornment,
  getItemLabel,
}: PropsWithoutRef<AutosuggestProps<T>>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [filterString, setFilterString] = useState('');
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const { resources } = useLocalizationContext();
  const hasSelected = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const getLabel = useCallback(
    (item: T | null) => {
      if (!item) return '';
      if (getItemLabel) return getItemLabel(item);

      if (typeof item === 'string') return item;

      throw Error('If the item is not string there should be getItemLabel provided');
    },
    [getItemLabel],
  );

  useMouseDownOutside(wrapperRef, () => {
    setIsMenuOpened(false);
  });

  useEffect(() => {
    if (isMenuOpened) return;

    if (selectedItem) {
      setFilterString(getLabel(selectedItem));
    } else {
      setFilterString('');
    }
  }, [isMenuOpened, getLabel, selectedItem, setFilterString]);

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <div
        className={`inline-flex w-full cursor-text rounded bg-gray-700 p-2 pl-4 text-gray-300 ${
          isHover ? 'bg-gray-600' : ''
        }`}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        onClick={() => inputRef.current?.focus()}
      >
        {getStartAdornment && selectedItem && (
          <div className="mr-2 flex h-6 w-6 items-center">{getStartAdornment(selectedItem)}</div>
        )}
        <input
          type="text"
          className={`h-6 w-0 flex-grow overflow-hidden border-none bg-gray-700 p-0 hover:bg-gray-600 focus:outline-none focus:ring-0 ${
            isHover ? 'bg-gray-600' : ''
          }`}
          value={filterString}
          onChange={(data) => {
            hasSelected.current = false;
            setFilterString(data.target.value);
          }}
          onFocus={(event) => {
            setIsMenuOpened(true);
            event.target.select();
          }}
          placeholder={placeholder || resources.default_autosuggest_label}
          ref={inputRef}
        />
        <ArrowDropDown
          className="ml-auto cursor-pointer hover:text-gray-200"
          onClick={(event) => {
            if (isMenuOpened) {
              setIsMenuOpened(false);
            } else {
              inputRef.current?.focus();
            }

            event.stopPropagation();
          }}
        />
      </div>
      {isMenuOpened && (
        <div className="absolute z-10 mt-1 flex max-h-60 w-full flex-col overflow-scroll rounded bg-gray-700 py-1 text-gray-300 shadow-xl">
          {items
            .filter(
              (item) => hasSelected.current || getLabel(item).toLowerCase().includes(filterString.toLocaleLowerCase()),
            )
            .map((item) => {
              const label = getLabel(item);
              return (
                <button
                  key={label}
                  type="button"
                  className={`active:bg-gray-500" px-6 py-2 hover:bg-gray-600 ${
                    getLabel(selectedItem) === label ? 'bg-cyan-600 hover:bg-cyan-500' : ''
                  }`}
                  onClick={() => {
                    setIsMenuOpened(false);
                    hasSelected.current = true;

                    if (item === selectedItem) return;

                    setSelectedItem(resetAfterSelect ? null : item);
                    setFilterString(getLabel(item));
                    onSelect(item);
                  }}
                >
                  <div className="flex items-center">
                    {getStartAdornment && (
                      <span className="mr-2 flex h-6 w-6 items-center">{getStartAdornment(item)}</span>
                    )}
                    <span className="overflow-hidden whitespace-nowrap">{getLabel(item)}</span>
                  </div>
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Autosuggest;
