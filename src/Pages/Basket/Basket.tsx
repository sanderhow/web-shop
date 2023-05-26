import React from 'react';
import SmallProductCard from '../../Components/SmallProductCard/SmallProductCard';
import { useBasket } from '../../Contexts/Basket/BasketContext';

const Basket: React.FC = () => {
    const {basketItems} = useBasket();

    return (
     <div>
         {basketItems && basketItems.map((x, id) => (
            <div>
                <SmallProductCard 
                    key={id} 
                    product={x} 
                    isBasket
                />
            </div>
         ))}
    </div>
    );
}
  
export default Basket;
