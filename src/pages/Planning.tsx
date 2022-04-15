import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function Planning() {
  return (
    <div className="mx-8 mt-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Characters</TableCell>
            <TableCell>Talents</TableCell>
            <TableCell>Weapons</TableCell>
            <TableCell>Artifacts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Test body</TableCell>
            <TableCell>Test body</TableCell>
            <TableCell>Test body</TableCell>
            <TableCell>Test body</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Planning;
