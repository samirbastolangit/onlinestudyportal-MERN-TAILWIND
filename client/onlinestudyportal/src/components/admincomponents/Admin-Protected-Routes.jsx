import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";

const AdminProtectedRoute = () => {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute; 