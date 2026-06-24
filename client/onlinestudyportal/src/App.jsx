import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

//layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// user pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Notices from "./pages/Notices";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import MyProfile from "./pages/MyProfile";
import Error from "./pages/Error";

//guest route
import GuestRoute from "./components/Guest-Route";
import AdminGuestRoute from "./components/admincomponents/Guest-Admin-Route";

// protectroutes files
import ProtectedRoutes from "./components/Protected-Routes";
import AdminProtectedRoute from "./components/admincomponents/Admin-Protected-Routes";

// admin pages
import Alogin from "./pages/adminpages/Alogin";
import Adashboard from "./pages/adminpages/Adashboard";
import Acourses from "./pages/adminpages/Acourses";
import ANotices from "./pages/adminpages/Anotices";
import Ausers from "./pages/adminpages/Ausers";
import Alogout from "./pages/adminpages/Alogout";
import Afeedback from "./pages/adminpages/Afeedback";

const App = ()=>{
  return <>
  <BrowserRouter>
  <Routes>

    {/* USER LAYOUT */}
    <Route element={<UserLayout />}>

      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/notices" element={<Notices />} />

      {/* Guest Only */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Logged In Users */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Route>

    {/* ADMIN LOGIN */}
    <Route element={<AdminGuestRoute />}>
      <Route path="/admin/login" element={<Alogin />} />
    </Route>

    {/* ADMIN AREA */}
    <Route element={<AdminLayout />}>
      <Route element={<AdminProtectedRoute />}>

        <Route path="/admin/dashboard" element={<Adashboard />} />
        <Route path="/admin/courses" element={<Acourses />} />
        <Route path="/admin/notices" element={<ANotices />} />
        <Route path="/admin/users" element={<Ausers />} />
        <Route path="/admin/logout" element={<Alogout />} />

      </Route>
    </Route>

    <Route path="*" element={<Error />} />

  </Routes>
</BrowserRouter>
  </>
}
export default App;