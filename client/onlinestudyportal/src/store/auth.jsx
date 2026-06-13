import { createContext, useContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

        const [token, setToken] = useState(localStorage.getItem("token"));
        let isLoggedIn = !!token;
        const logoutFunc = ()=>{
                setToken("");
                return localStorage.removeItem("token");
        }
        const storeTokenInLs = (jwtToken) =>{
                setToken(jwtToken);
                return localStorage.setItem("token",jwtToken);
        };
        return <AuthContext.Provider value={{storeTokenInLs,token,logoutFunc,isLoggedIn}}>
                {children}
        </AuthContext.Provider>
}

export const useAuth = ()=>{
        return useContext(AuthContext);
}