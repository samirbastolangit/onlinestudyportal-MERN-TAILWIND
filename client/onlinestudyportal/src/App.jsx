import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useAuth } from "./store/auth";
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

// protectroutes files
import ProtectedRoutes from "./components/Protected-Routes";
import AdminProtectedRoute from "./components/admincomponents/Admin-Protected-Routes";

// admin pages
import Alogin from "./pages/adminpages/Alogin";
import Adashboard from "./pages/adminpages/Adashboard";
import Acourses from "./pages/adminpages/Acourses";
import ANotices from "./pages/adminpages/Anotices";

const App = ()=>{
  const {isLoggedIn} = useAuth();
  return <>
  <BrowserRouter>
    {/* User Routes */}
    <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/notices" element={<Notices />} />
          {!isLoggedIn && (
            <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            </>
          )}
          {isLoggedIn && (
            <Route path="/logout" element={<Logout />} />
          )}
          <Route element={<ProtectedRoutes/>}>
            <Route path="/myprofile" element={<MyProfile />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route element={<AdminProtectedRoute/>}>
          <Route path="/login" element={<Navigate to='/admin/dashboard' replace/>}/>
          <Route path="/register" element={<Navigate to='/admin/dashboard' replace/>}/>
          <Route path="/admin/login" element={<Navigate to='/admin/dashboard' replace/>}/>
          {/* <Route path="/courses" element={<Navigate to='/admin/courses' replace/>}/>
          <Route path="/notices" element={<Navigate to='/admin/notices' replace/>}/>
          <Route path="/" element={<Navigate to='/admin/dashboard' replace/>}/>
           */}
          <Route path="/admin/dashboard" element={<Adashboard />} />
          <Route path="/admin/courses" element={<Acourses />} />
          <Route path="/admin/notices" element={<ANotices />} />
          </Route>
          {/* <Route path="/admin/users" element={<Ausers />} /> */}
          {/* <Route path="/admin/feedback" element={<Afeedback />} /> */}
          {/* <Route path="/admin/profile" element={<Aprofile />} /> */}
        </Route>

        <Route path="/admin/login" element={<Alogin />} />

        <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
  </>
}
export default App;