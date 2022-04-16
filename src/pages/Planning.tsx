import { Switch, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { CharacterData } from '../../types/data';
import CharacterDetail from '../components/CharacterDetail';
import { ImageFolder } from '../components/ImageIcon';
import Selector from '../components/Selector';
import { useDataContext } from '../contexts/dataContext';

interface TableHeadConfig {
  label: string;
  width: string;
}

const tableHeadConfigList: TableHeadConfig[] = [
  {
    label: '',
    width: '60px',
  },
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
    width: '30%',
  },
  {
    label: 'Artifact',
    width: '40%',
  },
];

function Planning() {
  const { characterList, addCharacter, selectedDataList, updateSelectedData } = useDataContext();
  const [selectableCharList, setSelectableCharList] = useState<CharacterData[]>([]);

  useEffect(() => {
    const selectable = characterList.filter(
      (character) => selectedDataList.findIndex((selectedData) => selectedData.characterId === character.id) < 0,
    );

    setSelectableCharList(selectable);
  }, [characterList, selectedDataList]);

  const onChange = (data: CharacterData) => {
    addCharacter(data);
  };

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
          {selectedDataList.map(({ characterId, isEnabled }) => (
            <TableRow key={characterId}>
              <TableCell>
                <Switch
                  checked={isEnabled}
                  onChange={(_, checked) => {
                    updateSelectedData(characterId, { isEnabled: checked });
                  }}
                />
              </TableCell>
              <TableCell>
                <CharacterDetail characterId={characterId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Selector
        options={selectableCharList}
        folder={ImageFolder.Characters}
        onChange={onChange}
        clearOnSelect
        className="w-80 pt-8"
      />
    </>
  );
}

export default Planning;
