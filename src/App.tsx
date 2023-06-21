import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useState } from 'react';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import MainPage from "./Pages/MainPage/MainPage";
import Favourites from "./Pages/Favourites/Favourites";
import ProductCard from "./Pages/ProductCard/ProductCard";
import Listing from "./Pages/Listing/Listing";
import Footer from "./Components/Footer/Footer";
import * as P from "./parts";
import { FavouritesContextProvider } from "./Contexts/Favourites/FavouritesContext";
import { BasketContextProvider } from "./Contexts/Basket/BasketContext";
import Header from "./Components/Header/Index";
import { UserContextProvider } from "./Contexts/Auth/UserData";
import BasketIndex from "./Pages/Basket/BasketIndex";
import CheckoutMui from "./Components/Checkout/CheckoutMui";


const App: React.FC = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const handleClickMenu = () => {
    setIsMenuClicked(!isMenuClicked);
    console.log(handleClickMenu)
  } 
  return (
    
    <UserContextProvider>
      <BasketContextProvider>
        <FavouritesContextProvider>
            <BrowserRouter>
            <Navbar
              isMenuClicked={isMenuClicked}
              setIsMenuClicked={setIsMenuClicked}
            /> 
            <P.AppWrapper1>
              <Header
                handleClickMenu={handleClickMenu}
              />
                  <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/favourites" element={<Favourites />} />
                        <Route path="/basket" element={<BasketIndex />} />
                        <Route path="/product/:id" element={<ProductCard />} />
                        <Route path="/listing" element={<Listing />} />
                        <Route path="/checkout" element={<CheckoutMui />} />
                      </Routes>
              <Footer />
            </P.AppWrapper1>
            </BrowserRouter>
          <P.AppWrapper2>
          {/* © COPYRIGHT  */}
              {/* {`${product?.price}$`} */}
              {/* {`© COPYRIGHT ${new Date().getFullYear()}`} */}
          </P.AppWrapper2>
        </FavouritesContextProvider>
      </BasketContextProvider>
    </UserContextProvider>
  );
}

export default App;
