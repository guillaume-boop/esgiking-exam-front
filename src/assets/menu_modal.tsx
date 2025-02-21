import React, { useState } from "react";
import { useMenu } from "./MenuContext";
import products from "../json/product.json";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
  const { addMenu } = useMenu();
  const [selectedPlat, setSelectedPlat] = useState<{ id: string; name: string; price: number } | null>(null);
  const [selectedBoisson, setSelectedBoisson] = useState<{ id: string; name: string } | null>(null);
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const plats = products.filter((product) => product.category === "plat").map((p) => ({
    id: p._id,
    name: p.name,
    price: p.price
  }));

  const boissons = products.filter((product) => product.category === "boisson").map((p) => ({
    id: p._id,
    name: p.name
  }));

  const handlePlatSelect = (plat: { id: string; name: string; price: number }) => {
    setSelectedPlat(plat);
    setStep(2);
  };

  const handleBoissonSelect = (boisson: { id: string; name: string }) => {
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
    <div className="menu-modal-overlay">
      <div className="menu-modal-content">
        <h2>Créer un menu</h2>

        {step === 1 && (
          <>
            <h3>Choisissez un plat :</h3>
            <ul className="menu-list">
              {plats.map((plat) => (
                <li key={plat.id} className="menu-item" onClick={() => handlePlatSelect(plat)}>
                  {plat.name} - {plat.price.toFixed(2)} €
                </li>
              ))}
            </ul>
          </>
        )}

        {step === 2 && (
          <>
            <h3>Choisissez une boisson :</h3>
            <ul className="menu-list">
              {boissons.map((boisson) => (
                <li key={boisson.id} className="menu-item" onClick={() => handleBoissonSelect(boisson)}>
                  {boisson.name}
                </li>
              ))}
            </ul>
            {selectedBoisson && <button className="menu-validate" onClick={handleMenuValidation}>Valider le menu</button>}
          </>
        )}

        <button className="menu-close" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default MenuModal;