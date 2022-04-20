import { PropsWithoutRef, useCallback, useMemo } from 'react';
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

function ConfigTable({ data }: PropsWithoutRef<ConfigTableProps>) {
  const { updateSelectedData, weaponList, artifactList } = useDataContext();
  const { resources } = useLocalizationContext();
  const renderCharacterCell = useCallback(
    ({ row }: CellProps<SelectedData>) => {
      const { isEnabled, characterData } = row.original;
      return (
        <div className="flex">
          <Switch
            checked={isEnabled}
            onChange={(isChecked) => updateSelectedData(characterData.id, { isEnabled: isChecked })}
          />
          <CharacterDetail data={characterData} disabled={!isEnabled} className="flex-grow" />
        </div>
      );
    },
    [updateSelectedData],
  );
  const renderAscension = useCallback(
    ({ row }: CellProps<SelectedData>) => {
      const { isEnabled, characterData, isAscensionEnabled } = row.original;
      return (
        <div className="flex">
          <Switch
            checked={isAscensionEnabled}
            disabled={!isEnabled}
            onChange={(isChecked) => updateSelectedData(characterData.id, { isAscensionEnabled: isChecked })}
          />
        </div>
      );
    },
    [updateSelectedData],
  );
  const renderTalent = useCallback(
    ({ row }: CellProps<SelectedData>) => {
      const { isEnabled, characterData, isTalentEnabled } = row.original;
      return (
        <div className="flex">
          <Switch
            checked={isTalentEnabled}
            disabled={!isEnabled}
            onChange={(isChecked) => updateSelectedData(characterData.id, { isTalentEnabled: isChecked })}
          />
        </div>
      );
    },
    [updateSelectedData],
  );
  const renderWeapon = useCallback(
    ({ row }: CellProps<SelectedData>) => {
      const { isEnabled, characterData, weaponData, isWeaponEnabled } = row.original;
      const selectableWeaponList = weaponList.filter((weapon) => weapon.type === characterData.weaponType);
      return (
        <div className="flex">
          <Switch
            checked={isWeaponEnabled}
            disabled={!isEnabled}
            onChange={(isChecked) => updateSelectedData(characterData.id, { isWeaponEnabled: isChecked })}
          />
          <Autosuggest
            items={selectableWeaponList}
            disabled={!isEnabled || !isWeaponEnabled}
            defaultItem={weaponData}
            onSelect={(selectedWeapon) => updateSelectedData(characterData.id, { weaponData: selectedWeapon })}
            placeholder={resources.select_weapon_placeholder}
            getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Weapons} />}
            getItemLabel={(item) => resources[item.id as keyof LanguageDefinition]}
            className="ml-2 w-60"
          />
        </div>
      );
    },
    [updateSelectedData, resources, weaponList],
  );
  const renderArtifact = useCallback(
    ({ row }: CellProps<SelectedData>) => {
      const { isEnabled, characterData, artifactDataList, isArtifactEnabled } = row.original;
      return (
        <div className="flex">
          <Switch
            checked={isArtifactEnabled}
            disabled={!isEnabled}
            onChange={(isChecked) => updateSelectedData(characterData.id, { isWeaponEnabled: isChecked })}
          />
          <Autosuggest
            items={artifactList}
            disabled={!isEnabled || !isArtifactEnabled}
            defaultItem={artifactDataList}
            onSelect={(selectedArtifactList) =>
              updateSelectedData(characterData.id, { artifactDataList: selectedArtifactList })
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
    },
    [updateSelectedData, resources, artifactList],
  );
  const columns: Column<SelectedData>[] = useMemo(
    () => [
      {
        Header: resources.character,
        Cell: renderCharacterCell,
        id: 'character',
      },
      {
        Header: resources.ascension,
        Cell: renderAscension,
        id: 'ascension',
      },
      {
        Header: resources.talent,
        Cell: renderTalent,
        id: 'talent',
      },
      {
        Header: resources.weapon,
        Cell: renderWeapon,
        id: 'weapon',
      },
      {
        Header: resources.artifact,
        Cell: renderArtifact,
        id: 'artifact',
      },
    ],
    [resources, renderCharacterCell, renderAscension, renderTalent, renderWeapon, renderArtifact],
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
  );
}

export default ConfigTable;
