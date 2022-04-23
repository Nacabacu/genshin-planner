import { PropsWithoutRef, useEffect, useState } from 'react';

interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

function Switch({ checked, disabled, onChange }: PropsWithoutRef<SwitchProps>) {
  const [isChecked, setIsChecked] = useState(!!checked);

  useEffect(() => {
    setIsChecked(!!checked);
  }, [checked]);

  return (
    <span
      onClick={() => {
        if (disabled) return;

        setIsChecked(!isChecked);
        onChange(!isChecked);
      }}
      className={`relative m-2 flex h-6 w-12 flex-shrink-0 items-center rounded-full transition-all duration-200
      ${isChecked ? 'bg-green-500' : 'bg-gray-500'}
      ${disabled ? 'cursor-default opacity-50' : 'cursor-pointer'}`}
    >
      <input className="h-0 w-0 opacity-0" type="checkbox" defaultChecked={isChecked} />
      <span
        className={`absolute h-5 w-5 rounded-full bg-white transition-transform duration-200 ${
          isChecked ? 'translate-x-6.5' : 'translate-x-0.5'
        }`}
      />
    </span>
  );
}

export default Switch;
