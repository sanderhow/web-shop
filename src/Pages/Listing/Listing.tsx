import axios from "axios";
import React, { useEffect, useState } from "react";
import SmallProductCard, {
  ISampleProduct,
} from "../../Components/SmallProductCard/SmallProductCard";
import * as P from "./parts";

const Listing: React.FC = () => {
  const [allProducts, setAllProducts] = useState<ISampleProduct[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get<ISampleProduct[]>(
        "https://fakestoreapi.com/products"
      );
      setAllProducts(data);
    };

    getProducts();
  }, []);

  return (
    <P.ListingWrapper>
      {allProducts.map((x, id) => (
        <div>
          <SmallProductCard key={id + x.title} product={x} />
        </div>
      ))}
    </P.ListingWrapper>
  );
};

export default Listing;
