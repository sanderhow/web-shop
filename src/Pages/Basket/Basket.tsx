import React from 'react';
import SmallProductCard from '../../Components/SmallProductCard/SmallProductCard';
import { useBasket } from '../../Contexts/Basket/BasketContext';
import * as P from './parts';

const Basket: React.FC = () => {
    const {basketItems} = useBasket();

    return (
     <P.BasketWrapper>
         {basketItems && basketItems.map((x, id) => (
            <div>
                <SmallProductCard 
                    key={id} 
                    product={x} 
                    isBasket
                />
            </div>
         ))}
    </P.BasketWrapper>
    );
}
  
export default Basket;
