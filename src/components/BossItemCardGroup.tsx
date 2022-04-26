import { useDataContext } from '../contexts/dataContext';
import ItemCard from './ItemCard';

function BossItemCardGroup() {
  const { materialConfig, selectedMaterial } = useDataContext();

  const renderGemCard = () =>
    Object.keys(materialConfig.gem).map((key) => {
      const characterIdList = selectedMaterial.gem[key];
      const materialData = materialConfig.gem[key];

      if (!characterIdList || characterIdList.length === 0) return null;

      return <ItemCard key={key} itemId={materialData[3]} characterIdList={characterIdList} />;
    });

  const renderBossCard = () =>
    materialConfig.boss.map((itemId) => {
      const characterIdList = selectedMaterial.boss[itemId];
      if (!characterIdList || characterIdList.length === 0) return null;

      return <ItemCard key={itemId} itemId={itemId} characterIdList={characterIdList} />;
    });

  return (
    <div className="grid grid-cols-1 justify-center gap-4 rounded-b-md px-4 pt-4 xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {renderGemCard()}
      {renderBossCard()}
    </div>
  );
}

export default BossItemCardGroup;
