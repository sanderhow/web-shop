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


const ProductCard: React.FC = () => {
    const [product, setProduct] = useState<ISampleProduct | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get<ISampleProduct>(`https://fakestoreapi.com/products/${id}`);
            setProduct(data);
        };
      
        getProduct();
    }, [id]);
    
    // const { category, description, image, price, rating, title } = product;

    return (
    
    <Card variant="outlined" sx={{ width: 620, height: 720, m: 4, p: 4, borderRadius: '32px', boxShadow: 3 }}>
      <Typography level="h1">{product?.title}</Typography>
      <Typography level="h2" fontSize="xl" sx={{ mb: 0.5 }}>
      {product?.category}
      </Typography>
      <Typography level="body2">{product?.description}</Typography>
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
        <BookmarkAdd />
      </IconButton>
      <AspectRatio minHeight="120px" maxHeight="400px" sx={{ my: 2, width: 1, height: 1 }}>
        <img
          src={product?.image}
          loading="lazy"
          alt=""
          width= "220px"
          height= "320px"
          object-fit= "contain"
        //   sx={{ width: 220, height: 320 }}
        />
      </AspectRatio>
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {product?.price}
          </Typography>
        </div>
        <Button 
          startDecorator={<Add />}
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          ADD TO CART
        </Button>
      </Box>
    </Card>
  );
}
  
export default ProductCard;
