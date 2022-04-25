import { PropsWithoutRef, ReactNode } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

interface PillProps {
  label: string;
  hideLabel?: boolean;
  deletable?: boolean;
  disabled?: boolean;
  onDelete?: () => void;
  startAdornment?: ReactNode;
}

function Pill({ label, hideLabel, deletable, disabled, onDelete, startAdornment }: PropsWithoutRef<PillProps>) {
  return (
    <div
      className={`inline-flex h-6 items-center rounded-full bg-gray-500 px-1 ${
        disabled ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      <span className="mr-1 !h-5 !w-5">{startAdornment}</span>
      <span hidden={hideLabel} className="select-none overflow-hidden whitespace-nowrap text-sm">
        {label}
      </span>
      <IoCloseCircle
        className={`!w-4 ${deletable ? 'block' : '!hidden'} ${disabled ? '' : 'hover:text-gray-400'}`}
        onClick={() => {
          if (disabled) return;
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
