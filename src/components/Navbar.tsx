import { GitHub, LocalFireDepartment } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

interface Navigation {
  path: string;
  name: string;
}

const repoName = 'https://github.com/Nacabacu/genshin-planner';
const navigationList: Navigation[] = [
  {
    path: `${import.meta.env.VITE_BASE}/`,
    name: 'Plan',
  },
  {
    path: `${import.meta.env.VITE_BASE}/result`,
    name: 'Result',
  },
];

function Navbar() {
  const { pathname } = useLocation();
  const navItem = navigationList.map((navigation) => (
    <Link
      to={navigation.path}
      key={navigation.name}
      className={`flex items-center px-4 text-gray-300 ${
        pathname === navigation.path ? 'cursor-default bg-gray-600' : 'hover:bg-gray-700 hover:text-gray-200'
      }`}
    >
      <span>{navigation.name}</span>
    </Link>
  ));

  return (
    <nav className="flex h-16 items-center bg-gray-900 px-2 sm:px-8 md:px-16 lg:px-32 xl:px-48">
      <LocalFireDepartment className="h-8 w-8 text-red-600" />
      <span className="ml-4 flex h-full">{navItem}</span>
      <a href={repoName} target="tab" className="ml-auto h-8 w-8 text-gray-300 hover:text-gray-200">
        <GitHub />
      </a>
    </nav>
  );
}

export default Navbar;
