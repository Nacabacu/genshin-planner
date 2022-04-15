import { Autocomplete, Box, TextField } from '@mui/material';
import { useState } from 'react';
import { CharacterData } from '../../types/data';
import { useDataContext } from '../contexts/dataContext';
import ImageIcon, { ImageFolder } from './ImageIcon';

function CharacterSelector() {
  const { characterList } = useDataContext();
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterData>(characterList[0]);

  return (
    <Autocomplete
      value={selectedCharacter}
      onChange={(event, newValue) => setSelectedCharacter(newValue)}
      options={characterList}
      size="small"
      autoHighlight
      disableClearable
      getOptionLabel={(option) => option.id}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <ImageIcon id={option.id} folder={ImageFolder.Characters} iconStyle="h-8 w-8 mr-4" />
          {option.id}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <ImageIcon id={selectedCharacter.id} folder={ImageFolder.Characters} iconStyle="h-8 w-8 mr-4" />
            ),
          }}
        />
      )}
    />
  );
}

export default CharacterSelector;
