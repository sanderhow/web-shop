import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ISampleProduct } from '../../Components/SmallProductCard/SmallProductCard';

const ProductCard: React.FC = () => {
    const [product, setProduct] = useState<ISampleProduct | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get<ISampleProduct>(`https://fakestoreapi.com/products/${id}`);
            setProduct(data);
        };
      
        getProduct();
    }, []);
      
    return (
     <div>
         ProductCard
     </div>
    );
}
  
export default ProductCard;
