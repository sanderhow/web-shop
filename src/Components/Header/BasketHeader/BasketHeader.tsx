import { IconButton, styled } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useBasket } from '../../../Contexts/Basket/BasketContext';
import Badge, { BadgeProps } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      color: '#9e9e9e'
    },
  }));

  
  const BasketHeader: React.FC = () => {
    const {basketItems, setBasketItems} = useBasket();
    const navigate = useNavigate();
    
    
    const getNumberOfElements = useCallback(() => {
      let sum = 0;
      if (basketItems) {
        basketItems?.forEach(x => sum += x.quantity);
        //  for (var i = 0; i < basketItems.length; i++) {
          //   sum += basketItems[i].quantity;
          // } 
        }
        return sum;
      },[basketItems]) 
      
      useEffect(() => {
        getNumberOfElements();
      }, [basketItems]);
         
       const itemsInBasket = getNumberOfElements();
       console.log(itemsInBasket);
       
       const moveToBasket = () => {
         navigate(`/basket`);
       }

    return (
        <IconButton aria-label="cart">
            <StyledBadge onClick={moveToBasket} 
              badgeContent={itemsInBasket} 
              color="secondary">
                <ShoppingCartIcon />
            </StyledBadge>
        </IconButton>
    );
}
  
export default BasketHeader;