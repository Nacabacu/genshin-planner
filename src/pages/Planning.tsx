import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function Planning() {
  return (
    <div className="mx-16 mt-8">
      <Table className="hidden sm:block">
        <TableHead>
          <TableRow>
            <TableCell>Test header</TableCell>
            <TableCell>Test header</TableCell>
            <TableCell>Test header</TableCell>
            <TableCell>Test header</TableCell>
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
