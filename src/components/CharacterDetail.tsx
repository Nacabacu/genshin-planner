import { PropsWithoutRef } from 'react';
import { CharacterData } from '../../types/data';
import { ResourcesKey, useLocalizationContext } from '../contexts/localizationContext';
import ImageIcon, { IconType } from './ImageIcon';

interface CharacterDetailProp {
  data: CharacterData;
  disabled?: boolean;
}

function CharacterDetail({ data, disabled }: PropsWithoutRef<CharacterDetailProp>) {
  const { resources } = useLocalizationContext();
  return (
    <div className={`flex ${disabled ? 'opacity-50' : ''} flex-grow`}>
      <ImageIcon id={data.id} type={IconType.Characters} disabledTooltip className="h-8" />
      <span className="break-keep ml-2 overflow-hidden truncate leading-8">{resources[data.id as ResourcesKey]}</span>
      <ImageIcon id={data.element} type={IconType.Icons} className="ml-auto h-8" />
      <ImageIcon id={data.weaponType} type={IconType.Icons} className="h-8" />
    </div>
  );
}

export default CharacterDetail;
