import { PropsWithoutRef, useState } from 'react';

interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

function Switch({ checked, disabled, onChange }: PropsWithoutRef<SwitchProps>) {
  const [isChecked, setIsChecked] = useState(!!checked);

  return (
    <span
      onClick={() => {
        if (disabled) return;

        setIsChecked(!isChecked);
        onChange(!isChecked);
      }}
      className={`relative m-2 inline-block h-6 w-12 rounded-full transition-all
      ${isChecked ? 'bg-green-500' : 'bg-gray-500'}
      ${disabled ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
    >
      <input className="h-0 w-0 opacity-0" type="checkbox" defaultChecked={isChecked} />
      <span
        className={`absolute h-6 w-6 rounded-full bg-white transition-transform ${isChecked ? 'translate-x-6' : ''}`}
      />
    </span>
  );
}

export default Switch;
