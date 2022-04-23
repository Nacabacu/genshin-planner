import CancelIcon from '@mui/icons-material/Cancel';
import { PropsWithoutRef, ReactNode, useState } from 'react';

interface PillProps {
  label: string;
  hideLabel?: boolean;
  tooltip?: boolean;
  deletable?: boolean;
  disabled?: boolean;
  onDelete?: () => void;
  startAdornment?: ReactNode;
}

function Pill({
  label,
  hideLabel,
  tooltip,
  deletable,
  disabled,
  onDelete,
  startAdornment,
}: PropsWithoutRef<PillProps>) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`inline-flex h-6 items-center rounded-full bg-gray-500 px-1 ${
        disabled ? 'cursor-default' : 'cursor-pointer'
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span className="mr-1 !h-5 !w-5">{startAdornment}</span>
      <span hidden={hideLabel} className="select-none overflow-hidden whitespace-nowrap text-sm">
        {label}
      </span>
      <div className={`absolute top-9 w-fit rounded bg-gray-500 px-2 ${isHover && tooltip ? 'block' : 'hidden'}`}>
        {label}
      </div>
      <CancelIcon
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
