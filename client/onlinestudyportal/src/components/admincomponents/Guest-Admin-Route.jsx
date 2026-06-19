import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";

const AdminGuestRoute = () => {
  const { isLoggedIn, isAdmin } = useAuth();

  if (isLoggedIn && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminGuestRoute;