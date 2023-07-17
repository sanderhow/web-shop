import Cookies from "js-cookie";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ISampleProduct } from "../../Components/SmallProductCard/SmallProductCard";
import { favouritesCookieName } from "../../utils/constants";

interface IFavouritesContext {
  items: ISampleProduct[] | undefined;
  setItems(items: ISampleProduct[] | undefined): void;
}

const FavouritesContext = createContext<IFavouritesContext | undefined>(
  undefined
);
FavouritesContext.displayName = "FavouritesContext";

export const FavouritesContextProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<ISampleProduct[] | undefined>([]);

  useEffect(() => {
    const readCookie = Cookies.get(favouritesCookieName);
    if (readCookie) {
      const arrayFavCookie = JSON.parse(readCookie);
      setItems(arrayFavCookie);
    }
  }, []);

  const contextData: IFavouritesContext = useMemo(
    () => ({
      items,
      setItems,
    }),
    [items, setItems]
  );

  return (
    <FavouritesContext.Provider value={contextData}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContext;

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error("Context not found.");
  }
  return context;
};
