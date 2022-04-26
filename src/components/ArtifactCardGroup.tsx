import { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { regions } from '../../types/data';
import { useDataContext } from '../contexts/dataContext';
import { ResourcesKey, useLocalizationContext } from '../contexts/localizationContext';
import { IconType } from './ImageIcon';
import ItemCard from './ItemCard';

function ArtifactCardGroup() {
  const { resources } = useLocalizationContext();
  const { domainList, selectedArtifactMap } = useDataContext();

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const renderArtifact = (artifactMap: Record<string, string[]>) =>
    Object.keys(artifactMap).map((artifactId) => (
      <ItemCard
        key={artifactId}
        itemId={artifactId}
        iconType={IconType.Artifacts}
        characterIdList={artifactMap[artifactId]}
      />
    ));

  const renderDomain = () =>
    regions.map((region) =>
      domainList.map((domain) => {
        const { id, type, region: domainRegion } = domain;

        if (type !== 'artifacts' || region !== domainRegion || !selectedArtifactMap[id]) return null;

        return (
          <div key={id} className="flex flex-col px-4 pt-4">
            <div className="mb-1 text-xl">
              {resources[id as ResourcesKey]} ({resources[domainRegion]})
            </div>
            <div className="grid grid-cols-1 justify-center gap-4 rounded-b-md xsm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {renderArtifact(selectedArtifactMap[id])}
            </div>
          </div>
        );
      }),
    );

  return <div>{renderDomain()}</div>;
}

export default ArtifactCardGroup;
