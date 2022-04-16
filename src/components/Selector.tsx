import { Autocomplete, Box, TextField } from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import { ItemDataBase } from '../../types/data';
import ImageIcon, { ImageFolder } from './ImageIcon';

export interface SelectorProps<T> {
  options: T[];
  folder: ImageFolder;
  clearOnSelect?: boolean;
  disabled?: boolean;
  onChange?: (value: T) => void;
  label?: string;
  className?: string;
}

function Selector<T extends ItemDataBase>({
  options,
  folder,
  clearOnSelect,
  disabled,
  onChange,
  label,
  className,
}: PropsWithChildren<SelectorProps<T>>) {
  const [value, setValue] = useState<T | null>(null);

  return (
    <Autocomplete
      className={className}
      value={value as NonNullable<T>}
      onChange={(_, newValue) => {
        if (Array.isArray(newValue)) return; // TODO: remove this workaround

        if (clearOnSelect) {
          setValue(null);
        } else {
          setValue(newValue);
        }

        if (!onChange) return;

        onChange(newValue);
      }}
      options={options}
      size="small"
      disabled={disabled}
      blurOnSelect
      autoHighlight
      disableClearable
      getOptionLabel={(option) => option.id}
      isOptionEqualToValue={(option, selectedValue) => option.id === selectedValue.id}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <ImageIcon id={option.id} folder={folder} iconStyle="h-8 w-8 mr-4" />
          {option.id}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
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
  clearOnSelect: false,
  disabled: false,
  label: '',
  className: '',
};

export default Selector;
