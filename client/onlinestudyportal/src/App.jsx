import {BrowserRouter, Routes, Route} from "react-router-dom";

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

// import AdminProtected from "./routes/AdminProtected";

// admin pages
import Alogin from "./pages/adminpages/Alogin";
import Adashboard from "./pages/adminpages/Adashboard";
import Acourses from "./pages/adminpages/Acourses";
import ANotices from "./pages/adminpages/Anotices";

const App = ()=>{
  return <>
  <BrowserRouter>
    {/* User Routes */}
    <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Adashboard />} />
          <Route path="/admin/courses" element={<Acourses />} />
          <Route path="/admin/notices" element={<ANotices />} />
        </Route>

        <Route path="/admin/login" element={<Alogin />} />

        <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
  </>
}
export default App;