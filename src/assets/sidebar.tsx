import React from 'react';
import { FaHamburger, FaIceCream } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import { BiDrink } from 'react-icons/bi';

type SidebarProps = {
  onCategoryChange: (category: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange }) => {
  return (
    <div className="sidebar">
      <img src="./src/ESGIKING.png" alt="Produit" className="bar-image" />
      <ul>
        <li onClick={() => onCategoryChange('plat')}>
          <FaHamburger />
          <p className="bar-label">Produits</p>
        </li>
        <li onClick={() => onCategoryChange('menu')}>
          <MdFastfood />
          <p className="bar-label">Menu</p>
        </li>
        <li onClick={() => onCategoryChange('boisson')}>
          <BiDrink />
          <p className="bar-label">Boisson</p>
        </li>
        <li onClick={() => onCategoryChange('dessert')}>
          <FaIceCream />
          <p className="bar-label">Dessert</p>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;