import { PropsWithoutRef, useCallback, useMemo } from 'react';
import { CellProps, Column, useTable } from 'react-table';
import { ArtifactData, CharacterData, WeaponData } from '../../types/data';
import { SelectedData, useDataContext } from '../contexts/dataContext';
import { useLocalizationContext } from '../contexts/localizationContext';
import Switch from './Switch';

interface CharacterCellData {
  isEnabled: boolean;
  characterData: CharacterData;
}

interface WeaponCellData {
  isWeaponEnabled: boolean;
  weaponData?: WeaponData;
}

interface ArtifactCellData {
  isArtifactEnabled: boolean;
  artifactDataList?: ArtifactData[];
}

interface ConfigTableProps {
  data: SelectedData[];
}

function ConfigTable({ data }: PropsWithoutRef<ConfigTableProps>) {
  const { updateSelectedData } = useDataContext();
  const { resources } = useLocalizationContext();
  const renderCharacterCell = useCallback(
    ({ cell }: CellProps<SelectedData, CharacterCellData>) => {
      const { isEnabled, characterData } = cell.value;
      return (
        <Switch
          checked={isEnabled}
          onChange={(isChecked) => updateSelectedData(characterData.id, { isEnabled: isChecked })}
        />
      );
    },
    [updateSelectedData],
  );
  const columns: Column<SelectedData>[] = useMemo(
    () => [
      {
        Header: resources.character,
        Cell: renderCharacterCell,
        accessor: (row): CharacterCellData => ({
          isEnabled: row.isEnabled,
          characterData: row.characterData,
        }),
        id: 'character',
      },
      {
        Header: resources.ascension,
        accessor: 'isAscendEnabled',
        id: 'ascension',
      },
      {
        Header: resources.talent,
        accessor: 'isTalentEnabled',
        id: 'talent',
      },
      {
        Header: resources.weapon,
        Cell: () => '',
        accessor: (row): WeaponCellData => ({
          isWeaponEnabled: row.isWeaponEnabled,
          weaponData: row.weaponData,
        }),
        id: 'weapon',
      },
      {
        Header: resources.artifact,
        Cell: () => '',
        accessor: (row): ArtifactCellData => ({
          isArtifactEnabled: row.isArtifactEnabled,
          artifactDataList: row.artifactDataList,
        }),
        id: 'artifact',
      },
    ],
    [resources, renderCharacterCell],
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ConfigTable;
