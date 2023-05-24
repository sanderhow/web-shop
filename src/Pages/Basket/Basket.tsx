import React from 'react';
import SmallProductCard from '../../Components/SmallProductCard/SmallProductCard';
import { useBasket } from '../../Contexts/Basket/BasketContext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const Basket: React.FC = () => {
    const {basketItems} = useBasket();

    return (
     <div>
         {basketItems && basketItems.map((x, id) => (
            <div>
                Basket
            </div>
         ))}
    </div>
    );
}
  
export default Basket;
