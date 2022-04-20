import { PropsWithoutRef } from 'react';
import { CharacterData } from '../../types/data';
import ImageIcon, { IconType } from './ImageIcon';

interface CharacterDetailProp {
  data: CharacterData;
  disabled?: boolean;
  className?: string;
}

function CharacterDetail({ data, disabled, className }: PropsWithoutRef<CharacterDetailProp>) {
  return (
    <div className={`flex ${disabled ? 'opacity-50' : ''} ${className}`}>
      <ImageIcon id={data.id} type={IconType.Characters} className="h-8" />
      <span className="ml-2 mr-auto leading-8">{data.id}</span>
      <ImageIcon id={data.element} type={IconType.Icons} className="h-8" />
      <ImageIcon id={data.weaponType} type={IconType.Icons} className="h-8" />
    </div>
  );
}

export default CharacterDetail;
