import { FireIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

interface Navigation {
  path: string;
  label: string;
}

const navigationList: Navigation[] = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/result',
    label: 'Result',
  },
];

function Navbar() {
  const navItem = navigationList.map((navigation) => (
    <Link className="font-semibold uppercase transition-colors hover:text-zinc-300" to={navigation.path}>
      {navigation.label}
    </Link>
  ));

  return (
    <nav className="flex h-16 flex-nowrap items-center bg-zinc-900 px-8 text-zinc-400">
      <div className="inline-flex min-w-fit cursor-default">
        <FireIcon className="h-7 w-7 text-red-600" />
        <span className="hover:text-zinc-300e pl-2 text-xl font-semibold uppercase tracking-wide">Planner</span>
      </div>
      <div className="space-x-2 pl-4">{navItem}</div>
    </nav>
  );
}

export default Navbar;
