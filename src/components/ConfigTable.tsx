import { Close } from '@mui/icons-material';
import { PropsWithoutRef, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { CellProps, Column, Row, useGlobalFilter, usePagination, useTable } from 'react-table';
import ReactTooltip from 'react-tooltip';
import { SelectedData, useDataContext } from '../contexts/dataContext';
import { LanguageDefinition, useLocalizationContext } from '../contexts/localizationContext';
import Autosuggest from './Autosuggest';
import CharacterDetail from './CharacterDetail';
import { FilterData } from './FilterGroup';
import ImageIcon, { IconType } from './ImageIcon';
import Switch from './Switch';

interface ConfigTableProps {
  data: SelectedData[];
  filter?: FilterData;
}

const PAGE_SIZE = 10;

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
        selectedItem={weaponData}
        onUpdate={(selectedWeapon) => updateSelectedDataList(characterData.id, { weaponData: selectedWeapon })}
        placeholder={resources.select_weapon_placeholder}
        getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Weapons} disabledTooltip />}
        getItemLabel={(item) => resources[item.id as keyof LanguageDefinition]}
        className="ml-2 flex-grow"
      />
    </div>
  );
}
function ArtifactCell(props: CellProps<SelectedData>) {
  const { row, page, previousPage } = props;
  const { artifactList, updateSelectedDataList, removeCharacter } = useDataContext();
  const { resources } = useLocalizationContext();
  const { isEnabled, characterData, artifactDataList, isArtifactEnabled } = row.original;

  const onClose = () => {
    if (page.length === 1) {
      previousPage();
    }
    removeCharacter(characterData.id);
  };

  return (
    <div className="flex items-center">
      <Switch
        checked={isArtifactEnabled}
        disabled={!isEnabled}
        onChange={(isChecked) => updateSelectedDataList(characterData.id, { isArtifactEnabled: isChecked })}
      />
      <Autosuggest
        items={artifactList}
        disabled={!isEnabled || !isArtifactEnabled}
        selectedItem={artifactDataList}
        onUpdate={(selectedArtifactList) =>
          updateSelectedDataList(characterData.id, { artifactDataList: selectedArtifactList })
        }
        multiple
        maxItem={2}
        placeholder={resources.select_artifacts_placeholder}
        getStartAdornment={(item) => <ImageIcon id={item.id} type={IconType.Artifacts} />}
        getItemLabel={(item) => resources[item.id as keyof LanguageDefinition]}
        className="mx-2 flex-grow"
      />
      <Close className="w-8 cursor-pointer hover:text-gray-200" onClick={() => onClose()} />
    </div>
  );
}

function ConfigTable({ data, filter }: PropsWithoutRef<ConfigTableProps>) {
  const { onAddCharacter } = useDataContext();
  const { resources } = useLocalizationContext();

  const columns: Column<SelectedData>[] = useMemo(
    () => [
      {
        Header: resources.character,
        Cell: CharacterCell,
        id: 'character',
        className: 'w-3/12',
      },
      {
        Header: resources.ascension,
        Cell: AscensionCell,
        id: 'ascension',
        className: 'w-1/12',
      },
      {
        Header: resources.talent,
        Cell: TalentCell,
        id: 'talent',
        className: 'w-1/12',
      },
      {
        Header: resources.weapon,
        Cell: WeaponCell,
        id: 'weapon',
        className: 'w-3/12',
      },
      {
        Header: resources.artifact,
        Cell: ArtifactCell,
        id: 'artifact',
        className: 'w-4/12',
      },
    ],
    [resources],
  );
  const customGlobalFilter = useCallback(
    (rows: Row<SelectedData>[], columnIds: string[], filterValue: FilterData) =>
      rows.filter((row) => {
        const { characterData } = row.original;

        if (!filterValue) return true;

        const { elementFilters, weaponTypeFilters } = filterValue;

        if (elementFilters.length && weaponTypeFilters.length) {
          return elementFilters.includes(characterData.element) && weaponTypeFilters.includes(characterData.weaponType);
        }

        if (elementFilters.length) {
          return elementFilters.includes(characterData.element);
        }

        if (weaponTypeFilters.length) {
          return weaponTypeFilters.includes(characterData.weaponType);
        }

        return true;
      }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageCount,
    gotoPage,
    setGlobalFilter,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      globalFilter: customGlobalFilter,
      autoResetGlobalFilter: false,
      autoResetPage: false,
      initialState: { pageSize: PAGE_SIZE },
    },
    useGlobalFilter,
    usePagination,
  );

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  useEffect(() => {
    gotoPage(pageCount - 1);
  }, [onAddCharacter, pageCount, gotoPage]);

  useEffect(() => {
    setGlobalFilter(filter);
    gotoPage(0);
  }, [setGlobalFilter, filter, gotoPage]);

  const renderPageNumberItem = () => {
    const element: ReactNode[] = [];

    if (pageCount === 1) return null;

    for (let index = 0; index < pageCount; index += 1) {
      element.push(
        <button
          key={index}
          type="button"
          value={index}
          onClick={(event) => {
            const newPage = parseInt((event.target as HTMLButtonElement).value, 10);
            gotoPage(newPage);
          }}
          className={`rounded p-2 ${
            index === pageIndex ? 'cursor-default bg-cyan-600' : 'bg-gray-700 hover:bg-gray-600 active:bg-gray-500'
          }`}
        >
          {index + 1}
        </button>,
      );
    }

    return element;
  };

  const renderBody = () => {
    if (page.length === 0)
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="select-none text-4xl opacity-50">{resources.no_item_found}</div>
        </div>
      );

    return (
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-700">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className={`p-2 text-left ${(column as any).className}`}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-700">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-2 py-3">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="h-[690px]">{renderBody()}</div>
      <div className="ml-auto mt-4 space-x-2">{renderPageNumberItem()}</div>
    </div>
  );
}

export default ConfigTable;
