import _artifact from '@data/artifacts.json';
import _character from '@data/characters.json';
import _domain from '@data/domains.json';
import _materialConfig from '@data/materialConfig.json';
import _material from '@data/materials.json';
import _weapon from '@data/weapons.json';
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { ArtifactData, CharacterData, DomainData, MaterialConfig, MaterialData, WeaponData } from '../../types/data';

interface Data {
  characterList: CharacterData[];
  weaponList: WeaponData[];
  artifactList: ArtifactData[];
  domainList: DomainData[];
  materialList: MaterialData[];
  materialConfig: MaterialConfig;
  selectedDataList: SelectedData[];
  addCharacter: (characterData: CharacterData) => void;
  updateSelectedData: (characterId: string, updatedData: Partial<SelectedData>) => void;
}

export interface SelectedData {
  isEnabled: boolean;
  isAscendEnabled: boolean;
  isTalentEnabled: boolean;
  isWeaponEnabled: boolean;
  isArtifactEnabled: boolean;
  characterId: string;
  weaponId?: string;
  artifactIdList?: string[];
}

const DataContext = createContext<Data | null>(null);

function DataProvider(props: PropsWithChildren<{}>) {
  const { children } = props;
  const [selectedDataList, setSelectedDataList] = useState<SelectedData[]>([]);

  const addCharacter = useCallback(
    (characterData: CharacterData) => {
      const newSelectedData: SelectedData = {
        isEnabled: true,
        isAscendEnabled: false,
        isTalentEnabled: false,
        isWeaponEnabled: false,
        isArtifactEnabled: false,
        characterId: characterData.id,
      };
      setSelectedDataList([...selectedDataList, newSelectedData]);
    },
    [selectedDataList],
  );
  const updateSelectedData = useCallback(
    (characterId: string, updatedData: Partial<SelectedData>) => {
      let oldData = selectedDataList.find((selectedData) => selectedData.characterId === characterId);

      if (!oldData) return;

      oldData = {
        ...oldData,
        ...updatedData,
      };

      setSelectedDataList(selectedDataList);
    },
    [selectedDataList],
  );

  const value = useMemo(
    () => ({
      characterList: _character as CharacterData[],
      weaponList: _weapon as WeaponData[],
      artifactList: _artifact as ArtifactData[],
      domainList: _domain as DomainData[],
      materialList: _material as MaterialData[],
      materialConfig: _materialConfig as MaterialConfig,
      selectedDataList,
      addCharacter,
      updateSelectedData,
    }),
    [selectedDataList, addCharacter, updateSelectedData],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext) as Data;
export default DataProvider;
