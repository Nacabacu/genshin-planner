import { PropsWithoutRef, useMemo } from 'react';
import { FaFire, FaGithub } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useLocalizationContext } from '../contexts/localizationContext';

interface Navigation {
  path: string;
  name: string;
}

interface NavbarProps {
  className?: string;
}

const githubURL = 'https://github.com/Nacabacu/genshin-planner';

function Navbar({ className }: PropsWithoutRef<NavbarProps>) {
  const { pathname } = useLocation();
  const { resources } = useLocalizationContext();
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
        <FaFire className="!h-8 !w-8 text-cyan-600" />
        <span className="ml-4 flex h-full">{navItem}</span>
        <span className="ml-auto">
          <a href={githubURL} target="tab" className="flex items-center hover:text-gray-200">
            <FaGithub className="h-6 w-6" />
          </a>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
