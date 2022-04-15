import _artifact from '@data/artifacts.json';
import _character from '@data/characters.json';
import _domain from '@data/domains.json';
import _materialConfig from '@data/materialConfig.json';
import _material from '@data/materials.json';
import _weapon from '@data/weapons.json';
import { createContext, PropsWithChildren, useContext } from 'react';
import { ArtifactData, CharacterData, DomainData, MaterialConfig, MaterialData, WeaponData } from '../../types/data';

interface Data {
  character: CharacterData[];
  weapon: WeaponData[];
  artifact: ArtifactData[];
  domain: DomainData[];
  material: MaterialData[];
  materialConfig: MaterialConfig;
}

const defaultDataContext: Data = {
  character: _character as CharacterData[],
  weapon: _weapon as WeaponData[],
  artifact: _artifact as ArtifactData[],
  domain: _domain as DomainData[],
  material: _material as MaterialData[],
  materialConfig: _materialConfig as MaterialConfig,
};

const DataContext = createContext<Data>(defaultDataContext);

function DataProvider(props: PropsWithChildren<{}>) {
  const { children } = props;

  return <DataContext.Provider value={defaultDataContext}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext);
export default DataProvider;
