import CancelIcon from '@mui/icons-material/Cancel';
import { PropsWithoutRef, ReactNode } from 'react';

interface PillProps {
  label?: string;
  deletable?: boolean;
  onDelete?: () => void;
  startAdornment?: ReactNode;
}

function Pill({ label, deletable, onDelete, startAdornment }: PropsWithoutRef<PillProps>) {
  return (
    <div className="inline-flex h-6 cursor-pointer items-center rounded-full bg-gray-500 px-1">
      <span className="mr-1 !h-5 !w-5">{startAdornment}</span>
      <span hidden={!label} className=" select-none overflow-hidden whitespace-nowrap text-sm">
        {label}
      </span>
      <CancelIcon
        className={`!w-4 hover:text-gray-400 ${deletable ? 'block' : '!hidden'}`}
        onClick={() => {
          if (!onDelete) {
            throw Error('onDelete should be provided if the pill is deletable');
          }

          onDelete();
        }}
      />
    </div>
  );
}

export default Pill;
