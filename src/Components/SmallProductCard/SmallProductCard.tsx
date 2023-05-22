import PropTypes from 'prop-types';
import React, { useState } from 'react';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { relative } from 'node:path/win32';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ProductCard from '../../Pages/ProductCard/ProductCard';
import { useNavigate } from "react-router-dom";
// import Label from '../Label/Label';
// utils
// import { fCurrency } from '../../../utils/formatNumber';
// components
// import { ColorPreview } from '../../../components/color-utils';

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

// ShopProductCard.propTypes = {
//   product: PropTypes.object,
// };
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


const SmallProductCard: React.FC<ISmallProductCardProps> = ({ product }) => {
  const { category, description, id, image, price, rating, title } = product;
  const [isClickedFav, setIsClickedFav] = useState<boolean>(false);
  const [isClickedBag, setIsClickedBag] = useState<boolean>(false);
  const [isClickedProduct, setIsClickedProduct] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const clickedFav = () => {
      setIsClickedFav(!isClickedFav);
  }

  const clickedBag = () => {
    setIsClickedBag(!isClickedBag);
}

const clickedProduct = () => {
  navigate(`/product/${id}`);
}

  return (
    <Card
      sx={{ height: 410}}
      onClick={clickedProduct}
    >
      <Box sx={{ position: 'relative', width: 300, height: 250}}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
         >
            {status}
          </Label>
        )} */}
        {/* <span>LABEL</span> */}
        {isClickedFav 
          ?
          <FavoriteOutlinedIcon 
            sx={{ position: 'absolute', right: 5, p: 1, }}onClick={clickedFav}/> 
          :
          <FavoriteBorderOutlinedIcon
            sx={{ position: 'absolute', right: 5, p: 1, }} onClick={clickedFav}
          /> }

          {isClickedBag
          ?
          <ShoppingBagIcon
          sx={{ position: 'absolute', right: 5, mt: 4, p: 1, }} onClick={clickedBag}/>
          :
          <ShoppingBagOutlinedIcon
          sx={{ position: 'absolute', right: 5, mt: 4, p: 1, }} onClick={clickedBag}/>
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
      </Stack>
    </Card>
  );
}

export default SmallProductCard;
