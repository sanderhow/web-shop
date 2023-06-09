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
import { TableCell, TableRow } from "@mui/material";

const BasketMobile = () => {
  const { basketItems, setBasketItems } = useBasket();
  const navigate = useNavigate();

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
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {basketItems &&
        basketItems.map((x, id) => (
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
      <TableRow sx={{ display: "flex", flexDirection: "row-reverse" }}>
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
              Proceed
            </Button>
          </P.ButtonWrapper>
        </TableCell>
      </TableRow>
    </Box>
  );
};

export default BasketMobile;
