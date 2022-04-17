import { useEffect, useState } from 'react';
import { CharacterData } from '../../types/data';
import Autosuggest from '../components/Autosuggest';
import ImageIcon, { IconType } from '../components/ImageIcon';
import { useDataContext } from '../contexts/dataContext';
import { LanguageDefinition, useLocalizationContext } from '../contexts/localizationContext';

function Planning() {
  const { characterList, selectedDataList } = useDataContext();
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
        onSelect={(value) => console.log(value)}
        className="w-60"
        getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Characters} className="h-6 w-6" />}
        getItemLabel={(item) => resources[item.id as keyof LanguageDefinition] as string}
      />
    </div>
  );
}

export default Planning;
