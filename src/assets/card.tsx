import React, { useState } from 'react';
import Modal from './modal';
import productData from '../json/product.json';
import menuData from '../json/menu.json';
import images from '../json/img.json'; 

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  restaurant: string;
  promotions: any[];
  createdAt: string;
  updatedAt: string;
};

type Menu = {
  _id: string;
  name: string;
  description: string;
  products: any[];
};

type Image = {
  id: string;
  image: string;
};

type CardProps = {
  category: string;
};

const Card: React.FC<CardProps> = ({ category }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | Menu | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour trouver l'image par ID
  const getImageUrl = (id: string): string => {
    const image = images.find((img: Image) => img.id === id);
    return image ? image.image : 'https://via.placeholder.com/300x200.png?text=Image+Non+Trouvée';
  };

  // Fonction pour ouvrir le modal avec les détails du produit
  const handleCardClick = (item: Product | Menu) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Afficher les produits ou les menus en fonction de la catégorie
  const displayData = category === 'menu' ? menuData : productData.filter((product) => product.category === category);

  return (
    <div className="content">
      <ul className="product-cards">
        {displayData.map((item: Product | Menu, index: number) => (
          <li key={index} className="product-card" onClick={() => handleCardClick(item)}>
            {/* Image dynamique basée sur l'ID */}
            <img
              src={getImageUrl(item._id)}
              alt={item.name}
              className="product-image"
            />
            <h3 className="product-name">{item.name}</h3>
            {/* Afficher le prix uniquement pour les produits */}
            {'price' in item && <p className="product-price">{item.price.toFixed(2)}€</p>}
          </li>
        ))}
      </ul>

      {/* Modal pour afficher les détails du produit */}
      {selectedProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={{
            id: 'price' in selectedProduct ? selectedProduct._id : '',
            image: getImageUrl(selectedProduct._id),
            name: selectedProduct.name,
            description: selectedProduct.description,
            price: 'price' in selectedProduct ? selectedProduct.price : undefined,
          }}
        />
      )}
    </div>
  );
};

export default Card;