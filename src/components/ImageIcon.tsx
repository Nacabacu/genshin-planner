import { PropsWithoutRef } from 'react';

interface ImageIconProps {
  id: string;
  folder: ImageFolder;
  className?: string;
}

export enum ImageFolder {
  Characters = 'characters',
  Artifacts = 'artifacts',
  Materials = 'materials',
  Weapons = 'weapons',
  Icons = 'icons',
}

function ImageIcon({ id, folder, className }: PropsWithoutRef<ImageIconProps>) {
  return <img loading="lazy" src={`./images/${folder}/${id}.png`} alt={id} className={`max-w-none ${className}`} />;
}

ImageIcon.defaultProps = {
  className: '',
};

export default ImageIcon;
