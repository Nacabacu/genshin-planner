import Flags from 'country-flag-icons/react/3x2';
import { PropsWithoutRef, ReactNode } from 'react';
import { Locale, useLocalizationContext } from '../contexts/localizationContext';
import Dropdown from './Dropdown';

interface FooterProps {
  className?: string;
}

const flagItems: Locale[] = [Locale.English, Locale.Japanese, Locale.Thai];
const flagMap: Partial<Record<Locale, ReactNode>> = {
  [Locale.English]: <Flags.US />,
  [Locale.Japanese]: <Flags.JP />,
  [Locale.Thai]: <Flags.TH />,
};

function Footer({ className }: PropsWithoutRef<FooterProps>) {
  const { locale, setLocale } = useLocalizationContext();

  return (
    <div className={className}>
      <div className="flex h-16 items-center">
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
    </div>
  );
}

export default Footer;
