import React from "react";
import { useCart } from "./CartContext"; // Import du contexte

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    image: string;
    name: string;
    description: string;
    price?: number;
  };
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;

  const { addToCart } = useCart(); // Récupère la fonction pour ajouter au panier

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={product.image} alt={product.name} className="modal-image" />
        <h2 className="modal-name">{product.name}</h2>
        <p className="modal-description">{product.description}</p>
        {product.price && <p className="modal-price">${product.price.toFixed(2)}</p>}
        <button className="modal-close" onClick={onClose}>Fermer</button>
        <button className="modal-add-to-cart" onClick={() => addToCart(product.id)}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default Modal;
