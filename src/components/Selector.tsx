import { Autocomplete, Box, TextField } from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import { ItemDataBase } from '../../types/data';
import ImageIcon, { ImageFolder } from './ImageIcon';

export interface SelectorProps<T> {
  options: T[];
  folder: ImageFolder;
  onChange?: (value: T) => void;
}

function Selector<T extends ItemDataBase>({ options, folder, onChange }: PropsWithChildren<SelectorProps<T>>) {
  const [value, setValue] = useState<T>(options[0]);

  return (
    <Autocomplete
      value={value as NonNullable<T>}
      onChange={(event, newValue) => {
        if (Array.isArray(newValue)) return; // TODO: remove this workaround
        setValue(newValue);

        if (!onChange) return;

        onChange(newValue);
      }}
      options={options}
      size="small"
      blurOnSelect
      autoHighlight
      disableClearable
      getOptionLabel={(option) => option.id}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <ImageIcon id={option.id} folder={folder} iconStyle="h-8 w-8 mr-4" />
          {option.id}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add Character..."
          InputProps={{
            ...params.InputProps,
            startAdornment: value ? <ImageIcon id={value.id} folder={folder} iconStyle="h-8 w-8 mr-4" /> : null,
          }}
        />
      )}
    />
  );
}

Selector.defaultProps = {
  onChange: null,
};

export default Selector;
