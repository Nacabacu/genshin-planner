import { Switch, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ArtifactSelector from '../components/ArtifactSelector';
import CharacterSelector from '../components/CharacterSelector';
import WeaponSelector from '../components/WeaponSelector';

function Planning() {
  return (
    <div className="mx-8 mt-4">
      <Table>
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
    </div>
  );
}

export default Planning;
