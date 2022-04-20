import _artifact from '@data/artifacts.json';
import _character from '@data/characters.json';
import _domain from '@data/domains.json';
import _materialConfig from '@data/materialConfig.json';
import _material from '@data/materials.json';
import _weapon from '@data/weapons.json';
import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { ArtifactData, CharacterData, DomainData, MaterialConfig, MaterialData, WeaponData } from '../../types/data';
import useLocalStorage from '../hooks/useLocalStorage';

const SELECTED_DATA_LIST_KEY = 'selectedDataList';

export interface SelectedData {
  isEnabled: boolean;
  isAscensionEnabled: boolean;
  isTalentEnabled: boolean;
  isWeaponEnabled: boolean;
  isArtifactEnabled: boolean;
  characterData: CharacterData;
  weaponData?: WeaponData;
  artifactDataList?: ArtifactData[];
}

interface Data {
  characterList: CharacterData[];
  weaponList: WeaponData[];
  artifactList: ArtifactData[];
  domainList: DomainData[];
  materialList: MaterialData[];
  materialConfig: MaterialConfig;
  selectedDataList: SelectedData[];
  addCharacter: (characterData: CharacterData) => void;
  removeCharacter: (characterId: string) => void;
  updateSelectedData: (characterId: string, updatedData: Partial<SelectedData>) => void;
}

const DataContext = createContext<Data | null>(null);
const defaultSelectedDataList: SelectedData[] = [
  {
    isEnabled: true,
    isAscensionEnabled: true,
    isTalentEnabled: true,
    isWeaponEnabled: true,
    isArtifactEnabled: true,
    characterData: _character[0] as CharacterData,
  },
];

function DataProvider({ children }: PropsWithChildren<{}>) {
  const [selectedDataList, setSelectedDataList] = useLocalStorage<SelectedData[]>(
    SELECTED_DATA_LIST_KEY,
    defaultSelectedDataList,
  );

  const addCharacter = useCallback(
    (characterData: CharacterData) => {
      const newSelectedData: SelectedData = {
        isEnabled: true,
        isAscensionEnabled: true,
        isTalentEnabled: true,
        isWeaponEnabled: true,
        isArtifactEnabled: true,
        characterData,
      };
      setSelectedDataList([...selectedDataList, newSelectedData]);
    },
    [selectedDataList, setSelectedDataList],
  );

  const removeCharacter = useCallback(
    (characterId: string) => {
      setSelectedDataList([
        ...selectedDataList.filter((selectedData) => selectedData.characterData.id !== characterId),
      ]);
    },
    [selectedDataList, setSelectedDataList],
  );

  const updateSelectedData = useCallback(
    (characterId: string, updatedData: Partial<SelectedData>) => {
      const newSelectedDataList = [...selectedDataList];
      const selectedIndex = newSelectedDataList.findIndex(
        (selectedData) => selectedData.characterData.id === characterId,
      );

      if (selectedIndex < 0) return;

      newSelectedDataList[selectedIndex] = {
        ...newSelectedDataList[selectedIndex],
        ...updatedData,
      };

      setSelectedDataList(newSelectedDataList);
    },
    [selectedDataList, setSelectedDataList],
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
      removeCharacter,
      updateSelectedData,
    }),
    [selectedDataList, addCharacter, removeCharacter, updateSelectedData],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext) as Data;
export default DataProvider;
