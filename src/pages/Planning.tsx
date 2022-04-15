import { Switch, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { CharacterData } from '../../types/data';
import ArtifactSelector from '../components/ArtifactSelector';
import CharacterSelector from '../components/CharacterSelector';
import { ImageFolder } from '../components/ImageIcon';
import Selector from '../components/Selector';
import WeaponSelector from '../components/WeaponSelector';
import { useDataContext } from '../contexts/dataContext';

function Planning() {
  const { characterList, addCharacter } = useDataContext();
  // const [selectableCharacterList, setSelectableCharacterList] = useState<CharacterData[]>([]);

  // useEffect(() => {
  // const selectableList = characterList.filter(
  //   (character) => selectedDataList.findIndex((selectedData) => selectedData.characterId === character.id) < 0,
  // );
  // setSelectableCharacterList(selectableList);
  // }, [selectedDataList, characterList, setSelectableCharacterList]);

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
      <Selector options={characterList} folder={ImageFolder.Characters} onChange={onChange} />
    </>
  );
}

export default Planning;
