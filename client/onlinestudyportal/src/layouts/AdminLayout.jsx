import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admincomponents/Anavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export default AdminLayout;