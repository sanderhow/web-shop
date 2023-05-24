import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { ISampleProduct } from "../../Components/SmallProductCard/SmallProductCard";

interface IBasketContext {
    basketItems: ISampleProduct[] | null;
    setBasketItems(items: ISampleProduct[] | null): void;
}

const BasketContext = createContext<IBasketContext | undefined>(undefined)
BasketContext.displayName = "BasketContext";

export const BasketContextProvider = ({ children } : PropsWithChildren) => {
    const [basketItems, setBasketItems] = useState<ISampleProduct[] | null>([]);
    
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
