import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useBasket } from '../../Contexts/Basket/BasketContext';

interface Dropdown1Props {
  quantity: number;
  id: number;
}

const Dropdown1: React.FC<Dropdown1Props> = ({ quantity, id }) => {
  const {basketItems, setBasketItems} = useBasket();
  const handleBasketQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (basketItems) {
      const copyBasketItems = Array.from(basketItems);
      const element = copyBasketItems?.find(x => x.id === id);
        if (element) {
          element.quantity = Number(value);
        }
      setBasketItems(copyBasketItems);
    }         
  }

  return (
    <Box sx={{ minWidth: 120, fontFamily: `"Roboto","Helvetica","Arial",sans-serif`, fontSize: 0.875 }}>
      <FormControl required fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Quantity
        </InputLabel>
        <NativeSelect 
          onChange={handleBasketQuantity}
          defaultValue={quantity}
          inputProps={{
            name: 'quantity',
            id: 'uncontrolled-native',
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

export default Dropdown1;