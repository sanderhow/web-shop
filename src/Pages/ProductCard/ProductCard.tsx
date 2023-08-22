import { Card } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ISampleProduct } from "../../Components/SmallProductCard/SmallProductCard";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import * as P from "./parts";
import Rating from "@mui/material/Rating";
import { IBasketTable, useBasket } from "../../Contexts/Basket/BasketContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getSimpleProductUrl } from "../../utils/paths";
import Cookies from "js-cookie";
import { basketCookieName } from "../../utils/constants";

const ProductCard: React.FC = () => {
  const [product, setProduct] = useState<ISampleProduct | null>(null);
  const { id } = useParams();
  const [rating, setRating] = React.useState<number | null>(2);
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const { basketItems, setBasketItems } = useBasket();

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get<ISampleProduct>(
        `${getSimpleProductUrl}${id}`
      );
      setProduct(data);
      setRating(data.rating.rate);
    };

    getProduct();
  }, [id]);

  const addToCart = (event: React.SyntheticEvent) => {
    setIsAddToCart(!isAddToCart);

    if (basketItems && product) {
      if (basketItems.some((x) => x.id === Number(id))) {
        const elementDuplicated = basketItems.find((x) => x.id === Number(id));
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

  return (
    <Card
      variant="outlined"
      sx={{
        width: 620,
        maxHeight: 1220,
        m: 4,
        p: 4,
        overflow: "visible",
        borderRadius: "32px",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ fontSize: 32 }}>{product?.title}</Typography>
      <Typography sx={{ mb: 0.5, fontSize: 24, fontWeight: "bold" }}>
        {product?.category}
      </Typography>
      <Typography sx={{ fontSize: 16 }}>{product?.description}</Typography>
      <AspectRatio
        minHeight="120px"
        maxHeight="400px"
        sx={{ my: 2, width: 500, alignSelf: "center" }}
      >
        <P.ProductPhoto src={product?.image} loading="lazy" alt="" />
      </AspectRatio>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Rating
          name="simple-controlled"
          size="medium"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography sx={{ fontSize: 16, color: "grey" }}>
            Total price:
          </Typography>
          <Typography fontSize="1.8rem" fontWeight="600">
            {`${product?.price}$`}
          </Typography>
        </div>
        <Button
          sx={{ ml: "auto", fontWeight: 600 }}
          variant="outlined"
          size="sm"
          onClick={addToCart}
        >
          <AddShoppingCartIcon />
          ADD TO CART
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
