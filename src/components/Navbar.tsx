import { LocalFireDepartment } from '@mui/icons-material';
import Flags from 'country-flag-icons/react/3x2';
import { PropsWithoutRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Locale, useLocalizationContext } from '../contexts/localizationContext';
import Dropdown, { DropdownItem } from './Dropdown';

interface Navigation {
  path: string;
  name: string;
}

interface NavbarProps {
  className?: string;
}

const flagItems: DropdownItem<JSX.Element>[] = [
  {
    item: (
      <span className="flex h-6 w-6 items-center">
        <Flags.US />
      </span>
    ),
    value: Locale.English,
  },
  {
    item: (
      <span className="flex h-6 w-6 items-center">
        <Flags.JP />
      </span>
    ),
    value: Locale.Japanese,
  },
  {
    item: (
      <span className="flex h-6 w-6 items-center">
        <Flags.TH />
      </span>
    ),
    value: Locale.Thai,
  },
];

function Navbar({ className }: PropsWithoutRef<NavbarProps>) {
  const { pathname } = useLocation();
  const { resources, setLocale } = useLocalizationContext();
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
      className={`flex items-center px-4 ${
        pathname === navigation.path ? 'cursor-default bg-gray-800' : 'hover:bg-gray-700 hover:text-gray-200'
      }`}
    >
      <span>{navigation.name}</span>
    </Link>
  ));

  return (
    <nav className={className}>
      <div className="flex h-16 items-center ">
        <LocalFireDepartment className="!h-8 !w-8 text-red-600" />
        <span className="ml-4 flex h-full">{navItem}</span>
        <span className="ml-auto">
          <Dropdown
            items={flagItems}
            onSelect={(value) => {
              setLocale(value as Locale);
            }}
          />
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
