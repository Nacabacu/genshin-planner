import { useEffect, useState } from 'react';
import { CharacterData } from '../../types/data';
import Autosuggest from '../components/Autosuggest';
import ImageIcon, { IconType } from '../components/ImageIcon';
import { useDataContext } from '../contexts/dataContext';
import { LanguageDefinition, useLocalizationContext } from '../contexts/localizationContext';

function Planning() {
  const { characterList, selectedDataList, addCharacter, weaponList } = useDataContext();
  const { resources } = useLocalizationContext();
  const [selectableCharList, setSelectableCharList] = useState<CharacterData[]>([]);

  useEffect(() => {
    const selectable = characterList.filter(
      (character) => selectedDataList.findIndex((selectedData) => selectedData.characterData.id === character.id) < 0,
    );

    setSelectableCharList(selectable);
  }, [characterList, selectedDataList]);

  return (
    <>
      <div className="w-60">
        <Autosuggest
          items={selectableCharList}
          onSelect={(value) => {
            addCharacter(value);
          }}
          placeholder={resources.add_character_placeholder}
          getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Characters} className="h-6 w-6" />}
          getItemLabel={(item) => resources[item.id as keyof LanguageDefinition] as string}
        />
      </div>
      <div className="mt-10 w-80">
        <Autosuggest
          items={weaponList}
          onSelect={(value) => {
            console.log(value);
          }}
          placeholder={resources.add_character_placeholder}
          getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Weapons} className="h-6 w-6" />}
          getItemLabel={(item) => resources[item.id as keyof LanguageDefinition] as string}
        />
      </div>
    </>
  );
}

export default Planning;
