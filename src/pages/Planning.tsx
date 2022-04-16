import { Switch, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { CharacterData } from '../../types/data';
import ArtifactSelector from '../components/ArtifactSelector';
import CharacterSelector from '../components/CharacterSelector';
import { ImageFolder } from '../components/ImageIcon';
import Selector from '../components/Selector';
import WeaponSelector from '../components/WeaponSelector';
import { useDataContext } from '../contexts/dataContext';

function Planning() {
  const { characterList, addCharacter, selectedDataList } = useDataContext();
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
            <TableCell />
            <TableCell>Characters</TableCell>
            <TableCell>Talents</TableCell>
            <TableCell>Weapons</TableCell>
            <TableCell>Artifacts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Switch />
            </TableCell>
            <TableCell>
              <CharacterSelector />
            </TableCell>
            <TableCell>
              <Switch />
            </TableCell>
            <TableCell>
              <WeaponSelector />
            </TableCell>
            <TableCell>
              <ArtifactSelector />
            </TableCell>
          </TableRow>
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
