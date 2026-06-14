import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";

const AdminProtectedRoute = () => {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  if (loading) {
  return <div>Loading...</div>;
  }
  // User is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  // User is logged in but not an admin
  if (!isAdmin) {
    console.log('isadmin inside admin protect',isAdmin);
    return <Navigate to="/" replace />;
  }

  // User is an authenticated admin
  return <Outlet />;
};

export default AdminProtectedRoute;