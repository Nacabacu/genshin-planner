import { Close } from '@mui/icons-material';
import { Switch, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { CharacterData } from '../../types/data';
import ArtifactSelector from '../components/ArtifactSelector';
import CharacterDetail from '../components/CharacterDetail';
import { ImageFolder } from '../components/ImageIcon';
import Selector from '../components/Selector';
import { SelectedData, useDataContext } from '../contexts/dataContext';

interface TableHeadConfig {
  label: string;
  width: string;
}

const tableHeadConfigList: TableHeadConfig[] = [
  {
    label: 'Name',
    width: '20%',
  },
  {
    label: 'Ascension',
    width: '60px',
  },
  {
    label: 'Talent',
    width: '60px',
  },
  {
    label: 'Weapon',
    width: '40%',
  },
  {
    label: 'Artifact',
    width: '40%',
  },
  {
    label: '',
    width: '60px',
  },
];

function Planning() {
  const {
    characterList,
    weaponList,
    artifactList,
    selectedDataList,
    addCharacter,
    removeCharacter,
    updateSelectedData,
  } = useDataContext();
  const [selectableCharList, setSelectableCharList] = useState<CharacterData[]>([]);

  useEffect(() => {
    const selectable = characterList.filter(
      (character) => selectedDataList.findIndex((selectedData) => selectedData.characterData.id === character.id) < 0,
    );

    setSelectableCharList(selectable);
  }, [characterList, selectedDataList]);

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            {tableHeadConfigList.map((config) => (
              <TableCell key={config.label} width={config.width}>
                {config.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedDataList.map(
            ({
              characterData,
              isEnabled,
              isAscendEnabled,
              isTalentEnabled,
              isWeaponEnabled,
              isArtifactEnabled,
            }: SelectedData) => (
              <TableRow key={characterData.id}>
                <TableCell>
                  <div className="flex">
                    <Switch
                      checked={isEnabled}
                      onChange={(_, checked) => {
                        updateSelectedData(characterData.id, { isEnabled: checked });
                      }}
                    />
                    <CharacterDetail data={characterData} disabled={!isEnabled} />
                  </div>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={isAscendEnabled}
                    disabled={!isEnabled}
                    onChange={(_, checked) => {
                      updateSelectedData(characterData.id, { isAscendEnabled: checked });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={isTalentEnabled}
                    disabled={!isEnabled}
                    onChange={(_, checked) => {
                      updateSelectedData(characterData.id, { isTalentEnabled: checked });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Switch
                      checked={isWeaponEnabled}
                      disabled={!isEnabled}
                      onChange={(_, checked) => {
                        updateSelectedData(characterData.id, { isWeaponEnabled: checked });
                      }}
                    />
                    <Selector
                      options={weaponList.filter((item) => item.type === characterData.weaponType)}
                      folder={ImageFolder.Weapons}
                      disabled={!isWeaponEnabled || !isEnabled}
                      label="Select Weapon..."
                      className="flex-grow"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Switch
                      checked={isArtifactEnabled}
                      disabled={!isEnabled}
                      onChange={(_, checked) => {
                        updateSelectedData(characterData.id, { isArtifactEnabled: checked });
                      }}
                    />
                    <ArtifactSelector
                      options={artifactList}
                      disabled={!isArtifactEnabled || !isEnabled}
                      label="Select Artifact..."
                      className="flex-grow"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-400"
                    onClick={() => removeCharacter(characterData.id)}
                  >
                    <Close />
                  </button>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
      <Selector
        options={selectableCharList}
        folder={ImageFolder.Characters}
        onChange={(data) => addCharacter(data)}
        clearOnSelect
        label="Add Character..."
        className={`w-80 pt-8 ${selectableCharList.length === 0 ? 'hidden' : 'block'}`}
      />
    </>
  );
}

export default Planning;
