import { LocalFireDepartment } from '@mui/icons-material';
import Flags from 'country-flag-icons/react/3x2';
import { PropsWithoutRef, ReactNode, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Locale, useLocalizationContext } from '../contexts/localizationContext';
import Dropdown from './Dropdown';

interface Navigation {
  path: string;
  name: string;
}

interface NavbarProps {
  className?: string;
}

const flagItems: Locale[] = [Locale.English, Locale.Japanese, Locale.Thai];
const flagMap: Partial<Record<Locale, ReactNode>> = {
  [Locale.English]: <Flags.US />,
  [Locale.Japanese]: <Flags.JP />,
  [Locale.Thai]: <Flags.TH />,
};

function Navbar({ className }: PropsWithoutRef<NavbarProps>) {
  const { pathname } = useLocation();
  const { locale, resources, setLocale } = useLocalizationContext();
  const navigationList: Navigation[] = useMemo(
    () => [
      {
        path: `${import.meta.env.VITE_BASE}/`,
        name: resources.plan,
      },
      {
        path: `${import.meta.env.VITE_BASE}/result`,
        name: resources.result,
      },
    ],
    [resources],
  );

  const navItem = navigationList.map((navigation) => (
    <Link
      to={navigation.path}
      key={navigation.name}
      className={`flex items-center px-4 capitalize ${
        pathname === navigation.path ? 'cursor-default bg-gray-800' : 'hover:bg-gray-700 hover:text-gray-200'
      }`}
    >
      <span>{navigation.name}</span>
    </Link>
  ));

  return (
    <nav className={className}>
      <div className="flex h-16 items-center">
        <LocalFireDepartment className="!h-8 !w-8 text-cyan-600" />
        <span className="ml-4 flex h-full">{navItem}</span>
        <span className="ml-auto">
          <Dropdown
            items={flagItems}
            hideLabel
            defaultItem={flagItems.find((item) => item === locale) || flagItems[0]}
            getStartAdornment={(item) => flagMap[item]}
            onSelect={(item) => {
              setLocale(item);
            }}
          />
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
