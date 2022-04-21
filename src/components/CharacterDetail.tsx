import { PropsWithoutRef } from 'react';
import { CharacterData } from '../../types/data';
import { LanguageDefinition, useLocalizationContext } from '../contexts/localizationContext';
import ImageIcon, { IconType } from './ImageIcon';

interface CharacterDetailProp {
  data: CharacterData;
  disabled?: boolean;
  className?: string;
}

function CharacterDetail({ data, disabled, className }: PropsWithoutRef<CharacterDetailProp>) {
  const { resources } = useLocalizationContext();
  return (
    <div className={`flex ${disabled ? 'opacity-50' : ''} ${className}`}>
      <ImageIcon id={data.id} type={IconType.Characters} className="h-8" />
      <span className="break-keep ml-2 mr-auto hidden overflow-hidden truncate leading-8 lg:block">
        {resources[data.id as keyof LanguageDefinition]}
      </span>
      <ImageIcon id={data.element} type={IconType.Icons} className="h-8" />
      <ImageIcon id={data.weaponType} type={IconType.Icons} className="h-8" />
    </div>
  );
}

export default CharacterDetail;
