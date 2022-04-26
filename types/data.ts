export const elements = ['anemo', 'cryo', 'pyro', 'hydro', 'electro', 'geo', 'dendro'] as const;
export const weaponTypes = ['sword', 'bow', 'claymore', 'catalyst', 'polearm'] as const;
export const regions = ['mondstant', 'liyue', 'inazuma'] as const;

export type Rarity = 1 | 2 | 3 | 4 | 5;
export type WeaponType = typeof weaponTypes[number];
export type Element = typeof elements[number];
export type Region = typeof regions[number];
export type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type DomainType = 'artifacts' | 'weapon_ascension_materials' | 'talent_levelup_material';
export type MaterialType =
  | 'boss'
  | 'local'
  | 'weeklyBoss'
  | 'gem'
  | 'book'
  | 'weapon'
  | 'common'
  | 'elite'
  | 'artifact';
export interface Dictionary<T> {
  [key: string]: T;
}

export type Material = {
  [key in MaterialType]?: string | string[];
};

export interface ItemDataBase {
  id: string;
  rarity?: Rarity;
  url?: string;
}

export interface MaterialDataGroup {
  id: string;
  materials: Dictionary<MaterialData>;
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

export type MaterialConfig = MaterialGroupConfig & MaterialDataConfig;

export interface MaterialGroupConfig {
  gem: Dictionary<string[]>;
  book: Dictionary<string[]>;
  weapon: Dictionary<string[]>;
  common: Dictionary<string[]>;
  elite: Dictionary<string[]>;
  weeklyBossGroup: Dictionary<string[]>;
  localGroup: Dictionary<string[]>;
}

export interface MaterialDataConfig {
  boss: string[];
  local: string[];
  weeklyBoss: string[];
}
