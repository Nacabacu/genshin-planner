import { useEffect, useState } from 'react';
import { CharacterData } from '../../types/data';
import Autosuggest from '../components/Autosuggest';
import ImageIcon, { IconType } from '../components/ImageIcon';
import Pill from '../components/Pill';
import Switch from '../components/Switch';
import { useDataContext } from '../contexts/dataContext';
import { LanguageDefinition, useLocalizationContext } from '../contexts/localizationContext';

function Planning() {
  const { characterList, weaponList, artifactList, selectedDataList, addCharacter } = useDataContext();
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
          resetAfterSelect
          placeholder={resources.add_character_placeholder}
          getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Characters} />}
          getItemLabel={(item) => resources[item.id as keyof LanguageDefinition] as string}
        />
        <Switch onChange={() => {}} />
      </div>
      <Autosuggest
        items={characterList}
        onSelect={(value) => {
          addCharacter(value);
        }}
        placeholder={resources.add_character_placeholder}
        getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Characters} />}
        getItemLabel={(item) => resources[item.id as keyof LanguageDefinition] as string}
        className="mt-10"
      />
      <div className="mt-10 flex w-full">
        <div className="flex-1">
          <Autosuggest
            items={weaponList}
            onSelect={(value) => {
              console.log(value);
            }}
            getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Weapons} />}
            getItemLabel={(item) => resources[item.id as keyof LanguageDefinition] as string}
          />
        </div>
        <div className="flex-1">Test</div>
      </div>
      <div className="mt-10 w-80">
        <Autosuggest
          items={artifactList}
          onSelect={(value) => {
            console.log(value);
          }}
          multiple
          maxItem={3}
          placeholder={resources.add_character_placeholder}
          getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Artifacts} />}
          getItemLabel={(item) => resources[item.id as keyof LanguageDefinition] as string}
        />
      </div>
      <div className="mt-10">
        <Pill startAdornment={<ImageIcon id="klee" type={IconType.Characters} />} />
        <Pill label="123" deletable startAdornment={<ImageIcon id="klee" type={IconType.Characters} />} />
        <Pill label="123" startAdornment={<ImageIcon id="klee" type={IconType.Characters} />} />
      </div>
      <div className="mt-10">
        <Switch onChange={() => {}} />
      </div>
    </>
  );
}

export default Planning;
