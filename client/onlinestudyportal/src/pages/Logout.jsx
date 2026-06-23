import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = ()=>{
        const {logoutFunc} = useAuth();
        useEffect(()=>{
                logoutFunc()
        },[logoutFunc]);
        return <Navigate to="/login" />
}
export default Logout;