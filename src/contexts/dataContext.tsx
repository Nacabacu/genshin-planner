import _artifact from '@data/artifacts.json';
import _character from '@data/characters.json';
import _domain from '@data/domains.json';
import _materialConfig from '@data/materialConfig.json';
import _material from '@data/materials.json';
import _weapon from '@data/weapons.json';
import { createContext, PropsWithChildren, useContext } from 'react';
import { ArtifactData, CharacterData, DomainData, MaterialConfig, MaterialData, WeaponData } from '../../types/data';

interface Data {
  characterList: CharacterData[];
  weaponList: WeaponData[];
  artifactList: ArtifactData[];
  domainList: DomainData[];
  materialList: MaterialData[];
  materialConfig: MaterialConfig;
}

const defaultDataContext: Data = {
  characterList: _character as CharacterData[],
  weaponList: _weapon as WeaponData[],
  artifactList: _artifact as ArtifactData[],
  domainList: _domain as DomainData[],
  materialList: _material as MaterialData[],
  materialConfig: _materialConfig as MaterialConfig,
};

const DataContext = createContext<Data>(defaultDataContext);

function DataProvider(props: PropsWithChildren<{}>) {
  const { children } = props;

  return <DataContext.Provider value={defaultDataContext}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext);
export default DataProvider;
