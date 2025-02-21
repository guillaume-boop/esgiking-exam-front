import React, { useState } from "react";
import { useCart } from "./CartContext"; // Pour ajouter au panier
import MenuModal from "./menu_modal"; // Import du modal pour les menus

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    image: string;
    name: string;
    description: string;
    price?: number;
    category: string; // Vérifier si c'est un menu ou un produit classique
  };
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false); // État pour ouvrir MenuModal

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (product.category === "menu") {
     alert("Menu ajouté au panier");
    } else {
      addToCart(product.id);
      onClose();
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <img src={product.image} alt={product.name} className="modal-image" />
          <h2 className="modal-name">{product.name}</h2>
          <p className="modal-description">{product.description}</p>
          {product.price && <p className="modal-price">${product.price.toFixed(2)}</p>}
          <button className="modal-close" onClick={onClose}>Fermer</button>
          <button className="modal-add-to-cart" onClick={handleAddToCart}>
            {product.category === "menu" ? "Créer un menu" : "Ajouter au panier"}
          </button>
        </div>
      </div>

      {/* Vérifier que `MenuModal` s'ouvre bien */}
      {isMenuModalOpen && (
        <MenuModal isOpen={isMenuModalOpen} onClose={() => setIsMenuModalOpen(false)} />
      )}
    </>
  );
};

export default Modal;