export enum Rarity {
  OneStar = 1,
  TwoStar = 2,
  ThreeStar = 3,
  FourStar = 4,
  FiveStar = 5,
}

export enum Element {
  Pyro = 'pyro',
  Hydro = 'hydro',
  Electro = 'electro',
  Dendro = 'dendro',
  Cryo = 'cryo',
  Geo = 'geo',
}

export enum Region {
  mondstadt = 'mondstadt',
  liyue = 'liyue',
  Inazuma = 'inazuma',
}

export enum DayInWeek {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
  All = 'all',
}

export interface ItemData {
  id: string;
  rarity: Rarity;
}

// #region Material

export type CommonMaterialType = keyof CommonMaterial;
export type EliteMaterialType = keyof EliteMaterial;
export type WeaponAscensionMaterialType = keyof WeaponAscensionMaterial;
export type GemMaterialType = keyof GemMaterial;
export type BossMaterialType = keyof BossMaterial;
export type LocalMaterialType = keyof LocalMaterial;
export type TalentMaterialType = keyof TalentMaterial;

export interface MaterialData {
  materialList: ItemData[];
  region: Region;
  dropData: DropableData;
}

export interface CommonMaterial {
  horn: MaterialData;
  layLine: MaterialData;
  chaos: MaterialData;
  mist: MaterialData;
  knife: MaterialData;
  bone: MaterialData;
  sentinelChaos: MaterialData;
  prism: MaterialData;
  claw: MaterialData;
  statuette: MaterialData;
}

export interface EliteMaterial {
  slime: MaterialData;
  mask: MaterialData;
  scroll: MaterialData;
  arrowHead: MaterialData;
  fatuiInsignia: MaterialData;
  hoarderInsignia: MaterialData;
  nectar: MaterialData;
  handguard: MaterialData;
  spectral: MaterialData;
  spore: MaterialData;
}

export interface WeaponAscensionMaterial {
  decarabian: MaterialData;
  borealWolf: MaterialData;
  dandelionGladiator: MaterialData;
  guyun: MaterialData;
  elixir: MaterialData;
  aerosiderite: MaterialData;
  distantSea: MaterialData;
  narukami: MaterialData;
  mask: MaterialData;
}

export interface CharacterMaterial {
  decarabian: MaterialData;
  borealWolf: MaterialData;
  dandelionGladiator: MaterialData;
  guyun: MaterialData;
  elixir: MaterialData;
  aerosiderite: MaterialData;
  distantSea: MaterialData;
  narukami: MaterialData;
  mask: MaterialData;
}

export interface GemMaterial {
  diamond: MaterialData;
  agate: MaterialData;
  lazurite: MaterialData;
  amethyst: MaterialData;
  turquoise: MaterialData;
  jade: MaterialData;
  topaz: MaterialData;
}

export interface BossMaterial {
  hurricaneSeed: MaterialData;
  lightningPrism: MaterialData;
  basaltPillar: MaterialData;
  hoarfrostCore: MaterialData;
  everflameSeed: MaterialData;
  cleansingHeart: MaterialData;
  juvenileJade: MaterialData;
  crystallineBloom: MaterialData;
  marionetteCore: MaterialData;
  perpetualHeart: MaterialData;
  smolderingPearl: MaterialData;
  dewOfRepudiation: MaterialData;
  stormBeads: MaterialData;
  riftbornRegalia: MaterialData;
  dragonheirFalseFin: MaterialData;
  runicFang: MaterialData;
}

export interface LocalMaterial {
  callaLily: MaterialData;
  wolfhook: MaterialData;
  valberry: MaterialData;
  cecilia: MaterialData;
  windwheelAster: MaterialData;
  philanemoMushroom: MaterialData;
  smallLampGrass: MaterialData;
  dandelionSeed: MaterialData;
  jueyunChili: MaterialData;
  noctilucousJade: MaterialData;
  silkFlower: MaterialData;
  glazeLily: MaterialData;
  qingxin: MaterialData;
  starconch: MaterialData;
  violetgrass: MaterialData;
  corLapis: MaterialData;
  onikabuto: MaterialData;
  sakuraBloom: MaterialData;
  crystalMarrow: MaterialData;
  dendrobium: MaterialData;
  nakuWeed: MaterialData;
  seaGanoderma: MaterialData;
  sangoPearl: MaterialData;
  amakumaFruit: MaterialData;
  fluorescentFungus: MaterialData;
}

export interface TalentMaterial {
  freedom: MaterialData;
  resistance: MaterialData;
  ballad: MaterialData;
  prosperity: MaterialData;
  diligence: MaterialData;
  gold: MaterialData;
  transience: MaterialData;
  elegance: MaterialData;
  light: MaterialData;
}

// #endregion

// #region Weapon

export interface Weapon extends ItemData {
  material: WeaponMaterial;
}

export interface WeaponMaterial {
  common: CommonMaterialType;
  elite: EliteMaterialType;
  ascension: WeaponAscensionMaterialType;
}

// #endregion

// #region Character

export interface Character extends ItemData {
  element: Element;
  material: CharacterMaterial;
  talentMaterial: TalentMaterialType;
}

export interface CharacterMaterial {
  gem: GemMaterialType;
  boss: BossMaterialType;
  local: LocalMaterialType;
}

// #endregion

// #region Artifact

export interface Artifact extends ItemData {}

// #endregion

// #region Monster and Dungeon

export interface DropableData {
  id: string;
  availableDay: DayInWeek[];
}

// #endregion
