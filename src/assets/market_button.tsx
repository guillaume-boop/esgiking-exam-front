import React, { useState } from "react";
import { FaShoppingCart, FaUtensils } from "react-icons/fa"; // ✅ Ajout de l'icône de menu
import { MdFastfood } from 'react-icons/md';
import { useCart } from "./CartContext"; // Produits normaux
import { useMenu } from "./MenuContext"; // Menus
import { useUser } from "./UserContext"; // Utilisateur connecté
import Modal from "./modal"; // ✅ Assure-toi que `Modal.tsx` est bien importé

const MarketButton: React.FC = () => {
  const { cart } = useCart(); // Produits classiques
  const { menus } = useMenu(); // Menus
  const { user } = useUser(); // Utilisateur connecté
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calcul du total du panier (Produits + Menus)
  const totalPrice = cart.reduce((sum, product) => sum + (product.price || 0), 0) +
                     menus.reduce((sum, menu) => sum + menu.plat.price, 0);

  // Fonction pour valider la commande
  const handleValidation = () => {
    const productsList = cart
      .map((product) => `- ${product.name} : ${product.price ? product.price.toFixed(2) + "€" : "Prix non disponible"}`)
      .join("\n");

  const menusList = menus
    .map((menu) => `- ${menu.plat.name} + ${menu.boisson.name} : ${(menu.plat.price + 2).toFixed(2)}€`)
    .join("\n");

    const finalOrder = `
      Commande enregistrée\n\n
      ID du user : ${user ? user.id : "00000000"}\n
      Nom : ${user ? user.firstName + " " + user.lastName : "invité"}\n
      Promotion : Non\n\n
      Produits dans la commande :\n${productsList}\n
      Menus dans la commande :\n${menusList}\n\n
      Total : ${totalPrice.toFixed(2)} €
    `;

    alert(finalOrder);
    window.location.reload(); // Refresh après validation
  };

  return (
    <>
      <button className="market-button" onClick={() => setIsModalOpen(true)}>
        <FaShoppingCart />
        {cart.length + menus.length > 0 && <span className="cart-count">{cart.length + menus.length}</span>}
      </button>

      {isModalOpen && (
        <div className="cart-modal-overlay">
          <div className="cart-modal-content">
            <h2>Votre Panier</h2>
            <div className="cart-total">
              <h3>Total: {totalPrice.toFixed(2)} €</h3>
            </div>

            {/* Affichage des produits et des menus */}
            {cart.length === 0 && menus.length === 0 ? (
              <p>Votre panier est vide.</p>
            ) : (
              <ul className="cart-items2">
                {/* Produits classiques */}
                {cart.map((product, index) => (
                  <li key={index} className="cart-item2">
                    <img src={product.image} alt={product.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3>{product.name}</h3>
                      <p>{product.price ? `${product.price.toFixed(2)} €` : "Prix non disponible"}</p>
                    </div>
                  </li>
                ))}
                
                {/* Menus avec une icône */}
                {menus.map((menu, index) => (
                  <li key={index} className="cart-item2">
                    <div className="cart-item-icon">
                       <MdFastfood />
                    </div>
                    <div className="cart-item-details">
                      <h3>{menu.plat.name} + {menu.boisson.name}</h3>
                      <p>{`${(menu.plat.price + 2).toFixed(2)} €`}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <button className="cart-modal-close" onClick={() => setIsModalOpen(false)}>Fermer</button>
            <button className="cart-modal-valid" onClick={handleValidation}>Valider</button>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketButton;
