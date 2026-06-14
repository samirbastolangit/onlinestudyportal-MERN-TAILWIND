import {Navigate,Outlet} from "react-router-dom"
import { useAuth } from "../store/auth";

const ProtectedRoutes = ()=>{
        let {isLoggedIn} = useAuth();
        console.log("isloggedin:",isLoggedIn);
        return isLoggedIn ? <Outlet/> : <Navigate to='/login' replace/>
}
export default ProtectedRoutes;