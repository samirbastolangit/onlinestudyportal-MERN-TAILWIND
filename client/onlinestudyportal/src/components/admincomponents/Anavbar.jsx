import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/onlinestudylogo.png";
import { useAuth } from "../../store/auth";

const Anavbar = () => {
    const {isLoggedIn} = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-5 h-16 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="w-14 h-10 object-contain"
            />
            <NavLink to="/admin/dashboard" className="font-bold text-2xl hover:text-blue-600">
                Online Tutor
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <NavLink to="/admin/dashboard" className="hover:text-blue-600">
              Dashboard
            </NavLink>
            <NavLink to="/admin/courses" className="hover:text-blue-600">
              Courses
            </NavLink>
            <NavLink to="/admin/notices" className="hover:text-blue-600">
              Notices
            </NavLink>
            <NavLink to="/admin/users" className="hover:text-blue-600">
              Users
            </NavLink>
            <NavLink to="/admin/feedback" className="hover:text-blue-600">
              Feedback
            </NavLink>
            {isLoggedIn ?
            <NavLink to="/admin/logout" className="hover:text-blue-600">
              Logout
            </NavLink>
            :
            <NavLink to="/admin/login" className="hover:text-blue-600">
              Login
            </NavLink>
            }
            
          </nav>

          {/* Hamburger Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <nav className="flex flex-col p-5 gap-4 font-medium">
              <NavLink to="/admin/dashboard" className='hover:text-blue-600'>Dashboard</NavLink>
              <NavLink to="/admin/courses" className='hover:text-blue-600'>Courses</NavLink>
              <NavLink to="/admin/notices" className='hover:text-blue-600'>Notices</NavLink>
              <NavLink to="/admin/users" className='hover:text-blue-600'>Users</NavLink>
              <NavLink to="/admin/feedback" className='hover:text-blue-600'>Feedback</NavLink>
              <NavLink to="/admin/logout" className='hover:text-blue-600'>Logout</NavLink>

            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Anavbar;