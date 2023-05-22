import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import MainPage from "./Pages/MainPage/MainPage";
import Favourites from "./Pages/Favourites/Favourites";
import Basket from "./Pages/Basket/Basket";
import ProductCard from "./Pages/ProductCard/ProductCard";
import Listing from "./Pages/Listing/Listing";
import Checkout from "./Pages/Checkout/Checkout";
import Footer from "./Components/Footer/Footer";
import * as P from "./parts";

const App: React.FC = () => {

  return (
  <P.AppWrapper>
    <BrowserRouter>
      <Navbar/>
        <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/product/:id" element={<ProductCard />} />
              <Route path="/listing" element={<Listing />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
      </BrowserRouter>
      <Footer />
      {/* © COPYRIGHT {new Date().getFullYear()}
      </Footer> */}
    </P.AppWrapper>
  );
}

export default App;
