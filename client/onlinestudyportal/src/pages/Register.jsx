import { NavLink, useNavigate } from "react-router-dom";
import registerImage from "../assets/form2.png";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    fullname:"",
    email:"",
    password:""
  });
  const handleRFormSubmit = async (e)=>{
    e.preventDefault();
    console.log("user: ",user);

    //connecting with backend and dbs
    const uri = "http://localhost:3000/api/auth/register";
    const response = await fetch(uri,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(user),
    });
    if(response.ok){
      const res_data = await response.json();
      console.log("res_data", res_data);
      setUser({fullname:"",
        email:"",
        password:""
      });
      navigate("/login");
    }    
  }
  const handleRInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setUser({...user,[name]:value});
  }
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-18">

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2">

        {/* Left Side */}

        <div className="bg-indigo-600 text-white flex flex-col justify-center items-center p-8">

          <img
            src={registerImage}
            alt="Register"
            className="w-full max-w-sm rounded-xl mb-6"
          />

          <h1 className="text-3xl font-bold text-center">
            Join Our Learning Community
          </h1>

          <p className="mt-4 text-center text-indigo-100">
            Create your account and get enrolled to exciting courses.
          </p>

        </div>

        {/* Right Side */}

        <div className="p-8 md:p-10 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-2">
            Register
          </h2>

          <p className="text-gray-500 mb-6">
            Fill in your details below.
          </p>

          <form className="space-y-5" onSubmit={handleRFormSubmit}>

            {/* Full Name */}

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="fullname"
                value={user.fullname}
                onChange={handleRInput}
                placeholder="Your full name"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleRInput}
                placeholder="example@gmail.com"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
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
                onChange={handleRInput}
                placeholder="Create password"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

              <input
                type="submit"
                value="register now"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition"
              />
                
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-indigo-600 font-semibold"
            >
              Login
            </NavLink>
          </p>

        </div>

      </div>

    </section>
  );
};

export default Register;