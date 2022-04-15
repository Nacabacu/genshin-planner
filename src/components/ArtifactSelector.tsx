import { Autocomplete, Box, TextField } from '@mui/material';
import { useState } from 'react';
import { ArtifactData } from '../../types/data';
import { useDataContext } from '../contexts/dataContext';
import ImageIcon, { ImageFolder } from './ImageIcon';

const limit = 2;

function ArtifactSelector() {
  const { artifactList } = useDataContext();
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactData[]>([]);
  const [isLimitReached, setIsLimitReached] = useState(selectedArtifact.length >= limit);

  return (
    <Autocomplete
      value={selectedArtifact}
      onChange={(event, newValue) => {
        setIsLimitReached(newValue.length >= limit);
        setSelectedArtifact(newValue);
      }}
      options={artifactList}
      size="small"
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
      renderInput={(params) => <TextField {...params} disabled={isLimitReached} />}
    />
  );
}

export default ArtifactSelector;
