import { Close } from '@mui/icons-material';
import { PropsWithoutRef, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { CellProps, Column, Row, useGlobalFilter, usePagination, useTable } from 'react-table';
import ReactTooltip from 'react-tooltip';
import { SelectedData, useDataContext } from '../contexts/dataContext';
import { LanguageDefinition, useLocalizationContext } from '../contexts/localizationContext';
import useResponsiveSize, { ScreenSize } from '../hooks/useResponsiveSize';
import Autosuggest from './Autosuggest';
import CharacterDetail from './CharacterDetail';
import { FilterData } from './FilterGroup';
import ImageIcon, { IconType } from './ImageIcon';
import Switch from './Switch';

type CellGetter = ({ row }: CellProps<SelectedData>) => JSX.Element;

interface ConfigTableProps {
  data: SelectedData[];
  filter?: FilterData;
}

interface ColumnConfig {
  header: string | JSX.Element;
  cell: CellGetter;
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
      <CharacterDetail data={characterData} disabled={!isEnabled} />
    </div>
  );
}

function CharacterTabletCell({ row }: CellProps<SelectedData>) {
  const { updateSelectedDataList } = useDataContext();
  const { resources } = useLocalizationContext();
  const { isEnabled, characterData, isAscensionEnabled, isTalentEnabled } = row.original;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <Switch
          checked={isEnabled}
          onChange={(isChecked) => updateSelectedDataList(characterData.id, { isEnabled: isChecked })}
        />
        <CharacterDetail data={characterData} disabled={!isEnabled} />
      </div>
      <div className="inline-flex justify-end gap-2">
        <span className="flex items-center">
          <span className="truncate">{resources.ascension}</span>
          <Switch
            checked={isAscensionEnabled}
            onChange={(isChecked) => updateSelectedDataList(characterData.id, { isAscensionEnabled: isChecked })}
          />
        </span>
        <span className="flex items-center">
          <span className="truncate">{resources.talent}</span>
          <Switch
            checked={isTalentEnabled}
            onChange={(isChecked) => updateSelectedDataList(characterData.id, { isTalentEnabled: isChecked })}
          />
        </span>
      </div>
    </div>
  );
}

