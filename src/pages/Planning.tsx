import { useEffect, useState } from 'react';
import { CharacterData } from '../../types/data';
import Autosuggest from '../components/Autosuggest';
import ImageIcon, { IconType } from '../components/ImageIcon';
import Switch from '../components/Switch';
import { useDataContext } from '../contexts/dataContext';
import { LanguageDefinition, useLocalizationContext } from '../contexts/localizationContext';

function Planning() {
  const { characterList, selectedDataList, addCharacter } = useDataContext();
  const { resources } = useLocalizationContext();
  const [selectableCharList, setSelectableCharList] = useState<CharacterData[]>([]);

  useEffect(() => {
    const selectable = characterList.filter(
      (character) => selectedDataList.findIndex((selectedData) => selectedData.characterData.id === character.id) < 0,
    );

    setSelectableCharList(selectable);
  }, [characterList, selectedDataList]);

  return (
    <div className="flex">
      <Autosuggest
        items={selectableCharList}
        onSelect={(value) => {
          addCharacter(value);
        }}
        className="w-60"
        defaultLabel={resources.add_character_label}
        resetAfterSelect
        getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Characters} className="h-6 w-6" />}
        getItemLabel={(item) => resources[item.id as keyof LanguageDefinition] as string}
      />
      <Switch onChange={(value) => console.log(value)} />
    </div>
  );
}

export default Planning;
