import { PropsWithoutRef, useState } from 'react';
import { CharacterData } from '../../types/data';
import { useDataContext } from '../contexts/dataContext';
import ImageIcon, { ImageFolder } from './ImageIcon';

interface CharacterDetailProp {
  characterId: string;
}

function CharacterDetail({ characterId }: PropsWithoutRef<CharacterDetailProp>) {
  const { characterList } = useDataContext();
  const [character] = useState<CharacterData>(characterList.find((char) => char.id === characterId) as CharacterData);

  return (
    <div className="flex">
      <ImageIcon id={character.id} folder={ImageFolder.Characters} iconStyle="h-8 w-8" />
      <span className="ml-2 mr-auto leading-8">{character.id}</span>
      <ImageIcon id={character.element} folder={ImageFolder.Icons} iconStyle="h-8 w-8" />
      <ImageIcon id={character.weaponType} folder={ImageFolder.Icons} iconStyle="h-8 w-8" />
    </div>
  );
}

export default CharacterDetail;
