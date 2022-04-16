import { PropsWithChildren } from 'react';

interface ImageIconProps {
  id: string;
  folder: ImageFolder;
  iconStyle?: string;
}

export enum ImageFolder {
  Characters = 'characters',
  Artifacts = 'artifacts',
  Materials = 'materials',
  Weapons = 'weapons',
  Icons = 'icons',
}

function ImageIcon({ id, folder, iconStyle }: PropsWithChildren<ImageIconProps>) {
  return <img loading="lazy" src={`./images/${folder}/${id}.png`} alt={id} className={`${iconStyle}`} />;
}

ImageIcon.defaultProps = {
  iconStyle: '',
};

export default ImageIcon;
