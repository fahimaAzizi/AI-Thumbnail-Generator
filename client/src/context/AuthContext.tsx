 import { createContext, ReactNode, useState } from "react";
import type { IUser } from "../types/user"; // adjust path
import toast from "react-hot-toast";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  login: (user: {email: string; password: string}) => Promise<void>;
  signUp: (user: {name:string; email: string; password: string}) => Promise<void>;
  logout: () => Promise<void>
  }

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: ()=> {},
  user: null,
  setUser: ()=> {},
  login: async () => {},
  signUp: async () => {},
  logout: async () => {},

})



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const signUp = async ({name, email, password} : {name: string; email: string ; password: string}) =>{
    try {
      const {data} =await api.post('/api/auth/register',{name,email,password});
      if(data.user){
        setUser(data.user as IUser)
        setIsLoggedIn(true)
      }
      toast.success(data(data.message))
      
    } catch (error) {
      console.log(error)      
    }
  }

  
   

  const login = async ({ email, password} : { email: string ; password: string}) =>{
    try {
      const {data} =await api.post('/api/auth/login',{email,password});
      if(data.user){
        setUser(data.user as IUser)
        setIsLoggedIn(true)
      }
      toast.success(data(data.message))
      
    } catch (error) {
      console.log(error)      
    }
  
  };
  const logout = async ()=>{
     try {
      const {data} =await api.post('/api/auth/logout');
      setUser(null)
        setIsLoggedIn(false)
      toast.success(data(data.message))
      
      
    } catch (error) {
      console.log(error)      
    }
  }
  const fetchUser = async ()=>{
       try {
      const {data} =await api.post('/api/auth/logout');
      setUser(null)
        setIsLoggedIn(false)
      toast.success(data(data.message))
      
      
    } catch (error) {
      console.log(error)      
    }
  }

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