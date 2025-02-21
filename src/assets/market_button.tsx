import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";

const MarketButton: React.FC = () => {
  const { cart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
   const totalPrice = cart.reduce((sum, product) => sum + (product.price || 0), 0);

    // Fonction pour valider la commande
  const handleValidation = () => {
    // Création du message d'alerte
    const productsList = cart.map((product) => `- ${product.name} : ${product.price ? product.price.toFixed(2) + "€" : "Prix non disponible"}`).join("\n");
    
    alert(
      `Commande enregistrée\n\n` +
      `ID du user : undefined}\n` +
      `Promotion : Non\n\n` +
      `Produits dans la commande :\n${productsList}\n\n` +
      `Total : ${totalPrice.toFixed(2)} €`
    );
    
    window.location.reload();
  };

  return (
    <>
      <button className="market-button" onClick={() => setIsModalOpen(true)}>
        <FaShoppingCart />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </button>

      {isModalOpen && (
        <div className="cart-modal-overlay">
          <div className="cart-modal-content">
            <h2>Votre Panier</h2>
            <div className="cart-total">
                  <h3>Total: {totalPrice.toFixed(2)} €</h3>
                </div>

            {cart.length === 0 ? (
              <p>Votre panier est vide.</p>
            ) : (
              <ul className="cart-items2">
                {cart.map((product, index) => (
                  <li key={index} className="cart-item2">
                    <img src={product.image} alt={product.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3>{product.name}</h3>
                      <p>{product.price ? `${product.price.toFixed(2)} €` : "Prix non disponible"}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <button className="cart-modal-close" onClick={() => setIsModalOpen(false)}>
              Fermer
            </button>
            <button className="cart-modal-valid" onClick={handleValidation}>
              Valider
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketButton;
