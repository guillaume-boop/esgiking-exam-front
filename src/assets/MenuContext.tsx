import { createContext, useContext, useState, ReactNode } from "react";

interface MenuItem {
  plat: { id: string; name: string; price: number };
  boisson: { id: string; name: string };
}

interface MenuContextType {
  menus: MenuItem[];
  addMenu: (menu: MenuItem) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menus, setMenus] = useState<MenuItem[]>([]);

  const addMenu = (menu: MenuItem) => {
    setMenus((prevMenus) => [...prevMenus, menu]);
  };

  return <MenuContext.Provider value={{ menus, addMenu }}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
