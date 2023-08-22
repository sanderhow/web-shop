import React from "react";
import SmallProductCard from "../../Components/SmallProductCard/SmallProductCard";
import { useFavourites } from "../../Contexts/Favourites/FavouritesContext";
import * as P from "./parts";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { translations } from "../../utils/translations";

const Favourites: React.FC = () => {
  const { items } = useFavourites();
  const navigate = useNavigate();

  return (
    <P.FavouritesWrapper hasProducts={Boolean(items?.length)}>
      {items?.length ? (
        items.map((x, id) => (
          <div>
            <SmallProductCard key={id + x.title} product={x} isFavourite />
          </div>
        ))
      ) : (
        <P.DontHaveProducts>
          <div style={{ display: "flex" }}>
            <div>{translations.favourites.noItemsInFav}</div>
            <FavoriteOutlinedIcon
              sx={{
                color: pink[500],
              }}
            />
          </div>
          <Button variant="contained" onClick={() => navigate(`/listing`)}>
            {translations.favourites.addProducts}
          </Button>
        </P.DontHaveProducts>
      )}
    </P.FavouritesWrapper>
  );
};

export default Favourites;
