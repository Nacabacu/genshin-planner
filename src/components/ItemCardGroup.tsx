import { PropsWithoutRef, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { MaterialType } from '../../types/data';
import { useDataContext } from '../contexts/dataContext';
import { IconType } from './ImageIcon';
import ItemCard from './ItemCard';

interface ItemCardGroupProps {
  materialTypeList: MaterialType[];
}

function ItemCardGroup({ materialTypeList }: PropsWithoutRef<ItemCardGroupProps>) {
  const { materialConfig, selectedMaterial } = useDataContext();

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const renderItemCard = () =>
    materialTypeList.map((key) => {
      const materialConfigItem = materialConfig[key];

      if (!materialConfigItem) return null;

      if (Array.isArray(materialConfigItem)) {
        return materialConfigItem.map((itemId) => {
          const characterIdList = selectedMaterial[key][itemId];
          if (!characterIdList || characterIdList.length === 0) return null;

          return (
            <ItemCard key={itemId} itemId={itemId} iconType={IconType.Materials} characterIdList={characterIdList} />
          );
        });
      }

      return Object.keys(materialConfigItem).map((configItemKey) => {
        const characterIdList = selectedMaterial[key][configItemKey];
        const materialData = materialConfigItem[configItemKey];

        if (!characterIdList || characterIdList.length === 0) return null;

        return (
          <ItemCard
            key={configItemKey}
            itemId={materialData[materialData.length - 1]}
            iconType={IconType.Materials}
            characterIdList={characterIdList}
          />
        );
      });
    });

  return (
    <div className="grid grid-cols-1 justify-center gap-4 rounded-b-md px-4 pt-4 xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {renderItemCard()}
    </div>
  );
}

export default ItemCardGroup;
