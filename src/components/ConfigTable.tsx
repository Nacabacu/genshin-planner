import { PropsWithoutRef, useMemo } from 'react';
import { CellProps, Column, useTable } from 'react-table';
import { SelectedData, useDataContext } from '../contexts/dataContext';
import { LanguageDefinition, useLocalizationContext } from '../contexts/localizationContext';
import Autosuggest from './Autosuggest';
import CharacterDetail from './CharacterDetail';
import ImageIcon, { IconType } from './ImageIcon';
import Switch from './Switch';

interface ConfigTableProps {
  data: SelectedData[];
}

function CharacterCell({ row }: CellProps<SelectedData>) {
  const { updateSelectedDataList } = useDataContext();
  const { isEnabled, characterData } = row.original;

  return (
    <div className="flex">
      <Switch
        checked={isEnabled}
        onChange={(isChecked) => updateSelectedDataList(characterData.id, { isEnabled: isChecked })}
      />
      <CharacterDetail data={characterData} disabled={!isEnabled} className="flex-grow" />
    </div>
  );
}

function AscensionCell({ row }: CellProps<SelectedData>) {
  const { updateSelectedDataList } = useDataContext();
  const { isEnabled, characterData, isAscensionEnabled } = row.original;

  return (
    <div className="flex">
      <Switch
        checked={isAscensionEnabled}
        disabled={!isEnabled}
        onChange={(isChecked) => updateSelectedDataList(characterData.id, { isAscensionEnabled: isChecked })}
      />
    </div>
  );
}

function TalentCell({ row }: CellProps<SelectedData>) {
  const { updateSelectedDataList } = useDataContext();
  const { isEnabled, characterData, isTalentEnabled } = row.original;

  return (
    <div className="flex">
      <Switch
        checked={isTalentEnabled}
        disabled={!isEnabled}
        onChange={(isChecked) => updateSelectedDataList(characterData.id, { isTalentEnabled: isChecked })}
      />
    </div>
  );
}

function WeaponCell({ row }: CellProps<SelectedData>) {
  const { weaponList, updateSelectedDataList } = useDataContext();
  const { resources } = useLocalizationContext();
  const { isEnabled, characterData, weaponData, isWeaponEnabled } = row.original;
  const selectableWeaponList = weaponList.filter((weapon) => weapon.type === characterData.weaponType);

  return (
    <div className="flex">
      <Switch
        checked={isWeaponEnabled}
        disabled={!isEnabled}
        onChange={(isChecked) => updateSelectedDataList(characterData.id, { isWeaponEnabled: isChecked })}
      />
      <Autosuggest
        items={selectableWeaponList}
        disabled={!isEnabled || !isWeaponEnabled}
        defaultItem={weaponData}
        onSelect={(selectedWeapon) => updateSelectedDataList(characterData.id, { weaponData: selectedWeapon })}
        placeholder={resources.select_weapon_placeholder}
        getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Weapons} />}
        getItemLabel={(item) => resources[item.id as keyof LanguageDefinition]}
        className="ml-2 w-60"
      />
    </div>
  );
}
function ArtifactCell({ row }: CellProps<SelectedData>) {
  const { artifactList, updateSelectedDataList } = useDataContext();
  const { resources } = useLocalizationContext();
  const { isEnabled, characterData, artifactDataList, isArtifactEnabled } = row.original;

  return (
    <div className="flex">
      <Switch
        checked={isArtifactEnabled}
        disabled={!isEnabled}
        onChange={(isChecked) => updateSelectedDataList(characterData.id, { isArtifactEnabled: isChecked })}
      />
      <Autosuggest
        items={artifactList}
        disabled={!isEnabled || !isArtifactEnabled}
        defaultItem={artifactDataList}
        onSelect={(selectedArtifactList) =>
          updateSelectedDataList(characterData.id, { artifactDataList: selectedArtifactList })
        }
        multiple
        maxItem={3}
        placeholder={resources.select_artifacts_placeholder}
        getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Artifacts} />}
        getItemLabel={(item) => resources[item.id as keyof LanguageDefinition]}
        className="ml-2 w-60"
      />
    </div>
  );
}

function ConfigTable({ data }: PropsWithoutRef<ConfigTableProps>) {
  const { resources } = useLocalizationContext();
  const columns: Column<SelectedData>[] = useMemo(
    () => [
      {
        Header: resources.character,
        Cell: CharacterCell,
        id: 'character',
      },
      {
        Header: resources.ascension,
        Cell: AscensionCell,
        id: 'ascension',
      },
      {
        Header: resources.talent,
        Cell: TalentCell,
        id: 'talent',
      },
      {
        Header: resources.weapon,
        Cell: WeaponCell,
        id: 'weapon',
      },
      {
        Header: resources.artifact,
        Cell: ArtifactCell,
        id: 'artifact',
      },
    ],
    [resources],
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div>
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="text-left">
                  {column.render('Header')}
                </th>
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
    </div>
  );
}

export default ConfigTable;
