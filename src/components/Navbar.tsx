import { FaFire, FaGithub } from 'react-icons/fa';

const githubURL = 'https://github.com/Nacabacu/genshin-planner';

function Navbar() {
  return (
    <div className="flex h-16 max-w-9xl flex-grow items-center">
      <FaFire className="!h-8 !w-8 text-cyan-600" />
      <span className="ml-auto">
        <a href={githubURL} target="tab" className="flex items-center hover:text-gray-200">
          <FaGithub className="h-6 w-6" />
        </a>
      </span>
    </div>
  );
}

export default Navbar;
