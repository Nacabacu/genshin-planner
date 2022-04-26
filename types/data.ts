export const elements = ['anemo', 'cryo', 'pyro', 'hydro', 'electro', 'geo', 'dendro'] as const;
export const weaponTypes = ['sword', 'bow', 'claymore', 'catalyst', 'polearm'] as const;
export const regions = ['mondstant', 'liyue', 'inazuma'] as const;

export type Rarity = 1 | 2 | 3 | 4 | 5;
export type WeaponType = typeof weaponTypes[number];
export type Element = typeof elements[number];
export type Region = typeof regions[number];
export type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type DomainType = 'artifacts' | 'weapon_ascension_materials' | 'talent_levelup_material';

export type MaterialType = MaterialTypeObject | MaterialTypeArray;
export type MaterialTypeObject = 'book' | 'gem' | 'weapon' | 'common' | 'elite' | 'artifact';
export type MaterialTypeConfigObject = MaterialTypeObject | 'weeklyBossGroup' | 'localGroup';
export type MaterialTypeArray = 'boss' | 'local' | 'weeklyBoss';
export type Material = {
  [key in MaterialType]?: string | string[];
};
export type MaterialConfig = MaterialGroupConfig & MaterialDataConfig;
export type MaterialGroupConfig = {
  [key in MaterialTypeConfigObject]?: Record<string, string[]>;
};
export type MaterialDataConfig = {
  [key in MaterialTypeArray]?: string[];
};

export interface ItemDataBase {
  id: string;
  rarity?: Rarity;
  url?: string;
}

export interface MaterialDataGroup {
  id: string;
  materials: Record<string, MaterialData>;
}

export interface MaterialData extends ItemDataBase {}

export interface ArtifactData extends ItemDataBase {}

export interface CharacterData extends ItemDataBase {
  element: Element;
  weaponType: WeaponType;
  ascendMaterial: Material;
  talentMaterial: Material;
}
export interface WeaponData extends ItemDataBase {
  type: WeaponType;
  ascendMaterial: Material;
}

export interface DomainData extends ItemDataBase {
  region: Region;
  type: DomainType;
  reward: string[];
  daysofweek?: Day[];
}
