import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import CryptoMarket from "./Pages/Crypto/CryptoMarket";
import RecentlyAdded from "./Pages/Crypto/RecentlyAdded";
import Exchange from "./Pages/Exchange/Exchange";
import Home from "./Pages/Home";
import Knowledge from "./Pages/Knowledge/Knowledge";
import NFT from "./Pages/NFT/NFT";
import Product from "./Pages/Product/Product";
import NotFound from "./Pages/NotFound";
import LargeMove from "./Pages/Crypto/LargeMove";
import Spot from "./Pages/Exchange/Spot";
import Delivatives from "./Pages/Exchange/Delivatives";
import RelatedCoin from "./Pages/NFT/RelatedCoin";
import TopSales from "./Pages/NFT/TopSales";
import MarketPlace from "./Pages/NFT/MarketPlace";
import CryptoBasics from "./Pages/Knowledge/CryotoBasics";
import TipsTutorials from "./Pages/Knowledge/TipsTutorials";
import Store from "./Pages/Product/Store";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<CryptoMarket />} />
        <Route path="recently_added" element={<RecentlyAdded />} />
        <Route path="large_move" element={<LargeMove />} />

        <Route path="exchange" element={<Exchange />} />
        <Route path="exchange/spot" element={<Spot />} />
        <Route path="exchange/delivatives" element={<Delivatives />} />

        <Route path="nft" element={<NFT />} />
        <Route path="nft/related_coin" element={<RelatedCoin />} />
        <Route path="nft/top_sales" element={<TopSales />} />
        <Route path="nft/market_place" element={<MarketPlace />} />

        <Route path="knowledge" element={<Knowledge />} />

        <Route path="knowledge/crypto_basics" element={<CryptoBasics />} />
        <Route
          path="knowledge/tips_and_tutorials"
          element={<TipsTutorials />}
        />

        <Route path="product" element={<Product />} />
        <Route path="product/store" element={<Store />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
