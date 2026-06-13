import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const AdminProtected = ({ children }) => {

    const { isLoggedIn, user } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminProtected;