import { ReactNode } from 'react';
import { Locale, useLocalizationContext } from '../contexts/localizationContext';
import Dropdown from './Dropdown';
import ImageIcon, { IconType } from './ImageIcon';

// TODO: Fix bug flag is not shown in iOS
const flagItems: Locale[] = [Locale.English, Locale.Japanese, Locale.Thai];
const flagMap: Partial<Record<Locale, ReactNode>> = {
  [Locale.English]: <ImageIcon id="us" type={IconType.Icons} />,
  [Locale.Japanese]: <ImageIcon id="jp" type={IconType.Icons} />,
  [Locale.Thai]: <ImageIcon id="th" type={IconType.Icons} />,
};

function Footer() {
  const { locale, setLocale } = useLocalizationContext();

  return (
    <div className="flex h-16 max-w-9xl flex-grow items-center">
      <div className="mb-2 flex h-full items-end overflow-hidden text-xs">
        This project is not affiliated with HoYoVerse. <br /> Genshin Impact, all materials are trademarks and
        copyrights of HoYoVerse.
      </div>
      <Dropdown
        items={flagItems}
        hideLabel
        selectedItem={flagItems.find((item) => item === locale) || flagItems[0]}
        getStartAdornment={(item) => flagMap[item]}
        onSelect={(item) => {
          setLocale(item);
        }}
        className="ml-auto"
      />
    </div>
  );
}

export default Footer;
