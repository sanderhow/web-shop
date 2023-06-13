import { IconButton, styled } from '@mui/material';
import React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavourites } from '../../../Contexts/Favourites/FavouritesContext';
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

const FavouriteHeader: React.FC = () => {
    const {items, setItems} = useFavourites();
    const itemsInFav = items?.length;
    const navigate = useNavigate();
  
    const moveToFav = () => {
      navigate(`/favourites`);
    }
    
    return (
        <IconButton aria-label="favorite">
            <StyledBadge onClick={moveToFav} badgeContent={itemsInFav} color="secondary">
                <FavoriteIcon />
            </StyledBadge>
        </IconButton>
    );
}
  
export default FavouriteHeader;