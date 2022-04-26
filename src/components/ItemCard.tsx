import { PropsWithoutRef } from 'react';
import { useDataContext } from '../contexts/dataContext';
import { ResourcesKey, useLocalizationContext } from '../contexts/localizationContext';
import ImageIcon, { IconType } from './ImageIcon';

interface ItemCardProps {
  itemId: string;
  characterIdList: string[];
}

function ItemCard({ itemId, characterIdList }: PropsWithoutRef<ItemCardProps>) {
  const { resources } = useLocalizationContext();
  const { materialList } = useDataContext();

  const navigateWiki = () => {
    const wikiUrl = materialList.find((material) => material.id === itemId)?.url;

    window.open(wikiUrl, '_blank');
  };

  return (
    <div className="rounded-md bg-gray-700 p-1">
      <div className="flex h-10 items-center rounded-md bg-gray-800 p-1">
        <button type="button" onClick={() => navigateWiki()}>
          <ImageIcon id={itemId} type={IconType.Materials} className="mr-2 w-8" disabledTooltip />
        </button>
        <div className="flex-grow truncate">{resources[itemId as ResourcesKey]}</div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 p-2">
        {characterIdList.map((characterId) => (
          <ImageIcon key={characterId} id={characterId} type={IconType.Characters} className="w-8" />
        ))}
      </div>
    </div>
  );
}

export default ItemCard;
