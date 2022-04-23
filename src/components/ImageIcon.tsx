import { PropsWithoutRef } from 'react';

interface ImageIconProps {
  id: string;
  type: IconType;
  className?: string;
}

export enum IconType {
  Characters = 'characters',
  Artifacts = 'artifacts',
  Materials = 'materials',
  Weapons = 'weapons',
  Icons = 'icons',
}

function ImageIcon({ id, type, className }: PropsWithoutRef<ImageIconProps>) {
  return (
    <img loading="lazy" src={`./images/${type}/${id}.png`} alt={id} className={`pointer-events-none ${className}`} />
  );
}

ImageIcon.defaultProps = {
  className: '',
};

export default ImageIcon;
