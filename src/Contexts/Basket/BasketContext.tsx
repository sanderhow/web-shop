import Cookies from "js-cookie";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { ISampleProduct } from "../../Components/SmallProductCard/SmallProductCard";

export type IBasketTable = ISampleProduct & { quantity: number };

interface IBasketContext {
    basketItems: IBasketTable[] | undefined;
    setBasketItems(items: IBasketTable[] | undefined): void;
}

const BasketContext = createContext<IBasketContext | undefined>(undefined)
BasketContext.displayName = "BasketContext";

export const BasketContextProvider = ({ children } : PropsWithChildren) => {
    const [basketItems, setBasketItems] = useState<IBasketTable[] | undefined>([]);

    useEffect(() => {
        const readCookie = Cookies.get('basketCookie');
        if (readCookie) {
            const arrayBasketCookie = JSON.parse(readCookie);
            setBasketItems(arrayBasketCookie);
        }
    }, []);
    
    const contextData: IBasketContext = useMemo(
        () => ({
            basketItems,
            setBasketItems
        }),
        [basketItems, setBasketItems]
    );

    return (
        <BasketContext.Provider value={contextData}>{children}</BasketContext.Provider>
    )
};

export default BasketContext;

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (context === undefined) {
        throw new Error('Context not found.');
    }
    return context;
}
