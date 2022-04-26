import { useDataContext } from '../contexts/dataContext';
import { ResourcesKey, useLocalizationContext } from '../contexts/localizationContext';
import ItemCard from './ItemCard';

const weeklyBossGroup: Record<string, string[]> = {
  dvalin: ['dvalins_plume', 'dvalins_claw', 'dvalins_sigh'],
  andrius: ['tail_of_boreas', 'ring_of_boreas', 'spirit_locket_of_boreas'],
  childe: ['tusk_of_monoceros_caeli', 'shard_of_a_foul_legacy', 'shadow_of_the_warrior'],
  azhdaha: ['dragon_lords_crown', 'bloodjade_branch', 'gilded_scale'],
  la_signora: ['molten_moment', 'hellfire_butterfly', 'ashen_heart'],
  mikoto: ['mudra_of_the_malefic_general', 'tears_of_the_calamitous_god', 'the_meaning_of_aeons'],
};

function WeeklyBossCardGroup() {
  const { resources } = useLocalizationContext();
  const { selectedMaterial } = useDataContext();

  const renderCard = (itemIdList: string[]) =>
    itemIdList.map((itemId) => {
      const characterIdList = selectedMaterial.weeklyBoss[itemId];
      if (!characterIdList || characterIdList.length === 0) return null;

      return <ItemCard key={itemId} itemId={itemId} characterIdList={characterIdList} />;
    });

  const renderGroup = () =>
    Object.keys(weeklyBossGroup).map((key) => (
      <div className="flex flex-col px-4 pt-4">
        <div className="mb-1 text-xl">{resources[key as ResourcesKey]}</div>
        <div className="grid grid-cols-1 justify-center gap-4 rounded-b-md xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {renderCard(weeklyBossGroup[key])}
        </div>
      </div>
    ));

  return <div>{renderGroup()}</div>;
}

export default WeeklyBossCardGroup;
