import _artifact from '@data/artifacts.json';
import _character from '@data/characters.json';
import _domain from '@data/domains.json';
import _materialConfig from '@data/materialConfig.json';
import _material from '@data/materials.json';
import _weapon from '@data/weapons.json';
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useRef, useState } from 'react';
import {
  ArtifactData,
  CharacterData,
  DomainData,
  Material,
  MaterialConfig,
  MaterialData,
  MaterialType,
  WeaponData,
} from '../../types/data';
import useLocalStorage, { getLocalStorage } from '../hooks/useLocalStorage';
import { deepClone } from '../util/object';

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

export type SelectedMaterial = {
  [key in MaterialType]: Record<string, string[]>;
};

interface Data {
  characterList: CharacterData[];
  weaponList: WeaponData[];
  artifactList: ArtifactData[];
  domainList: DomainData[];
  materialList: MaterialData[];
  materialConfig: MaterialConfig;
  selectedDataList: SelectedData[];
  selectedMaterial: SelectedMaterial;
  onAddCharacter: number;
  addCharacter: (characterData: CharacterData) => void;
  removeCharacter: (characterId: string) => void;
  updateSelectedDataList: (characterId: string, updatedData: Partial<SelectedData>) => void;
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

function parseArtifactDataList(artifactDataList: ArtifactData[]): Material {
  const material: Material = {};

  material.artifact = artifactDataList.map((artifactData) => artifactData.id);

  return material;
}

function addMaterial(selectedMaterial: SelectedMaterial, materialObject: Material, id: string): SelectedMaterial {
  const newSelectedMaterial = deepClone(selectedMaterial);

  (Object.keys(materialObject) as MaterialType[]).forEach((key) => {
    const value = materialObject[key];

    if (!value) return;

    const materialIds = Array.isArray(value) ? value : [value];

    materialIds.forEach((matId) => {
      if (!newSelectedMaterial[key][matId]) {
        newSelectedMaterial[key][matId] = [];
      }

      if (newSelectedMaterial[key][matId].includes(id)) return;

      newSelectedMaterial[key][matId].push(id);
    });
  });

  return newSelectedMaterial;
}

function addSelectedMaterial(selectedMaterial: SelectedMaterial, selectedData: SelectedData): SelectedMaterial {
  if (!selectedData.isEnabled) return selectedMaterial;

  let newSelectedMaterial = deepClone(selectedMaterial);
  const {
    characterData: { id, ascendMaterial, talentMaterial },
    weaponData,
    artifactDataList,
    isAscensionEnabled,
    isTalentEnabled,
    isWeaponEnabled,
    isArtifactEnabled,
  } = selectedData;

  if (isAscensionEnabled) {
    newSelectedMaterial = addMaterial(newSelectedMaterial, ascendMaterial, id);
  }
  if (isTalentEnabled) {
    newSelectedMaterial = addMaterial(newSelectedMaterial, talentMaterial, id);
  }
  if (isWeaponEnabled && weaponData) {
    const { ascendMaterial: weaponMaterial } = weaponData;

    newSelectedMaterial = addMaterial(newSelectedMaterial, weaponMaterial, id);
  }
  if (isArtifactEnabled && artifactDataList) {
    newSelectedMaterial = addMaterial(newSelectedMaterial, parseArtifactDataList(artifactDataList), id);
  }

  return newSelectedMaterial;
}

function removeSelectedMaterial(selectedMaterial: SelectedMaterial, characterId: string): SelectedMaterial {
  const newSelectedMaterial = deepClone(selectedMaterial);

  (Object.keys(newSelectedMaterial) as MaterialType[]).forEach((key) => {
    const materialType = newSelectedMaterial[key];

    Object.keys(materialType).forEach((materialId) => {
      const characterIdList = materialType[materialId];

      materialType[materialId] = characterIdList.filter((charId) => charId !== characterId);
    });
  });

  return newSelectedMaterial;
}

// TODO: Refactor this to be the real update
function updateSelectedMaterial(selectedMaterial: SelectedMaterial, selectedData: SelectedData): SelectedMaterial {
  let newSelectedMaterial = deepClone(selectedMaterial);

  newSelectedMaterial = removeSelectedMaterial(newSelectedMaterial, selectedData.characterData.id);
  newSelectedMaterial = addSelectedMaterial(newSelectedMaterial, selectedData);

  return newSelectedMaterial;
}

function getInitialSelectedMaterial() {
  const selectedDataList = getLocalStorage(SELECTED_DATA_LIST_KEY, defaultSelectedDataList) as SelectedData[];
  let selectedMaterial: SelectedMaterial = {
    boss: {},
    local: {},
    weeklyBoss: {},
    gem: {},
    book: {},
    weapon: {},
    common: {},
    elite: {},
    artifact: {},
  };

  selectedDataList.forEach((selectedData) => {
    selectedMaterial = addSelectedMaterial(selectedMaterial, selectedData);
  });

  return selectedMaterial;
}

function DataProvider({ children }: PropsWithChildren<{}>) {
  const [selectedDataList, setSelectedDataList] = useLocalStorage<SelectedData[]>(
    SELECTED_DATA_LIST_KEY,
    defaultSelectedDataList,
  );
  const [selectedMaterial, setSelectedMaterial] = useState<SelectedMaterial>(getInitialSelectedMaterial);
  // TODO: find a better way to handle when character is added
  const onAddCharacter = useRef(0);

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

      setSelectedMaterial((currentValue) => addSelectedMaterial(currentValue, newSelectedData));
      setSelectedDataList((currentValue) => [...currentValue, newSelectedData]);
      onAddCharacter.current += 1;
    },
    [setSelectedDataList],
  );

  const removeCharacter = useCallback(
    (characterId: string) => {
      setSelectedMaterial((currentValue) => removeSelectedMaterial(currentValue, characterId));
      setSelectedDataList((currentValue) => [
        ...currentValue.filter((selectedData) => selectedData.characterData.id !== characterId),
      ]);
    },
    [setSelectedDataList],
  );

  const updateSelectedDataList = useCallback(
    (characterId: string, updatedData: Partial<SelectedData>) => {
      setSelectedDataList((currentValue) => {
        const newSelectedDataList = [...currentValue];
        const selectedIndex = newSelectedDataList.findIndex(
          (selectedData) => selectedData.characterData.id === characterId,
        );

        if (selectedIndex < 0) return currentValue;

        newSelectedDataList[selectedIndex] = {
          ...newSelectedDataList[selectedIndex],
          ...updatedData,
        };

        setSelectedMaterial((currentSelectedMaterial) =>
          updateSelectedMaterial(currentSelectedMaterial, newSelectedDataList[selectedIndex]),
        );

        return newSelectedDataList;
      });
    },
    [setSelectedDataList],
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
      selectedMaterial,
      onAddCharacter: onAddCharacter.current,
      addCharacter,
      removeCharacter,
      updateSelectedDataList,
    }),
    [selectedDataList, selectedMaterial, addCharacter, removeCharacter, updateSelectedDataList, onAddCharacter],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext) as Data;
export default DataProvider;
