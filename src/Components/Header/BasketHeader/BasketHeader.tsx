import { IconButton, styled } from '@mui/material';
import React from 'react';
import { useBasket } from '../../../Contexts/Basket/BasketContext';
import Badge, { BadgeProps } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
    const itemsInBasket = basketItems?.length;

    return (
        <IconButton aria-label="cart">
            <StyledBadge badgeContent={itemsInBasket} color="secondary">
                <ShoppingCartIcon />
            </StyledBadge>
        </IconButton>
    );
}
  
export default BasketHeader;