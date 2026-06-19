import { useAuth } from "../../store/auth";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
const Alogout = ()=>{
        const {logoutFunc} = useAuth();
        useEffect(()=>{
                logoutFunc()
        },[logoutFunc]);
        return <Navigate to="/admin/login" />
}
export default Alogout;