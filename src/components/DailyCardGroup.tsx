import { PropsWithoutRef, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { Day, DomainType, regions } from '../../types/data';
import { DomainMap, useDataContext } from '../contexts/dataContext';
import { ResourcesKey, useLocalizationContext } from '../contexts/localizationContext';
import DayIcon from './DayIcon';
import { IconType } from './ImageIcon';
import ItemCard from './ItemCard';

interface DailyCardGroupProps {
  domainMap: DomainMap;
  domainType: DomainType;
  materialConfig: Record<string, string[]>;
}

function DailyCardGroup({ domainMap, domainType, materialConfig }: PropsWithoutRef<DailyCardGroupProps>) {
  const { resources } = useLocalizationContext();
  const { domainList } = useDataContext();

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const renderCard = (cardMap: Record<string, string[]>) =>
    Object.keys(cardMap).map((materialGroupId) => {
      if (!materialConfig) return null;
      const materialGroup = materialConfig[materialGroupId];
      const materialId = materialGroup[materialGroup.length - 1];

      return (
        <ItemCard
          key={materialId}
          itemId={materialId}
          iconType={IconType.Materials}
          characterIdList={cardMap[materialGroupId]}
        />
      );
    });

  const renderDays = (daysofweek: Day[] | undefined) => {
    if (!daysofweek) return null;

    return daysofweek.map((day) => <DayIcon day={day} />);
  };

  const renderDay = () =>
    // TODO: Optimize this
    regions.map((region) =>
      domainList.map((domain) => {
        const { id, type, daysofweek, region: domainRegion } = domain;

        if (type !== domainType || region !== domainRegion || !domainMap[id]) return null;

        return (
          <div key={id} className="flex flex-col">
            <div className="mb-1 flex items-center gap-1 text-xl">
              <span className="truncate">{resources[id as ResourcesKey]}</span>
              <span>({resources[domainRegion]})</span>
              <span className="ml-auto flex items-center gap-2">{renderDays(daysofweek)}</span>
            </div>
            <div>{renderCard(domainMap[id])}</div>
          </div>
        );
      }),
    );

  return (
    <div className="grid grid-cols-1 justify-center gap-4 rounded-b-md px-4 pt-4 md:grid-cols-2 xl:grid-cols-3">
      {renderDay()}
    </div>
  );
}

export default DailyCardGroup;
