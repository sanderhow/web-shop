import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import SmallProductCard, { ISampleProduct } from '../../Components/SmallProductCard/SmallProductCard';
import { IBasketTable, useBasket } from '../../Contexts/Basket/BasketContext';
import * as P from './parts';
import DeleteIcon from '@mui/icons-material/Delete';
import Dropdown1 from '../../Components/Dropdown/Dropdown1';
// import Dropdown1 from '../../Components/Dropdown/Dropdown';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';




const Basket = () => {
  const {basketItems, setBasketItems} = useBasket();
      
  const removeFromBasket = (id: number) => {
       const newBasketItems = basketItems?.filter(item => item.id !== id );
       setBasketItems(newBasketItems);
    }
  
  const totalBasketSum = useCallback(() => {
    let sum = 0;
    basketItems?.forEach(x => sum += (x.price * x.quantity));
    return sum;
  },[basketItems])

  useEffect(() => {
    totalBasketSum();
  }, [basketItems]);

    return (
<P.BasketWrapper>
  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
  <TableHead>
    <TableRow>
      <TableCell>Image</TableCell>
      <TableCell align="right">Product</TableCell>
      <TableCell align="right">Price&nbsp;($)</TableCell>
      <TableCell align="right">Quantity&nbsp;</TableCell>
      <TableCell align="right">Basket&nbsp;</TableCell>
      <TableCell align="right">Total&nbsp;($)</TableCell>
    </TableRow>

  </TableHead>
  <TableBody>
    {basketItems && basketItems.map((x, id) => (
      <TableRow
      key={id}
      >
        <TableCell component="th" scope="row">
          <img src={x.image} alt='productImage' width='40' height='40' />
        </TableCell>
        <TableCell align="right">{x.title}</TableCell>
        <TableCell align="right">{x.price}</TableCell>
        <TableCell align="right">
           <Dropdown1 
              quantity={x.quantity} 
              id={x.id}/>
        </TableCell>
        <TableCell align="right">
            <IconButton aria-label="delete">
                <DeleteIcon 
                  onClick={() => removeFromBasket(x.id)}
                  />
            </IconButton>
        </TableCell>
        <TableCell align="right">{x.price*x.quantity}</TableCell>
      </TableRow>
    ))}
      {/* <TableRow>
        <TableCell align="right">TOTAL</TableCell>
      </TableRow> */}
    
    <TableRow>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell 
          sx = {{ fontWeight: 'bold', fontSize: 'h6.fontSize' }}
          align="right">{`${totalBasketSum()}$`}</TableCell>
    </TableRow>
    
  </TableBody>
</Table>
</TableContainer>
<P.ButtonWrapper>
  <Button variant="contained" startIcon={<ShoppingBasketIcon />}>
      Proceed to checkout
  </Button>
</P.ButtonWrapper>
</P.BasketWrapper>
);
}
  
export default Basket;