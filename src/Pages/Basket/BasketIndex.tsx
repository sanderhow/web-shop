import * as React from "react";
import BasketMobile from "./BasketMobile/BasketMobile";
import Basket from "./Basket";
import { useMediaQuery } from "@mui/material";
import * as P from "./parts";

const BasketIndex = () => {
  const isTabletOrMobileScreen = useMediaQuery("(max-width:1000px)");

  return (
    <P.BasketWrapper hasProducts={true}>
      {isTabletOrMobileScreen ? <BasketMobile /> : <Basket />}
    </P.BasketWrapper>
  );
};

export default BasketIndex;
