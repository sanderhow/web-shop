import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useBasket } from "../../Contexts/Basket/BasketContext";
import * as P from "./parts";
import DeleteIcon from "@mui/icons-material/Delete";
import Dropdown1 from "../../Components/Dropdown/Dropdown1";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useNavigate } from "react-router-dom";
import { translations } from "../../utils/translations";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const Basket = () => {
  const { basketItems, setBasketItems } = useBasket();
  const navigate = useNavigate();

  const removeFromBasket = (id: number) => {
    if (!basketItems) return;

    const cloneBasketItems = [...basketItems];
    const itemIndex = cloneBasketItems.findIndex((item) => item.id === id);
    if (cloneBasketItems[itemIndex].quantity > 1) {
      cloneBasketItems[itemIndex].quantity--;
    } else {
      cloneBasketItems.splice(itemIndex, 1);
    }

    setBasketItems([...cloneBasketItems]);
  };

  const totalBasketSum = useCallback(() => {
    let sum = 0;
    basketItems?.forEach((x) => (sum += x.price * x.quantity));
    return Math.round(sum * 100) / 100;
  }, [basketItems]);

  useEffect(() => {
    totalBasketSum();
  }, [basketItems, totalBasketSum]);

  const goToCheckout = () => {
    navigate(`/checkout`);
  };

  const titleFormatter = (title: string) => {
    if (title.length > 50) {
      return title.slice(0, 51) + "...";
    } else {
      return title;
    }
  };

  return (
    <P.BasketWrapper hasProducts={Boolean(basketItems?.length)}>
      {basketItems?.length ? (
        <>
          <TableContainer sx={{ overflowX: "unset" }} component={Paper}>
            <Table size="medium" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell align="right">Product</TableCell>
                  <TableCell align="right">Price&nbsp;($)</TableCell>
                  <TableCell align="right">Quantity&nbsp;</TableCell>
                  <TableCell align="right">Basket&nbsp;</TableCell>
                  <TableCell align="right">Total&nbsp;($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {basketItems.map((x, id) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      <img
                        src={x.image}
                        alt="productImage"
                        width="40"
                        height="40"
                      />
                    </TableCell>

                    <TableCell align="right">
                      {titleFormatter(x.title)}
                    </TableCell>
                    <TableCell align="right">{x.price}</TableCell>
                    <TableCell align="right">
                      <Dropdown1 quantity={x.quantity} id={x.id} />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="delete">
                        <DeleteIcon onClick={() => removeFromBasket(x.id)} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">{x.price * x.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableRow>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "h6.fontSize" }}
                  align="right"
                >{`${totalBasketSum()}$`}</TableCell>
              </TableRow>
            </Table>
          </TableContainer>
          <P.ButtonWrapper>
            <Button
              onClick={goToCheckout}
              variant="contained"
              startIcon={<ShoppingBasketIcon />}
            >
              {translations.basket.desktopButtonText}
            </Button>
          </P.ButtonWrapper>
        </>
      ) : (
        <P.DontHaveProducts>
          <div style={{ display: "flex" }}>
            <div>{translations.basket.noItemsInBasket}</div>
            <SentimentVeryDissatisfiedIcon />
          </div>
          <Button variant="contained" onClick={() => navigate(`/listing`)}>
            {translations.basket.addProducts}
          </Button>
        </P.DontHaveProducts>
      )}
    </P.BasketWrapper>
  );
};

export default Basket;
