import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useMenu } from "./MenuContext";
import products from "../json/product.json";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    image: string;
    name: string;
    description: string;
    price?: number;
    category: string;
  };
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const { addMenu } = useMenu();
  const [selectedPlat, setSelectedPlat] = useState<{ id: string; name: string; price: number } | null>(null);
  const [selectedBoisson, setSelectedBoisson] = useState<{ id: string; name: string } | null>(null);
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  console.log("Produit sélectionné :", product);
  console.log("Catégorie détectée :", product.category);
  console.log("Étape actuelle :", step);

  // Liste des plats et boissons pour les menus
  const plats = products.filter((p) => p.category === "plat").map((p) => ({
    id: p._id,
    name: p.name,
    price: p.price,
  }));

  const boissons = products.filter((p) => p.category === "boisson").map((p) => ({
    id: p._id,
    name: p.name,
  }));

  // Gestion du bouton "Ajouter au panier" ou "Créer un menu"
  const handleAddToCart = () => {
    if (product.category === "") {
      setStep(2); // 🔹 Afficher la sélection du menu directement
    } else {
      addToCart(product.id);
      onClose();
    }
  };

  const handlePlatSelect = (plat: { id: string; name: string; price: number }) => {
    console.log("Plat sélectionné :", plat);
    setSelectedPlat(plat);
    setTimeout(() => {
      setStep(3); // 🔹 Passer à l'étape suivante (choix de la boisson)
      console.log("Nouvelle étape :", step);
    }, 100);
  };

  const handleBoissonSelect = (boisson: { id: string; name: string }) => {
    console.log("Boisson sélectionnée :", boisson);
    setSelectedBoisson(boisson);
  };

  const handleMenuValidation = () => {
    if (selectedPlat && selectedBoisson) {
      addMenu({ plat: selectedPlat, boisson: selectedBoisson });
      setSelectedPlat(null);
      setSelectedBoisson(null);
      setStep(1);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Vue 1 : Détails du produit */}
        {step === 1 && (
          <>
            <img src={product.image} alt={product.name} className="modal-image" />
            <h2 className="modal-name">{product.name}</h2>
            <p className="modal-description">{product.description}</p>


            {product.price && <p className="modal-price">{product.price.toFixed(2)}€</p>}
            <button className="modal-close" onClick={onClose}>Fermer</button>
            <button className="modal-add-to-cart" onClick={handleAddToCart}>
              {product.category === "menu" ? "Créer un menu" : "Ajouter au panier"}
            </button>
          </>
        )}

        {/* Vue 2 : Sélection du plat pour le menu */}
        {step === 2 && (
          <>
            <h3>Choisissez un plat :</h3>
            <ul className="menu-list2">
              {plats.map((plat) => (
                <li key={plat.id} className="menu-item2" onClick={() => handlePlatSelect(plat)}>
                  {plat.name} - {`${(plat.price + 2).toFixed(2)} €`}
                </li>
              ))}
            </ul>
            <button className="modal-close" onClick={onClose}>Fermer</button>
          </>
        )}

        {/* Vue 3 : Sélection de la boisson pour le menu */}
        {step === 3 && (
          <>
            <h3>Choisissez une boisson :</h3>
            <ul className="menu-list2">
              {boissons.map((boisson) => (
                <li key={boisson.id} className="menu-item2" onClick={() => handleBoissonSelect(boisson)}>
                  {boisson.name}
                </li>
              ))}
            </ul>
            {selectedBoisson && <button className="menu-validate" onClick={handleMenuValidation}>Valider le menu</button>}
            <button className="modal-close" onClick={onClose}>Fermer</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
