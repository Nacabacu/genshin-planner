import { Autocomplete, Box, Chip, TextField } from '@mui/material';
import { PropsWithoutRef, useState } from 'react';
import { ArtifactData } from '../../types/data';
import ImageIcon, { ImageFolder } from './ImageIcon';

interface ArtifactSelectorProps {
  options: ArtifactData[];
  disabled?: boolean;
  label?: string;
  className?: string;
}

const limit = 2;

function ArtifactSelector({ options, disabled, label, className }: PropsWithoutRef<ArtifactSelectorProps>) {
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactData[]>([]);
  const [isLimitReached, setIsLimitReached] = useState(selectedArtifact.length >= limit);

  return (
    <Autocomplete
      className={className}
      value={selectedArtifact}
      onChange={(event, newValue) => {
        setIsLimitReached(newValue.length >= limit);
        setSelectedArtifact(newValue);
      }}
      options={options}
      size="small"
      disabled={disabled}
      autoHighlight
      disableClearable
      multiple
      getOptionDisabled={(option) => isLimitReached && !selectedArtifact.includes(option)}
      getOptionLabel={(option) => option.id}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <ImageIcon id={option.id} folder={ImageFolder.Artifacts} iconStyle="h-8 w-8 mr-4" />
          {option.id}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label={label} disabled={isLimitReached || disabled} />}
      renderTags={(value: ArtifactData[], getTagProps) =>
        value.map((option, index) => (
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
  label: '',
  className: '',
};

export default ArtifactSelector;
