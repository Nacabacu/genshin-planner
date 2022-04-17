import { GitHub } from '@mui/icons-material';
import { PropsWithoutRef } from 'react';

const repoName = 'https://github.com/Nacabacu/genshin-planner';
interface FooterProps {
  className?: string;
}

function Footer({ className }: PropsWithoutRef<FooterProps>) {
  return (
    <div className={className}>
      <div className="flex h-12 items-center">
        <a href={repoName} target="tab" className="ml-auto flex h-8 w-8 items-center hover:text-gray-200">
          <GitHub />
        </a>
      </div>
    </div>
  );
}

export default Footer;
