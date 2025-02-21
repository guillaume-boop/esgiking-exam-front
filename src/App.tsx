import "./App.css";
import Card from "./assets/card";
import Sidebar from "./assets/sidebar";
import ConnectButton from "./assets/connect_button";
import MarketButton from "./assets/market_button";
import { CartProvider } from "./assets/CartContext";
import { UserProvider } from "./assets/UserContext";
import { MenuProvider } from "./assets//MenuContext"; 
import React, { useState } from "react";

function App() {
  const [category, setCategory] = useState<string>("plat");

  return (
     <UserProvider>
      <CartProvider>
        <MenuProvider>
          <ConnectButton />
          <Sidebar onCategoryChange={setCategory} />
          <Card category={category} />
          <MarketButton />
        </MenuProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
