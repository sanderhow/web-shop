import React from 'react';
import SmallProductCard from '../../Components/SmallProductCard/SmallProductCard';
import { useFavourites } from '../../Contexts/Favourites/FavouritesContext';

const Favourites: React.FC = () => {
    const {items} = useFavourites();

    return (
     <div>
         {items && items.map((x, id) => (
            <div>
            <SmallProductCard key={id} product={x} />
            </div>
       ))}
     </div>
    );
}
  
export default Favourites;
