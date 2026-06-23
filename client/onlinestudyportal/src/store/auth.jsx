import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(null);  
  const [loading,setLoading] = useState(true);
  let isLoggedIn = !!token;
  
  const logoutFunc = () => {
    setToken(null);
    setUser(null);
    setIsAdmin(null);
    setLoading(false);
    toast.success("logout successfully");
    return localStorage.removeItem("token");
  };
  const storeTokenInLs = (jwtToken) => {
    setToken(jwtToken);
    return localStorage.setItem("token", jwtToken);
  };
  const userAuthentication = async () => {
  try {
    const uri = "http://localhost:3000/api/users/";
    const response = await fetch(uri,{
      method:"GET",
      headers:{
        Authorization:`Bearer ${token}`,
      },
    });
  console.log("Fetching user...");

    if(response.ok){
      const data = await response.json();
      setUser(data.user);
      setIsAdmin(data.user.isAdmin);
    }
  }
  finally{
    setLoading(false);
  }
};
  useEffect(() => {
    if (token) {
      setLoading(true);
      userAuthentication();
    } else {
      setLoading(false);   // IMPORTANT
      setUser(null);
      setIsAdmin(false);
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{ storeTokenInLs, token, logoutFunc, isLoggedIn, user, isAdmin,loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
