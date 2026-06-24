import { NavLink, useNavigate } from "react-router-dom";
import loginImage from "../assets/login3.png";
import { useState } from "react";
import {useAuth} from "../store/auth";
import { toast } from 'react-toastify';

const Login = () => {
  const {storeTokenInLs} = useAuth();

  const navigate = useNavigate();
  const [user,setUser] = useState({
    email:"",
    password:""
  });
  const handleLInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]:value
    });
  }
  const handleLFormSubmit = async (e)=>{
    e.preventDefault();

    // connecting with backend and dbs
    const uri = import.meta.env.VITE_LOGIN_URI;
    const response = await fetch(uri,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(user),
    })
    const res_data = await response.json();
    if(response.ok){
      toast.success(res_data.message);
      storeTokenInLs(res_data.token);
      setUser({
        email:"",
        password:"",
      });
      if (res_data.isAdmin) {
        navigate("/admin/dashboard");
      } 
      else {
        navigate("/");
      }
    }
    else{
      toast.error(res_data.message);
    }
  }
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-18">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2">

        {/* Left Side */}
        <div className="bg-blue-600 text-white flex flex-col justify-center items-center p-8">
          <img
            src={loginImage}
            alt="Login"
            className="w-full max-w-sm rounded-xl mb-6"
          />

          <h1 className="text-3xl font-bold text-center">
            Welcome Back!
          </h1>

          <p className="mt-4 text-center text-blue-100">
            Continue your learning journey by signing into your account.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-10 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-2">
            Login
          </h2>

          <p className="text-gray-500 mb-6">
            Enter your credentials below.
          </p>

          <form className="space-y-5" onSubmit={handleLFormSubmit}>

            {/* Email */}

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleLInput}
                placeholder="example@gmail.com"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleLInput}
                placeholder="Enter password"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="submit"
              value="login now"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            />
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="text-blue-600 font-semibold"
            >
              Register
            </NavLink>
          </p>

        </div>

      </div>
    </section>
  );
};

export default Login;