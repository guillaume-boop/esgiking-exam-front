import { createContext, useContext, useState, ReactNode } from "react";
import productData from "../json/product.json"; // Produits
import imageData from "../json/img.json"; // Images

interface Product {
  id: string;
  name: string;
  price?: number;
  image: string;
}

interface CartContextType {
  cart: Product[];
  addToCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (id: string) => {
    const product = productData.find((p) => p._id === id);
    const image = imageData.find((img) => img.id === id);

    if (product) {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: product._id,
          name: product.name,
          price: product.price,
          image: image ? image.image : "https://via.placeholder.com/150", // Image par défaut si non trouvée
        },
      ]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
