import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import SmallProductCard, { ISampleProduct } from '../../Components/SmallProductCard/SmallProductCard';
import { useBasket } from '../../Contexts/Basket/BasketContext';
import * as P from './parts';
import DeleteIcon from '@mui/icons-material/Delete';
import Dropdown1 from '../../Components/Dropdown/Dropdown1';
// import Dropdown1 from '../../Components/Dropdown/Dropdown';


export type IBasketTable = ISampleProduct & { quantity: number };


const Basket = () => {
    
  const {basketItems, setBasketItems} = useBasket();
      
  let tableItems : IBasketTable[] = [];
    
    basketItems?.map((item) => {
      if (tableItems.some((x) => x.id === item.id)) {
        const elementDuplicated = tableItems.find(x => x.id === item.id);
        if (elementDuplicated) {
          const index = tableItems.indexOf(elementDuplicated);
          tableItems[index].quantity++;
        }
      } else {
        const newTableItem = { ...item, quantity: 1 };
        tableItems.push(newTableItem);
      }
    })

    return (
  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
  <TableHead>
    <TableRow>
      <TableCell>Image</TableCell>
      <TableCell align="right">Product</TableCell>
      <TableCell align="right">Price&nbsp;($)</TableCell>
      <TableCell align="right">Quantity&nbsp;</TableCell>
      <TableCell align="right">Basket&nbsp;</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {tableItems && tableItems.map((x, id) => (
      <TableRow
        key={id}
      >
        <TableCell component="th" scope="row">
          <img src={x.image} alt='productImage' width='40' height='40' />
        </TableCell>
        <TableCell align="right">{x.title}</TableCell>
        <TableCell align="right">{x.price}</TableCell>
        <TableCell align="right">
           <Dropdown1 quantity={x.quantity} />
        </TableCell>
        <TableCell align="right">
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
);
}
  
export default Basket;