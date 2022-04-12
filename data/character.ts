import { Character, Element, Rarity, WeaponType } from '../types/data';

const character: Character[] = [
  {
    id: 'albedo',
    rarity: Rarity.FiveStar,
    weaponType: WeaponType.Sword,
    element: Element.Geo,
    ascensionMaterial: {
      eliteMaterial: 'scroll',
      gemMaterial: 'topaz',
      bossMaterial: 'basaltPillar',
      localMaterial: 'cecilia',
    },
    talentMaterial: {
      eliteMaterial: 'scroll',
      weeklyBossMaterial: 'childeTusk',
      bookMaterial: 'ballad',
    },
  },
];

export default character;
