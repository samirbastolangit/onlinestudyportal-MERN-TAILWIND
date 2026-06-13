import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/onlinestudylogo.png";
import profileicon from "../assets/profileicon.png";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  let {isLoggedIn} = useAuth();
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
            <NavLink to="/" className="font-bold text-2xl hover:text-blue-600">
                Online Tutor
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <NavLink to="/courses" className="hover:text-blue-600">
              Our Courses
            </NavLink>

            <NavLink to="/notices" className="hover:text-blue-600">
              Notices
            </NavLink>
            {isLoggedIn
            ?
            <NavLink to="/logout  " className="hover:text-blue-600">
              Logout
            </NavLink>
            :<>
            <NavLink to="/register" className="hover:text-blue-600">
              Register
            </NavLink>
            <NavLink to="/login" className="hover:text-blue-600">
              Login
            </NavLink>
            </>}
          </nav>

          {/* Desktop Profile */}
          <div className="hidden md:flex items-center gap-3">
            <img
              src={profileicon}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <NavLink to="/myprofile" className="hover:text-blue-600">
              Profile
            </NavLink>
          </div>

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
              <NavLink to="/courses" className='hover:text-blue-600'>Our Courses</NavLink>
              <NavLink to="/notices" className='hover:text-blue-600'>Notices</NavLink>
              <NavLink to="/register" className='hover:text-blue-600'>Register</NavLink>
              <NavLink to="/login" className='hover:text-blue-600'>Login</NavLink>

              <div className="flex items-center gap-3 pt-2 border-t">
                <img
                  src={profileicon}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <NavLink to="/myprofile" className='hover:text-blue-600'>Profile</NavLink>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export { Navbar };