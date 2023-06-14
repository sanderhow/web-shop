import { Card } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ISampleProduct } from '../../Components/SmallProductCard/SmallProductCard';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import { BookmarkAdd } from '@mui/icons-material';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import * as P from './parts';
import Rating from '@mui/material/Rating';
import { IBasketTable, useBasket } from '../../Contexts/Basket/BasketContext';

const ProductCard: React.FC = () => {
    const [product, setProduct] = useState<ISampleProduct | null>(null);
    // const [user, setUser] = useState<IUserData | null>(null);
    const { id } = useParams();
    const [rating, setRating] = React.useState<number | null>(2);
    const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
    const {basketItems, setBasketItems} = useBasket();
    
    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get<ISampleProduct>(`https://fakestoreapi.com/products/${id}`);
            setProduct(data);
            setRating(data.rating.rate);
        };
      
        getProduct();
    }, [id]);

    // const { category, description, image, price, rating, title } = product;
    console.log(`rate:${product?.rating.rate}`)

    const addToCart = (event: React.SyntheticEvent) => {
      setIsAddToCart(!isAddToCart);
  
      if (basketItems && product) {
        if (basketItems.some((x) => x.id === product.id)) {
          const elementDuplicated = basketItems.find(x => x.id === product.id);
          if (elementDuplicated) {
            elementDuplicated.quantity++;
          }
        } else {
          const newTableItem: IBasketTable = { ...product, quantity: 1 };
          basketItems.push(newTableItem);
        }
        // setBasketItems([...basketItems, product]);
        // console.log(basketItems);
      }
  
      event.preventDefault();
      event.stopPropagation();
  }

  return (
    <Card variant="outlined" sx={{ width: 620, maxHeight: 720, m: 4, p: 4, borderRadius: '32px', boxShadow: 3, display: 'flex', flexDirection: 'column', }}>
      <Typography level="h1" fontSize="2.5rem">{product?.title}</Typography>
      <Typography level="h2" fontSize="1.8rem" sx={{ mb: 0.5 }}>
      {product?.category}
      </Typography>
      <Typography level="body2" fontSize="1rem">{product?.description}</Typography>
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="lg"
        sx={{ position: 'absolute', top: '3.5rem', right: '28.5rem', }}
      >
        <BookmarkAdd 
         sx={{ fontSize: 30 }}
        />
      </IconButton>
      <AspectRatio 
      minHeight="120px" 
      maxHeight="400px" 
      sx={{ my: 2, width: 500, alignSelf: 'center' }}>
        <P.ProductPhoto
          src={product?.image}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
      >
      {/* <Typography component="legend">Controlled</Typography> */}
      <Rating
        name="simple-controlled"
        size="medium"
        // defaultValue={product?.rating.rate}
       value={rating}
        // defaultValue={2.5}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3" fontSize="1rem">Total price:</Typography>
          <Typography fontSize="1.8rem" fontWeight="600">
            {product?.price}
          </Typography>
        </div>
        <Button 
          startDecorator={<Add />}
          variant="solid"
          size="sm"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600, backgroundColor: '#4dd0e1' }}
          onClick={addToCart}
        >
          ADD TO CART
        </Button>
      </Box>
    </Card>
  );
}
  
export default ProductCard;
