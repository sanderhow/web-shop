import * as React from 'react';
import BasketMobile from './BasketMobile/BasketMobile';
import Basket from './Basket';
import { useMediaQuery } from '@mui/material';
import * as P from './parts'


const BasketIndex = () => {

    const isMobileScreen = useMediaQuery('(max-width:800px)');
    
  return (
      <P.BasketWrapper>

      {isMobileScreen 
        ?
        <BasketMobile/>
        :
        <Basket/>
      }
    </P.BasketWrapper>
  );
}

export default BasketIndex;