import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SmallProductCard, {
  ISampleProduct,
} from "../../Components/SmallProductCard/SmallProductCard";
import { getProductsUrl } from "../../utils/paths";
import * as P from "./parts";

const Listing: React.FC = () => {
  const [allProducts, setAllProducts] = useState<ISampleProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const { data } = await axios.get<ISampleProduct[]>(getProductsUrl);
      setAllProducts(data);
      setLoading(false);
    };

    try {
      getProducts();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <P.ListingWrapper>
      {!loading ? (
        allProducts.map((x, id) => (
          <div>
            <SmallProductCard key={id + x.title} product={x} />
          </div>
        ))
      ) : (
        <P.LoadingWrapper>
          <CircularProgress />
        </P.LoadingWrapper>
      )}
    </P.ListingWrapper>
  );
};

export default Listing;
