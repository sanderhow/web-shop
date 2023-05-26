import React from 'react';
import SmallProductCard from '../../Components/SmallProductCard/SmallProductCard';
import { useFavourites } from '../../Contexts/Favourites/FavouritesContext';
import * as P from './parts';

const Favourites: React.FC = () => {
    const {items} = useFavourites();

    return (
     <P.FavouritesWrapper>
         {items && items.map((x, id) => (
            <div>
            <SmallProductCard 
                key={id+x.title} 
                product={x} 
                isFavourite
            />
            </div>
       ))}
     </P.FavouritesWrapper>
    );
}
  
export default Favourites;
