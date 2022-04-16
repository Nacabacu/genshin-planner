import { PropsWithoutRef } from 'react';
import { CharacterData } from '../../types/data';
import ImageIcon, { ImageFolder } from './ImageIcon';

interface CharacterDetailProp {
  data: CharacterData;
  disabled?: boolean;
}

function CharacterDetail({ data, disabled }: PropsWithoutRef<CharacterDetailProp>) {
  return (
    <div className={`flex ${disabled ? 'opacity-50' : ''}`}>
      <ImageIcon id={data.id} folder={ImageFolder.Characters} iconStyle="h-8 w-8" />
      <span className="ml-2 mr-auto leading-8">{data.id}</span>
      <ImageIcon id={data.element} folder={ImageFolder.Icons} iconStyle="h-8 w-8" />
      <ImageIcon id={data.weaponType} folder={ImageFolder.Icons} iconStyle="h-8 w-8" />
    </div>
  );
}

CharacterDetail.defaultProps = {
  disabled: false,
};

export default CharacterDetail;
