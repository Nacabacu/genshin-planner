import { useCallback, useMemo, useState } from 'react';
import Collapsible from '../components/Collapsible';
import ImageIcon, { IconType } from '../components/ImageIcon';
import { useLocalizationContext } from '../contexts/localizationContext';

interface CollapisbleConfig {
  label: string;
  icon: JSX.Element;
  content: JSX.Element;
}

function Result() {
  const { resources } = useLocalizationContext();
  const collapsibleConfigs: CollapisbleConfig[] = useMemo(
    () => [
      {
        label: resources.monster_drop,
        icon: <ImageIcon id="divining_scroll" type={IconType.Materials} />,
        content: <div>test</div>,
      },
      {
        label: resources.boss_drop,
        icon: <ImageIcon id="shivada_jade_gemstone" type={IconType.Materials} />,
        content: <div>test</div>,
      },
      {
        label: resources.weekly_boss,
        icon: <ImageIcon id="tail_of_boreas" type={IconType.Materials} />,
        content: <div>test</div>,
      },
      {
        label: resources.local_specialty,
        icon: <ImageIcon id="philanemo_mushroom" type={IconType.Materials} />,
        content: <div>test</div>,
      },
      {
        label: resources.artifact,
        icon: <ImageIcon id="adventurer" type={IconType.Artifacts} />,
        content: <div>test</div>,
      },
      {
        label: resources.weapon_ascension,
        icon: <ImageIcon id="dream_of_the_dandelion_gladiator" type={IconType.Materials} />,
        content: <div>test</div>,
      },
      {
        label: resources.talent_ascension,
        icon: <ImageIcon id="philosophies_of_transience" type={IconType.Materials} />,
        content: <div>test</div>,
      },
    ],
    [resources],
  );
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean[]>(() => [...collapsibleConfigs.map(() => false)]);

  const renderExpandAllButton = useCallback(() => {
    const isExapandedAll = isMenuExpanded.every((value) => value);

    return (
      <div
        className="ml-auto cursor-pointer hover:underline"
        onClick={() => {
          setIsMenuExpanded([...collapsibleConfigs.map(() => !isExapandedAll)]);
        }}
      >
        {isExapandedAll ? resources.collapse_all : resources.expand_all}
      </div>
    );
  }, [resources, collapsibleConfigs, isMenuExpanded]);

  return (
    <div className="mt-6 flex max-w-9xl flex-grow flex-col items-center gap-6">
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

export default Result;
