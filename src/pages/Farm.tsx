import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import ArtifactCardGroup from '../components/ArtifactCardGroup';
import Collapsible from '../components/Collapsible';
import DailyCardGroup from '../components/DailyCardGroup';
import ImageIcon, { IconType } from '../components/ImageIcon';
import ItemCardGroup from '../components/ItemCardGroup';
import ItemCategoryCardGroup from '../components/ItemCategoryCardGroup';
import { useDataContext } from '../contexts/dataContext';
import { useLocalizationContext } from '../contexts/localizationContext';

interface CollapisbleConfig {
  label: string;
  icon: JSX.Element;
  content: JSX.Element;
}

function Farm() {
  const { resources } = useLocalizationContext();
  const { materialConfig, selectedWeaponAscendMap, selectedTalentAscendMap } = useDataContext();
  const collapsibleConfigs: CollapisbleConfig[] = useMemo(
    () => [
      {
        label: resources.monster_drop,
        icon: <ImageIcon id="divining_scroll" type={IconType.Materials} />,
        content: <ItemCardGroup materialTypeList={['common', 'elite']} />,
      },
      {
        label: resources.boss_drop,
        icon: <ImageIcon id="shivada_jade_gemstone" type={IconType.Materials} />,
        content: <ItemCardGroup materialTypeList={['gem', 'boss']} />,
      },
      {
        label: resources.weekly_boss,
        icon: <ImageIcon id="tail_of_boreas" type={IconType.Materials} />,
        content: <ItemCategoryCardGroup materialTypeGroup="weeklyBossGroup" materialType="weeklyBoss" />,
      },
      {
        label: resources.local_specialty,
        icon: <ImageIcon id="philanemo_mushroom" type={IconType.Materials} />,
        content: <ItemCategoryCardGroup materialTypeGroup="localGroup" materialType="local" />,
      },
      {
        label: resources.artifact,
        icon: <ImageIcon id="adventurer" type={IconType.Artifacts} />,
        content: <ArtifactCardGroup />,
      },
      {
        label: resources.weapon_ascension,
        icon: <ImageIcon id="dream_of_the_dandelion_gladiator" type={IconType.Materials} />,
        content: (
          <DailyCardGroup
            domainMap={selectedWeaponAscendMap}
            domainType="weapon_ascension_materials"
            materialConfig={materialConfig.weapon as Record<string, string[]>}
          />
        ),
      },
      {
        label: resources.talent_ascension,
        icon: <ImageIcon id="philosophies_of_transience" type={IconType.Materials} />,
        content: (
          <DailyCardGroup
            domainMap={selectedTalentAscendMap}
            domainType="talent_levelup_material"
            materialConfig={materialConfig.book as Record<string, string[]>}
          />
        ),
      },
    ],
    [resources, selectedWeaponAscendMap, selectedTalentAscendMap, materialConfig],
  );
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean[]>(() => [...collapsibleConfigs.map(() => false)]);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const renderExpandAllButton = useCallback(() => {
    const isExapandedAll = isMenuExpanded.every((value) => value);

    return (
      <button
        type="button"
        onClick={() => {
          setIsMenuExpanded([...collapsibleConfigs.map(() => !isExapandedAll)]);
        }}
        className="ml-auto cursor-pointer hover:underline"
      >
        {isExapandedAll ? resources.collapse_all : resources.expand_all}
      </button>
    );
  }, [resources, collapsibleConfigs, isMenuExpanded]);

  return (
    <div className="my-6 flex max-w-9xl flex-grow flex-col items-center gap-6">
      {renderExpandAllButton()}
      {collapsibleConfigs.map((config, index) => (
        <Collapsible
          key={config.label}
          label={config.label}
          icon={config.icon}
          expanded={isMenuExpanded[index]}
          onChange={(isExpanded) => {
            setIsMenuExpanded((currentValue) => {
              const newValue = [...currentValue];

              newValue[index] = isExpanded;

              return newValue;
            });
          }}
        >
          {config.content}
        </Collapsible>
      ))}
    </div>
  );
}

export default Farm;
