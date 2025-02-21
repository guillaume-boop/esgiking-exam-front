import "./App.css";
import Card from "./assets/card";
import Sidebar from "./assets/sidebar";
import ConnectButton from "./assets/connect_button";
import MarketButton from "./assets/market_button";
import { CartProvider } from "./assets/CartContext";
import React, { useState } from "react";

function App() {
  const [category, setCategory] = useState<string>("plat");

  return (
    <CartProvider>
      <ConnectButton />
      <Sidebar onCategoryChange={setCategory} />
      <Card category={category} />
      <MarketButton /> 
    </CartProvider>
  );
}

export default App;
