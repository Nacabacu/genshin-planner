import { ArrowDropDown } from '@mui/icons-material';
import { PropsWithoutRef, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useLocalizationContext } from '../contexts/localizationContext';
import { useMouseDownOutside } from '../hooks/element';

interface AutosuggestProps<T, Multiple extends boolean | undefined = undefined> {
  items: T[];
  onSelect: (selectedValue: ValueType<T, Multiple>) => void;
  className?: string;
  placeholder?: string;
  defaultItem?: ValueType<T, Multiple>;
  multiple?: Multiple;
  resetAfterSelect?: boolean;
  getStartAdornment?: (item: T) => ReactNode;
  getItemLabel?: (item: T) => string;
}

type ValueType<T, Multiple> = Multiple extends undefined | false ? T : T[];

function Autosuggest<T, Multiple extends boolean | undefined = undefined>({
  items,
  onSelect,
  className,
  placeholder,
  multiple,
  resetAfterSelect,
  getStartAdornment,
  getItemLabel,
}: PropsWithoutRef<AutosuggestProps<T, Multiple>>) {
  const [value, setValue] = useState<ValueType<T, Multiple> | null>(null);
  const [filterString, setFilterString] = useState('');
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const { resources } = useLocalizationContext();
  const hasSelected = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const getLabel = useCallback(
    (item: T | null) => {
      if (!item) return '';

      if (getItemLabel) return getItemLabel(item);

      if (typeof item === 'string') return item;

      throw Error('If the item is not string there should be getItemLabel provided');
    },
    [getItemLabel],
  );
  const getSelectedItem = useCallback(() => {
    if (!value) return null;
    if (multiple) return value as T[];

    return value as T;
  }, [value, multiple]);

  useMouseDownOutside(wrapperRef, () => {
    setIsMenuOpened(false);
  });

  useEffect(() => {
    const selectedItem = getSelectedItem();

    if (isMenuOpened) {
      const item = Array.isArray(selectedItem) ? selectedItem[0] : selectedItem;
      const selectedElement = popupRef.current?.querySelector(`[data-name="${getLabel(item)}"]`);

      selectedElement?.scrollIntoView();
    } else if (value && !multiple) {
      setFilterString(getLabel(value as T));
    } else {
      setFilterString('');
    }
  }, [isMenuOpened, getLabel, value, setFilterString, getSelectedItem, multiple]);

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
        {getStartAdornment && !multiple && value && (
          <div className="mr-4 flex h-6 w-6 items-center">{getStartAdornment(value as T)}</div>
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
        <div
          className="absolute z-10 mt-1 flex max-h-60 w-full flex-col overflow-scroll rounded bg-gray-700 py-1 text-gray-300 shadow-xl"
          ref={popupRef}
        >
          {items
            .filter(
              (item) => hasSelected.current || getLabel(item).toLowerCase().includes(filterString.toLocaleLowerCase()),
            )
            .map((item) => {
              const label = getLabel(item);
              const selectedItem = getSelectedItem();
              const isSelected = Array.isArray(selectedItem)
                ? selectedItem.find((i) => getLabel(i) === label)
                : getLabel(selectedItem) === label;

              return (
                <button
                  key={label}
                  type="button"
                  data-name={label}
                  className={`active:bg-gray-500" px-4 py-2 hover:bg-gray-600 ${
                    isSelected ? 'bg-cyan-600 hover:bg-cyan-500' : ''
                  }`}
                  onClick={() => {
                    setIsMenuOpened(false);
                    hasSelected.current = true;

                    let newValue: ValueType<T, Multiple>;

                    if (Array.isArray(selectedItem)) {
                      if (selectedItem.includes(item)) return;
                      newValue = [...selectedItem, item] as ValueType<T, Multiple>;
                    } else if (multiple) {
                      newValue = [item] as ValueType<T, Multiple>;
                    } else {
                      if (item === (selectedItem as T)) return;
                      newValue = item as ValueType<T, Multiple>;
                    }

                    setValue(resetAfterSelect ? null : newValue);
                    setFilterString(multiple || resetAfterSelect ? '' : getLabel(item));
                    onSelect(newValue);
                  }}
                >
                  <div className="flex items-center">
                    {getStartAdornment && (
                      <span className="mr-4 flex h-6 w-6 items-center">{getStartAdornment(item)}</span>
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
