import { ArrowDropDown } from '@mui/icons-material';
import { PropsWithoutRef, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useLocalizationContext } from '../contexts/localizationContext';
import { useMouseDownOutside } from '../hooks/useMouseDownOutside';
import { isBodyOverflow } from '../util/element';
import Pill from './Pill';

interface AutosuggestProps<T, Multiple extends boolean | undefined = undefined> {
  items: T[];
  onUpdate: (selectedValue: ValueType<T, Multiple>) => void;
  className?: string;
  placeholder?: string;
  selectedItem?: ValueType<T, Multiple>;
  multiple?: Multiple;
  maxItem?: number;
  disabled?: boolean;
  resetAfterSelect?: boolean;
  getStartAdornment?: (item: T) => ReactNode;
  getItemLabel?: (item: T) => string;
}

type ValueType<T, Multiple> = Multiple extends undefined | false ? T : T[];

const MENU_ITEM_HEIGHT = 40;
const MENU_HEIGHT = 240;

function Autosuggest<T, Multiple extends boolean | undefined = undefined>({
  items,
  onUpdate,
  className,
  placeholder,
  selectedItem,
  multiple,
  maxItem = items.length,
  disabled,
  resetAfterSelect,
  getStartAdornment,
  getItemLabel,
}: PropsWithoutRef<AutosuggestProps<T, Multiple>>) {
  const [value, setValue] = useState<T | T[] | null>((selectedItem as T | T[]) || null);
  const [inputValue, setInputValue] = useState('');
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

  const openMenu = () => {
    setIsMenuOpened(true);
    inputRef.current?.select();
  };

  const closeMenu = (newValue?: T | T[] | null) => {
    setIsMenuOpened(false);
    const currentValue = newValue || value;

    if (currentValue && !Array.isArray(currentValue)) {
      setInputValue(getLabel(currentValue));
    } else {
      setInputValue('');
    }
  };

  useMouseDownOutside(wrapperRef, closeMenu);

  useEffect(() => {
    setValue(selectedItem as T | T[] | null);
  }, [selectedItem]);

  useEffect(() => {
    if (!isMenuOpened || !value || multiple) return;

    const item = Array.isArray(value) ? value[0] : value;
    const selectedElement = popupRef.current?.querySelector(`[data-name="${getLabel(item)}"]`);

    selectedElement?.scrollIntoView({ block: 'nearest' });
  }, [isMenuOpened, value, getLabel, multiple]);

  useEffect(() => {
    if (!Array.isArray(value)) {
      setInputValue(getLabel(value));
    }
  }, [resources, getLabel, value]);

  const renderInputPrefix = () => {
    if (!getStartAdornment || !value) return null;

    if (multiple && Array.isArray(value)) {
      return (
        <div className="mr-2 flex items-center">
          {value.map((item) => (
            <Pill
              key={getLabel(item)}
              label={getLabel(item)}
              hideLabel
              deletable
              disabled={disabled}
              startAdornment={getStartAdornment(item)}
              onDelete={() => {
                const newValue = value.filter((i) => i !== item) as ValueType<T, Multiple>;

                setValue(newValue);
                onUpdate(newValue);
              }}
            />
          ))}
        </div>
      );
    }

    return <div className="mr-2 flex h-6 w-6 items-center">{getStartAdornment(value as T)}</div>;
  };

  const renderInput = () => (
    <>
      {renderInputPrefix()}
      <input
        type="text"
        className={`h-6 w-0 flex-grow overflow-hidden border-none bg-gray-700 p-0 focus:outline-none focus:ring-0 ${
          isHover && !disabled ? 'bg-gray-600' : ''
        }`}
        disabled={disabled}
        value={inputValue}
        onChange={(data) => {
          hasSelected.current = false;
          setInputValue(data.target.value);

          if (!isMenuOpened) openMenu();
        }}
        onFocus={() => {
          if (value) {
            hasSelected.current = true;
          }
        }}
        onClick={() => {
          openMenu();
        }}
        placeholder={placeholder || resources.default_autosuggest_placeholder}
        ref={inputRef}
      />
      <ArrowDropDown
        className={`ml-auto ${disabled ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
        onClick={(event) => {
          if (disabled) return;

          if (isMenuOpened) {
            closeMenu();
          } else {
            openMenu();
          }

          event.stopPropagation();
        }}
      />
    </>
  );

  const renderItems = () => {
    const filteredItems = items.filter(
      (item) => hasSelected.current || getLabel(item).toLowerCase().includes(inputValue.toLocaleLowerCase()),
    );

    if (filteredItems.length > 0) {
      return filteredItems.map((item) => {
        const label = getLabel(item);
        const isSelected = !!(Array.isArray(value)
          ? value.find((i) => getLabel(i) === label)
          : getLabel(value) === label);
        const selectedStyle = isSelected ? 'bg-cyan-600 hover:!bg-cyan-500 active:!bg-cyan-400' : '';
        const isMaxed = !!(multiple && maxItem && Array.isArray(value) && value.length >= maxItem);
        const disabledStyle =
          isMaxed && !isSelected ? 'opacity-50 cursor-default' : 'hover:bg-gray-600 active:bg-gray-500';

        return (
          <button
            key={label}
            type="button"
            disabled={isMaxed && !isSelected}
            data-name={label}
            className={`px-4 py-2 ${disabledStyle} ${selectedStyle}`}
            onClick={() => {
              let newValue: ValueType<T, Multiple>;

              if (Array.isArray(value)) {
                if (value.find((i) => getLabel(i) === getLabel(item))) {
                  newValue = value.filter((i) => getLabel(i) !== getLabel(item)) as ValueType<T, Multiple>;
                } else {
                  newValue = [...value, item] as ValueType<T, Multiple>;
                }
              } else if (multiple) {
                newValue = [item] as ValueType<T, Multiple>;
              } else {
                if (getLabel(item) === getLabel(value)) {
                  closeMenu();
                  return;
                }
                newValue = item as ValueType<T, Multiple>;
              }

              onUpdate(newValue);

              if (resetAfterSelect) {
                setValue(null);
                setInputValue('');
                closeMenu();
              } else {
                setValue(newValue);
                setInputValue(multiple ? '' : getLabel(item));
                closeMenu(newValue);

                if (multiple && (newValue as T[]).length < maxItem) {
                  inputRef.current?.focus();
                }
              }
            }}
          >
            <div className="flex items-center">
              {getStartAdornment && (
                <span className="mr-2 w-6 min-w-[1.5rem] items-center">{getStartAdornment(item)}</span>
              )}
              <span className="overflow-hidden whitespace-nowrap">{getLabel(item)}</span>
            </div>
          </button>
        );
      });
    }
    return (
      <button type="button" className="cursor-default px-4 py-2 text-gray-500">
        <div className="flex items-center">
          <span className="overflow-hidden whitespace-nowrap">{resources.empty_autosuggest_label}</span>
        </div>
      </button>
    );
  };

  const renderMenu = () => {
    if (!wrapperRef.current) return null;

    const menuHeight = Math.min(items.length * MENU_ITEM_HEIGHT, MENU_HEIGHT);
    const isOverflow = isBodyOverflow(wrapperRef.current, menuHeight);

    return (
      <div
        className={`absolute z-10 flex max-h-60 w-full flex-col overflow-scroll rounded bg-gray-700 py-1 text-gray-300 shadow-xl ${
          isOverflow ? 'bottom-11 -mt-1' : 'mt-1'
        }`}
        ref={popupRef}
      >
        {renderItems()}
      </div>
    );
  };

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <div
        className={`inline-flex w-full  rounded bg-gray-700 p-2 pl-4 text-gray-300 ${
          isHover && !disabled ? 'bg-gray-600' : ''
        } ${disabled ? 'cursor-default opacity-50' : 'cursor-text'}`}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        onClick={() => {
          if (disabled) return;

          inputRef.current?.focus();
          openMenu();
        }}
      >
        {renderInput()}
      </div>
      {isMenuOpened && renderMenu()}
    </div>
  );
}

export default Autosuggest;