function CharacterMobileCell({ row, page, previousPage }: CellProps<SelectedData>) {
  const { weaponList, artifactList, updateSelectedDataList, removeCharacter } = useDataContext();
  const { resources } = useLocalizationContext();
  const {
    isEnabled,
    characterData,
    weaponData,
    artifactDataList,
    isAscensionEnabled,
    isTalentEnabled,
    isWeaponEnabled,
    isArtifactEnabled,
  } = row.original;
  const selectableWeaponList = weaponList.filter((weapon) => weapon.type === characterData.weaponType);

  const onClose = () => {
    if (page.length === 1) {
      previousPage();
    }
    removeCharacter(characterData.id);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <Switch
          checked={isEnabled}
          onChange={(isChecked) => updateSelectedDataList(characterData.id, { isEnabled: isChecked })}
        />
        <CharacterDetail data={characterData} disabled={!isEnabled} />
        <span>
          <Switch
            checked={isAscensionEnabled}
            onChange={(isChecked) => updateSelectedDataList(characterData.id, { isAscensionEnabled: isChecked })}
          />
        </span>
        <span>
          <Switch
            checked={isTalentEnabled}
            onChange={(isChecked) => updateSelectedDataList(characterData.id, { isTalentEnabled: isChecked })}
          />
        </span>
      </div>
      <div className="ml-8 flex">
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
      <div className="ml-8 flex items-center">
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

function WeaponMobileCell({ row, page, previousPage }: CellProps<SelectedData>) {
  const { weaponList, updateSelectedDataList, artifactList, removeCharacter } = useDataContext();
  const { resources } = useLocalizationContext();
  const { isEnabled, characterData, weaponData, isWeaponEnabled, isArtifactEnabled, artifactDataList } = row.original;
  const selectableWeaponList = weaponList.filter((weapon) => weapon.type === characterData.weaponType);

  const onClose = () => {
    if (page.length === 1) {
      previousPage();
    }
    removeCharacter(characterData.id);
  };

  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
}

function ArtifactCell({ row, page, previousPage }: CellProps<SelectedData>) {
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

function getHiddenColumns(screenSize: ScreenSize) {
  switch (screenSize) {
    case ScreenSize.MobilePortrait:
      return ['talent', 'ascension', 'weapon', 'artifact'];
    case ScreenSize.MobileLandScape:
      return ['talent', 'ascension', 'artifact'];
    case ScreenSize.Tablet:
      return ['talent', 'ascension'];
    default:
      return [];
  }
}

function ConfigTable({ data, filter }: PropsWithoutRef<ConfigTableProps>) {
  const { onAddCharacter } = useDataContext();
  const screenSize = useResponsiveSize();
  const { resources } = useLocalizationContext();
  const characterColumnConfig = useMemo<ColumnConfig>(() => {
    let header: string | JSX.Element;
    let cell: CellGetter;

    switch (screenSize) {
      case ScreenSize.MobilePortrait:
        header = (
          <span className="flex justify-between">
            {resources.character}
            <span>
              {resources.ascension}/{resources.talent}
            </span>
          </span>
        );
        cell = CharacterMobileCell;
        break;
      case ScreenSize.MobileLandScape:
      case ScreenSize.Tablet:
        header = resources.character;
        cell = CharacterTabletCell;
        break;
      default:
        header = resources.character;
        cell = CharacterCell;
        break;
    }
    return { header, cell };
  }, [screenSize, resources]);
  const weaponColumnConfig = useMemo<ColumnConfig>(() => {
    let header: string;
    let cell: CellGetter;

    switch (screenSize) {
      case ScreenSize.MobileLandScape:
        header = `${resources.weapon}/${resources.artifact}`;
        cell = WeaponMobileCell;
        break;
      default:
        header = resources.character;
        cell = WeaponCell;
        break;
    }
    return { header, cell };
  }, [screenSize, resources]);

  const columns: Column<SelectedData>[] = useMemo(() => {
    const { header: characterColumnHeader, cell: characterCell } = characterColumnConfig;
    const { header: weaponColumnHeader, cell: weaponCell } = weaponColumnConfig;

    return [
      {
        Header: characterColumnHeader,
        Cell: characterCell,
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
        Header: weaponColumnHeader,
        Cell: weaponCell,
        id: 'weapon',
        className: 'w-3/12',
      },
      {
        Header: resources.artifact,
        Cell: ArtifactCell,
        id: 'artifact',
        className: 'w-4/12',
      },
    ];
  }, [resources, characterColumnConfig, weaponColumnConfig]);
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
    setHiddenColumns,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      globalFilter: customGlobalFilter,
      autoResetGlobalFilter: false,
      autoResetPage: false,
      initialState: { pageSize: PAGE_SIZE, hiddenColumns: getHiddenColumns(screenSize) },
    },
    useGlobalFilter,
    usePagination,
  );

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  // TODO: fix bug when reset filter
  useEffect(() => {
    gotoPage(pageCount - 1);
  }, [onAddCharacter, pageCount, gotoPage]);

  useEffect(() => {
    setGlobalFilter(filter);
    gotoPage(0);
  }, [setGlobalFilter, filter, gotoPage]);

  useEffect(() => {
    const hiddenColumns = getHiddenColumns(screenSize);

    setHiddenColumns(hiddenColumns);
  }, [screenSize, setHiddenColumns]);

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
    <div className="flex flex-grow flex-col justify-between overflow-hidden">
      <div className="flex-grow">{renderBody()}</div>
      <div className="my-4 ml-auto space-x-2">{renderPageNumberItem()}</div>
    </div>
  );
}

export default ConfigTable;
