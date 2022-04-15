import { GitHub, LocalFireDepartment } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface Navigation {
  path: string;
  name: string;
}

const repoName = 'https://github.com/Nacabacu/genshin-planner';
const navigationList: Navigation[] = [
  {
    path: '/',
    name: 'Plan',
  },
  {
    path: '/result',
    name: 'Result',
  },
];

function Navbar() {
  const navItem = navigationList.map((navigation) => (
    <Link
      className="py-2 font-semibold uppercase tracking-wide text-gray-400 transition-colors hover:text-gray-300 sm:py-0 sm:pt-0"
      to={navigation.path}
      key={navigation.name}
    >
      {navigation.name}
    </Link>
  ));

  return (
    <nav className="text-zinc400 flex flex-wrap items-center bg-gray-900 px-4 py-4 sm:px-60">
      <LocalFireDepartment className="h-7 w-7 text-red-600" />
      <div className="ml-2 space-x-2">{navItem}</div>
      <a href={repoName} target="tab" className="ml-auto h-7 w-7 text-gray-400 hover:text-gray-300">
        <GitHub />
      </a>
    </nav>
  );
}

export default Navbar;
