import { useDataContext } from '../contexts/dataContext';
import ItemCard from './ItemCard';

function MonsterItemCardGroup() {
  const { materialConfig, selectedMaterial } = useDataContext();

  const renderCard = () => {
    const selectedMaterialCommon = Object.assign(selectedMaterial.common, selectedMaterial.elite);

    return Object.keys(selectedMaterialCommon).map((key) => {
      const characterIdList = selectedMaterialCommon[key];
      const materialData = materialConfig.common[key] || materialConfig.elite[key];

      if (!characterIdList || characterIdList.length === 0) return null;

      return <ItemCard key={key} itemId={materialData[0]} characterIdList={characterIdList} />;
    });
  };

  return (
    <div className="grid grid-cols-1 justify-center gap-4 rounded-b-md px-4 pt-4 xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {renderCard()}
    </div>
  );
}

export default MonsterItemCardGroup;
