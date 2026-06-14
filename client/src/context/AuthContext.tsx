 import { createContext, ReactNode, useState } from "react";
import type { IUser } from "../types/user"; // adjust path

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  login: (user: {email: string; password: string}) => Promise<void>;
   signUp: (user: {name:string; email: string; password: string}) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (user: IUser) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};