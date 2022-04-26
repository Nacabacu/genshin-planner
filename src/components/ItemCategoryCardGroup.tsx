import { PropsWithoutRef, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { MaterialTypeArray, MaterialTypeConfigObject } from '../../types/data';
import { useDataContext } from '../contexts/dataContext';
import { ResourcesKey, useLocalizationContext } from '../contexts/localizationContext';
import { IconType } from './ImageIcon';
import ItemCard from './ItemCard';

interface ItemCategoryCardGroupProps {
  materialTypeGroup: MaterialTypeConfigObject;
  materialType: MaterialTypeArray;
}

function ItemCategoryCardGroup({ materialTypeGroup, materialType }: PropsWithoutRef<ItemCategoryCardGroupProps>) {
  const { resources } = useLocalizationContext();
  const { selectedMaterial, materialConfig } = useDataContext();

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const renderCard = (itemIdList: string[]) =>
    itemIdList.map((itemId) => {
      const characterIdList = selectedMaterial[materialType][itemId];
      if (!characterIdList || characterIdList.length === 0) return null;

      return <ItemCard key={itemId} itemId={itemId} iconType={IconType.Materials} characterIdList={characterIdList} />;
    });

  const renderGroup = () => {
    const materialConfigItem = materialConfig[materialTypeGroup];

    if (!materialConfigItem || Array.isArray(materialConfigItem)) return null;

    return Object.keys(materialConfigItem).map((key) => (
      <div key={key} className="flex flex-col px-4 pt-4">
        <div className="mb-1 text-xl">{resources[key as ResourcesKey]}</div>
        <div className="grid grid-cols-1 justify-center gap-4 rounded-b-md xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {renderCard(materialConfigItem[key])}
        </div>
      </div>
    ));
  };

  return <div>{renderGroup()}</div>;
}

export default ItemCategoryCardGroup;
