import React, { useState } from "react";
import { Box, Card, Link, Typography, Stack, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { pink } from "@mui/material/colors";
import { translations } from "../../utils/translations";
import { useFavourites } from "../../Contexts/Favourites/FavouritesContext";
import { IBasketTable, useBasket } from "../../Contexts/Basket/BasketContext";
import Cookies from "js-cookie";
import { basketCookieName, favouritesCookieName } from "../../utils/constants";
import MuiAlert from "@mui/material/Alert";

const StyledProductImg = styled("img")({
  top: 0,
  width: "150px",
  height: "200px",
  objectFit: "contain",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  margin: "auto",
});

export interface IProduct {
  id: number;
  name: string;
  cover: string;
  price: number;
  colors: string;
  status: string;
  priceSale: number;
}

interface ISmallProductCardProps {
  product: ISampleProduct;
  isBasket?: boolean;
  isFavourite?: boolean;
}

export interface ISampleProduct {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}

export interface IUserData {
  address: string;
  email: string;
  id: number;
  name: { firstname: string; lastname: string };
  password: string;
  phone: string;
  username: string;
}

const SmallProductCard: React.FC<ISmallProductCardProps> = ({
  product,
  isBasket,
  isFavourite,
}) => {
  const { id, image, price, rating, title } = product;
  const [isClickedFav, setIsClickedFav] = useState<boolean>(false);
  const [isClickedBag, setIsClickedBag] = useState<boolean>(false);
  const navigate = useNavigate();
  const { items, setItems } = useFavourites();
  const { basketItems, setBasketItems } = useBasket();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  //Favourites management//
  //---------------------------------------------------------------------------------------------------------------------------------------------------//
  const clickedFav = (event: React.SyntheticEvent) => {
    setSnackbarMessage(translations.snackBarMessages.addToFav);
    setSnackbarOpen(true);
    setIsClickedFav(!isClickedFav);

    if (items && product) {
      setItems([...items, product]);
      const jsonFavouritesCookie = JSON.stringify([...items, product]);
      Cookies.set(favouritesCookieName, jsonFavouritesCookie, {
        expires: 2000,
      });
    }

    event.preventDefault();
    event.stopPropagation();
  };

  const favouriteRemoved = (event: React.SyntheticEvent) => {
    setIsClickedFav(false);
    setSnackbarMessage(translations.snackBarMessages.deletedFromFav);
    setSnackbarOpen(true);

    const newFavouritesItems = items?.filter((item) => item.id !== id);
    setItems(newFavouritesItems);
    const jsonFavouritesCookie = JSON.stringify(newFavouritesItems);
    Cookies.set(favouritesCookieName, jsonFavouritesCookie, { expires: 2000 });

    event.preventDefault();
    event.stopPropagation();
  };

  let favouritesList = items?.map((x) => x.id);
  const isFavouriteOnList = favouritesList?.some((x) => x === id);

  //Basket management//
  //---------------------------------------------------------------------------------------------------------------------------------------------------//
  const clickedBag = (event: React.SyntheticEvent) => {
    setIsClickedBag(true);
    setSnackbarMessage(translations.snackBarMessages.addToBasket);
    setSnackbarOpen(true);

    if (basketItems && product) {
      if (basketItems.some((x) => x.id === id)) {
        const elementDuplicated = basketItems.find((x) => x.id === id);
        if (elementDuplicated) {
          elementDuplicated.quantity++;
        }
        setBasketItems([...basketItems]);
        const jsonBasketCookie = JSON.stringify([...basketItems]);
        Cookies.set(basketCookieName, jsonBasketCookie, { expires: 2000 });
      } else {
        const newTableItem: IBasketTable = { ...product, quantity: 1 };
        setBasketItems([...basketItems, newTableItem]);
        const jsonBasketCookie = JSON.stringify([...basketItems, newTableItem]);
        Cookies.set(basketCookieName, jsonBasketCookie, { expires: 2000 });
      }
    }

    event.preventDefault();
    event.stopPropagation();
  };

  let basketList = basketItems?.map((x) => x.id);
  const isBasketOnList = basketList?.some((x) => x === id);
  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const clickedProduct = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    navigate(`/product/${id}`);
  };
  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const cutLongTitles = (title: string) => {
    if (title.length >= 60) {
      return `${title.substring(0, 50)}...`;
    } else return title;
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        sx={{ zIndex: 300, display: "block", marginRight: "35px" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          severity="info"
          sx={{ width: "100%" }}
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Card
        sx={{
          minHeight: 400,
          cursor: "pointer",
          paddingTop: "20px",
          "&:hover": { boxShadow: "2px 6px 21px -13px rgba(66, 68, 90, 1);" },
        }}
        onClick={clickedProduct}
      >
        <Box sx={{ position: "relative", width: 300, height: 230 }}>
          {!isFavourite && !isFavouriteOnList ? (
            isClickedFav ? (
              <FavoriteOutlinedIcon
                sx={{
                  position: "absolute",
                  right: 5,
                  p: 1,
                  zIndex: 1,
                  color: pink[500],
                  cursor: "pointer",
                }}
                onClick={clickedFav}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                sx={{
                  position: "absolute",
                  right: 5,
                  p: 1,
                  zIndex: 1,
                  cursor: "pointer",
                }}
                onClick={clickedFav}
              />
            )
          ) : (
            <FavoriteOutlinedIcon
              sx={{
                position: "absolute",
                right: 5,
                p: 1,
                zIndex: 1,
                color: pink[500],
                cursor: "pointer",
              }}
              onClick={favouriteRemoved}
            />
          )}

          {!isBasket && !isBasketOnList ? (
            isClickedBag ? (
              <ShoppingBagIcon
                sx={{
                  position: "absolute",
                  right: 5,
                  mt: 4,
                  p: 1,
                  zIndex: 1,
                  cursor: "pointer",
                }}
                onClick={clickedBag}
              />
            ) : (
              <ShoppingBagOutlinedIcon
                sx={{
                  position: "absolute",
                  right: 5,
                  mt: 4,
                  p: 1,
                  zIndex: 1,
                  cursor: "pointer",
                }}
                onClick={clickedBag}
              />
            )
          ) : (
            <ShoppingBagIcon
              sx={{
                position: "absolute",
                right: 5,
                mt: 4,
                p: 1,
                zIndex: 1,
                cursor: "pointer",
              }}
              onClick={clickedBag}
            />
          )}
          <StyledProductImg alt={title} src={image} />
        </Box>

        <Stack spacing={2} sx={{ p: 3, paddingBottom: "10px" }}>
          <Link color="inherit" underline="hover">
            <Typography
              variant="subtitle2"
              sx={{
                whiteSpace: "wrap",
                width: 250,
              }}
            >
              {cutLongTitles(title)}
            </Typography>
          </Link>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: "text.disabled",
                  textDecoration: "line-through",
                }}
              >
                {Math.round(price + 10)}
              </Typography>
              &nbsp;
              {`${price}$`}
            </Typography>
          </Stack>
          <Box
            sx={{
              "& > legend": { mt: 0.5, fontSize: "1rem" },
              mt: 0.5,
            }}
          >
            <Rating
              name="size-small"
              defaultValue={2}
              size="small"
              value={rating.rate}
              readOnly
            />
          </Box>
        </Stack>
      </Card>
    </>
  );
};

export default SmallProductCard;
