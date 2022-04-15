import { Autocomplete, Box, TextField } from '@mui/material';
import { useState } from 'react';
import { WeaponData } from '../../types/data';
import { useDataContext } from '../contexts/dataContext';
import ImageIcon, { ImageFolder } from './ImageIcon';

function WeaponSelector() {
  const { weaponList } = useDataContext();
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponData>(weaponList[0]);

  return (
    <Autocomplete
      value={selectedWeapon}
      onChange={(event, newValue) => setSelectedWeapon(newValue)}
      options={weaponList}
      autoHighlight
      disableClearable
      getOptionLabel={(option) => option.id}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <ImageIcon id={option.id} folder={ImageFolder.Weapons} iconStyle="h-8 w-8 mr-4" />
          {option.id}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: <ImageIcon id={selectedWeapon.id} folder={ImageFolder.Weapons} iconStyle="h-8 w-8 mr-4" />,
          }}
        />
      )}
    />
  );
}

export default WeaponSelector;
