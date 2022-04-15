import _artifact from '@public/data/artifact.json';
import _character from '@public/data/character.json';
import _domain from '@public/data/domain.json';
import _material from '@public/data/material.json';
import _materialConfig from '@public/data/materialConfig.json';
import _weapon from '@public/data/weapon.json';
import { createContext, PropsWithChildren, useContext } from 'react';
import {
  ArtifactData,
  CharacterData,
  Dictionary,
  DomainData,
  MaterialConfig,
  MaterialData,
  WeaponData,
} from '../../types/data';

interface Data {
  character: Dictionary<CharacterData>;
  weapon: Dictionary<WeaponData>;
  artifact: Dictionary<ArtifactData>;
  domain: Dictionary<DomainData>;
  material: Dictionary<MaterialData>;
  materialConfig: MaterialConfig;
}

const defaultDataContext: Data = {
  character: _character as Dictionary<CharacterData>,
  weapon: _weapon as Dictionary<WeaponData>,
  artifact: _artifact as Dictionary<ArtifactData>,
  domain: _domain as Dictionary<DomainData>,
  material: _material as Dictionary<MaterialData>,
  materialConfig: _materialConfig as MaterialConfig,
};

const DataContext = createContext<Data>(defaultDataContext);

function DataProvider(props: PropsWithChildren<{}>) {
  const { children } = props;

  return <DataContext.Provider value={defaultDataContext}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext);
export default DataProvider;
