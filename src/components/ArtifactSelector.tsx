import { Autocomplete, Box, Chip, TextField } from '@mui/material';
import { PropsWithoutRef, useState } from 'react';
import { ArtifactData } from '../../types/data';
import ImageIcon, { ImageFolder } from './ImageIcon';

interface ArtifactSelectorProps {
  options: ArtifactData[];
  disabled?: boolean;
  value?: ArtifactData[];
  onChange?: (value: ArtifactData[]) => void;
  label?: string;
  className?: string;
}

const limit = 2;

function ArtifactSelector({
  options,
  disabled,
  value: defaultValue,
  onChange,
  label,
  className,
}: PropsWithoutRef<ArtifactSelectorProps>) {
  const [value, setValue] = useState<ArtifactData[]>(defaultValue || []);
  const [isLimitReached, setIsLimitReached] = useState(value.length >= limit);

  return (
    <Autocomplete
      className={className}
      value={value}
      onChange={(event, newValue) => {
        setIsLimitReached(newValue.length >= limit);
        setValue(newValue);

        if (!onChange) return;

        onChange(newValue);
      }}
      options={options}
      size="small"
      disabled={disabled}
      autoHighlight
      disableClearable
      multiple
      getOptionDisabled={(option) => isLimitReached && !value.includes(option)}
      getOptionLabel={(option) => option.id}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <ImageIcon id={option.id} folder={ImageFolder.Artifacts} iconStyle="h-8 w-8 mr-4" />
          {option.id}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label={label} disabled={isLimitReached || disabled} />}
      renderTags={(dataList: ArtifactData[], getTagProps) =>
        dataList.map((option, index) => (
          <Chip
            icon={<ImageIcon id={option.id} folder={ImageFolder.Artifacts} iconStyle="h-6 w-6" />}
            label={option.id}
            size="small"
            {...getTagProps({ index })}
          />
        ))
      }
    />
  );
}

ArtifactSelector.defaultProps = {
  disabled: false,
  value: null,
  onChange: null,
  label: '',
  className: '',
};

export default ArtifactSelector;
