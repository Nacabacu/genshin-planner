import { useEffect, useState } from 'react';
import { CharacterData } from '../../types/data';
import Autosuggest from '../components/Autosuggest';
import ConfigTable from '../components/ConfigTable';
import ImageIcon, { IconType } from '../components/ImageIcon';
import Switch from '../components/Switch';
import { useDataContext } from '../contexts/dataContext';
import { LanguageDefinition, useLocalizationContext } from '../contexts/localizationContext';

function Planning() {
  const { characterList, addCharacter, selectedDataList } = useDataContext();
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
      <div className="my-4 inline-flex w-full">
        <Autosuggest
          items={selectableCharList}
          onSelect={(value) => {
            addCharacter(value);
          }}
          resetAfterSelect
          placeholder={resources.add_character_placeholder}
          getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Characters} />}
          getItemLabel={(item) => resources[item.id as keyof LanguageDefinition] as string}
          className="ml-auto w-72"
        />
      </div>
      <ConfigTable data={selectedDataList} />
      <Switch onChange={() => {}} />
    </>
  );
}

export default Planning;
