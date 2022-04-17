import Switch from '../components/Switch';

function Planning() {
  // const { characterList, selectedDataList } = useDataContext();
  // const [selectableCharList, setSelectableCharList] = useState<CharacterData[]>([]);

  // useEffect(() => {
  //   const selectable = characterList.filter(
  //     (character) => selectedDataList.findIndex((selectedData) => selectedData.characterData.id === character.id) < 0,
  //   );

  //   setSelectableCharList(selectable);
  // }, [characterList, selectedDataList]);

  return <Switch onChange={(value) => console.log(value)} />;
}

export default Planning;
