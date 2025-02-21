import { createContext, useContext, useState, ReactNode } from "react";
import customers from "../json/customer.json";
import users from "../json/user.json";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface UserContextType {
  user: User | null;
  login: (customerId: string) => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (customerId: string): boolean => {
    const customer = customers.find((c) => c._id === customerId);
    if (!customer) return false;

    const user = users.find((u) => u._id === customer.user);
    if (!user) return false;

    setUser({ id: user._id, firstName: user.firstName, lastName: user.lastName });
    return true;
  };

  const logout = () => setUser(null);

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
