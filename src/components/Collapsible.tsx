import { PropsWithChildren, useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

interface CollapsibleProps {
  label: string;
  onChange?: (isExpanded: boolean) => void;
  expanded?: boolean;
  icon?: JSX.Element;
}

function Collapsible({ children, onChange, expanded, label, icon }: PropsWithChildren<CollapsibleProps>) {
  const [isExpand, setIsExpand] = useState(expanded);

  useEffect(() => {
    if (expanded === undefined) return;

    setIsExpand(expanded);
  }, [expanded]);

  const renderIcon = () => {
    if (!icon) return null;
    return <div className="mr-2 w-8">{icon}</div>;
  };

  return (
    <div className="w-full">
      <div
        className="flex cursor-pointer select-none items-center rounded-md bg-gray-700 py-2 px-4"
        onClick={() => {
          if (onChange) {
            onChange(!isExpand);
          } else {
            setIsExpand(!isExpand);
          }
        }}
      >
        {icon && renderIcon()}
        <div className="flex-grow text-xl">{label}</div>
        {isExpand ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </div>
      {isExpand && children}
    </div>
  );
}

Collapsible.defaultProps = {
  onChange: false,
  expanded: false,
  icon: null,
};

export default Collapsible;
