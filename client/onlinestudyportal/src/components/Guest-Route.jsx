import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";

const GuestRoute = () => {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isLoggedIn) {
    return (
      <Navigate
        to={isAdmin ? "/admin/dashboard" : "/"}
        replace
      />
    );
  }

  return <Outlet />;
};

export default GuestRoute;