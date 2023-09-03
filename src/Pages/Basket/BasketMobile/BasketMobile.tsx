import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useBasket } from "../../../Contexts/Basket/BasketContext";
import Dropdown1 from "../../../Components/Dropdown/Dropdown1";
import * as P from "../parts";
import { useNavigate } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useCallback, useEffect } from "react";
import { TableCell, TableRow, useMediaQuery } from "@mui/material";
import { translations } from "../../../utils/translations";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const BasketMobile = () => {
  const { basketItems, setBasketItems } = useBasket();
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery("(max-width:600px)");

  const removeFromBasket = (id: number) => {
    const newBasketItems = basketItems?.filter((item) => item.id !== id);
    setBasketItems(newBasketItems);
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

  return (
    <P.BasketWrapper hasProducts={Boolean(basketItems?.length)}>
      {basketItems?.length ? (
        <>
          <Box
            sx={{
              width: "100%",
              bgColor: "background.paper",
              display: "flex",
              flexDirection: isMobileScreen ? "column" : "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {basketItems.map((x, id) => (
              <P.BasketWrapperMobile>
                <Box sx={{ my: 3, mx: 2 }}>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Typography
                        sx={{ fontSize: 17 }}
                        gutterBottom
                        variant="h4"
                        component="div"
                      >
                        {x.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="h6" component="div">
                        {`${x.price}$`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    sx={{ display: "flex", justifyContent: "center" }}
                    color="text.secondary"
                    variant="body2"
                  >
                    <P.ProductPhoto
                      src={x.image}
                      loading="lazy"
                      alt=""
                      width="70"
                      height="70"
                    />
                  </Typography>
                </Box>

                <Box sx={{ m: 2 }}>
                  <Typography gutterBottom variant="body1">
                    <Dropdown1 quantity={x.quantity} id={x.id} />
                  </Typography>
                </Box>
                <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                  <Button onClick={() => removeFromBasket(x.id)}>Remove</Button>
                </Box>
                <Divider variant="middle" />
              </P.BasketWrapperMobile>
            ))}
          </Box>
          <TableRow
            sx={{
              display: "flex",
              flexDirection: isMobileScreen ? "inherit" : "row-reverse",
              justifyContent: "center",
            }}
          >
            <TableCell sx={{ fontWeight: "bold", fontSize: "h6.fontSize" }}>
              {`${totalBasketSum()}$`}
            </TableCell>
            <TableCell>
              <P.ButtonWrapper>
                <Button
                  onClick={goToCheckout}
                  variant="contained"
                  startIcon={<ShoppingBasketIcon />}
                >
                  {translations.basket.mobileButtonText}
                </Button>
              </P.ButtonWrapper>
            </TableCell>
          </TableRow>
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

export default BasketMobile;
