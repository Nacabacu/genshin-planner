import { useEffect, useState } from 'react';
import { DomainData, regions } from '../../types/data';
import { SelectedData, useDataContext } from '../contexts/dataContext';
import { ResourcesKey, useLocalizationContext } from '../contexts/localizationContext';
import { IconType } from './ImageIcon';
import ItemCard from './ItemCard';

type SelectedArtifactMapType = Record<string, Record<string, string[]>>;

function getSelectedArtifactMap(selectedDataList: SelectedData[], domainList: DomainData[]): SelectedArtifactMapType {
  const selectedArtifactMap: SelectedArtifactMapType = {};

  selectedDataList.forEach((selectedData) => {
    const {
      characterData: { id: characterId },
      artifactDataList,
    } = selectedData;

    if (!artifactDataList) return;

    artifactDataList.forEach((artifactData) => {
      const { id: artifactId } = artifactData;
      const domainDrop = domainList.find((domain) => domain.reward.includes(artifactId));

      if (!domainDrop) return;

      const { id: domainId } = domainDrop;

      if (!selectedArtifactMap[domainId]) {
        selectedArtifactMap[domainId] = {};
      }

      if (!selectedArtifactMap[domainId][artifactId]) {
        selectedArtifactMap[domainId][artifactId] = [];
      }

      selectedArtifactMap[domainId][artifactId].push(characterId);
    });
  });

  return selectedArtifactMap;
}

function ArtifactCardGroup() {
  const { resources } = useLocalizationContext();
  const { domainList, selectedDataList } = useDataContext();
  const [selectedArtifactMap, setSelectedArtifactMap] = useState<SelectedArtifactMapType>(() =>
    getSelectedArtifactMap(selectedDataList, domainList),
  );

  useEffect(() => {
    setSelectedArtifactMap(getSelectedArtifactMap(selectedDataList, domainList));
  }, [selectedDataList, domainList]);

  const renderArtifact = (artifactMap: Record<string, string[]>) =>
    Object.keys(artifactMap).map((artifactId) => {
      const characterIdList = artifactMap[artifactId];

      return (
        <ItemCard
          key={artifactId}
          itemId={artifactId}
          iconType={IconType.Artifacts}
          characterIdList={characterIdList}
        />
      );
    });

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
