import PropTypes from 'prop-types';
import React, { useState } from 'react';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ProductCard from '../../Pages/ProductCard/ProductCard';
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { pink } from '@mui/material/colors';
import { useFavourites } from '../../Contexts/Favourites/FavouritesContext';
import { useBasket } from '../../Contexts/Basket/BasketContext';


// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '150px',
  height: '200px',
  objectFit: 'contain',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
});

// ----------------------------------------------------------------------

export interface IProduct {
  id: number;
  name: string;
  cover: string;
  price: number;
  colors: string; 
  status: string; 
  priceSale: number;
}

interface ISmallProductCardProps {
  product: ISampleProduct;
  isBasket?: boolean;
  isFavourite?: boolean;
}

export interface ISampleProduct {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number, 
    count: number
  };
  title: string;
}

export interface IUserData {
  address: string;
  email: string;
  id: number;
  name: {firstname: string, lastname: string};
  password: string;
  phone: string;
  username: string;
}

interface IUserProps {
  user: IUserData;
}


const SmallProductCard: React.FC<ISmallProductCardProps> = ({ product, isBasket, isFavourite }) => {
  const { category, description, id, image, price, rating, title } = product;
  const [isClickedFav, setIsClickedFav] = useState<boolean>(false);
  const [isClickedBag, setIsClickedBag] = useState<boolean>(false);
  const [isClickedProduct, setIsClickedProduct] = useState<boolean>(false);
  const navigate = useNavigate();
  const {items, setItems} = useFavourites();
  const {basketItems, setBasketItems} = useBasket();
  const [isFavouriteRemoved, setIsFavouriteRemoved] = useState<boolean>(false);

//Favourites management//
//---------------------------------------------------------------------------------------------------------------------------------------------------//
  const clickedFav = (event: React.SyntheticEvent) => {
      setIsClickedFav(!isClickedFav);

      if (items && product) {
       
        setItems([...items, product]);
      }
      
      event.preventDefault();
      event.stopPropagation();
  }

  const favouriteRemoved = (event: React.SyntheticEvent) => {
    setIsClickedFav(!isClickedFav);

  const newFavouritesItems = items?.filter(item => 
      item.id !== id
    );
    setItems(newFavouritesItems);

    event.preventDefault();
    event.stopPropagation();
  }

  let favouritesList = items?.map((x) => x.id);
  const isFavouriteOnList = favouritesList?.some(x => x === id);

  //Basket management//
  //---------------------------------------------------------------------------------------------------------------------------------------------------//
  const clickedBag = (event: React.SyntheticEvent) => {
    console.log('clickedBag');
    setIsClickedBag(true);

    if (basketItems && product) {
      setBasketItems([...basketItems, product]);
    }

    event.preventDefault();
    event.stopPropagation();
}

  let basketList = basketItems?.map((x) => x.id);
  const isBasketOnList = basketList?.some(x => x === id);
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  const clickedProduct = () => {
    navigate(`/product/${id}`);
  }
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  return (
    <Card
      sx={{ height: 450}}
      onClick={clickedProduct}
    >
      <Box sx={{ position: 'relative', width: 300, height: 230, }}>
        {(!isFavourite && !isFavouriteOnList) ?
          (isClickedFav ?
            <FavoriteOutlinedIcon sx={{ position: 'absolute', right: 5, p: 1, zIndex: 1, color: pink[500] }}onClick={clickedFav}/> 
            :
            <FavoriteBorderOutlinedIcon sx={{ position: 'absolute', right: 5, p: 1, zIndex: 1, }} onClick={clickedFav}/>
          ) : 
          <FavoriteOutlinedIcon sx={{ position: 'absolute', right: 5, p: 1, zIndex: 1, color: pink[500] }}onClick={favouriteRemoved}/>
          }

          {(!isBasket && !isBasketOnList) ?
            (isClickedBag ?
                <ShoppingBagIcon sx={{ position: 'absolute', right: 5, mt: 4, p: 1, zIndex: 1, }} onClick={clickedBag}/>
                :
                <ShoppingBagOutlinedIcon sx={{ position: 'absolute', right: 5, mt: 4, p: 1, zIndex: 1,}} onClick={clickedBag}/>
            ) :
            <ShoppingBagIcon sx={{ position: 'absolute', right: 5, mt: 4, p: 1, zIndex: 1, }} onClick={clickedBag}/>
            }
        <StyledProductImg alt={title} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2"
           sx={{
            whiteSpace: 'wrap',
            width: 250,
          }}
          >
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {Math.round(price + 10)}
            </Typography>
            &nbsp;
            {price}
          </Typography>
        </Stack>
        <Box
        sx={{
          '& > legend': { mt: 0.5, fontSize: '1rem' },
          mt: 0.5
        }}
      >
        {/* <Typography component="legend">Read only</Typography> */}
        <Rating name="size-small" defaultValue={2} size="small" value={rating.rate} readOnly />
        </Box>
      </Stack>
    </Card>
  );
}

export default SmallProductCard;

