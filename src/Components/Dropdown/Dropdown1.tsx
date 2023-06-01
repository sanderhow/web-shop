import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function Dropdown1() {
  return (
    <Box sx={{ minWidth: 120, fontFamily: `"Roboto","Helvetica","Arial",sans-serif`, fontSize: 0.875 }}>
      <FormControl required fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Quantity
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'quantity',
            id: 'uncontrolled-native',
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
