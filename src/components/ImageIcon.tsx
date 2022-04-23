import { PropsWithoutRef } from 'react';

interface ImageIconProps {
  id: string;
  type: IconType;
  className?: string;
  disabledTooltip?: boolean;
}

export enum IconType {
  Characters = 'characters',
  Artifacts = 'artifacts',
  Materials = 'materials',
  Weapons = 'weapons',
  Icons = 'icons',
}

function ImageIcon({ id, type, className, disabledTooltip }: PropsWithoutRef<ImageIconProps>) {
  return (
    <img
      loading="lazy"
      src={`./images/${type}/${id}.png`}
      data-tip={disabledTooltip ? null : id}
      alt={id}
      className={className}
    />
  );
}

ImageIcon.defaultProps = {
  className: '',
};

export default ImageIcon;
