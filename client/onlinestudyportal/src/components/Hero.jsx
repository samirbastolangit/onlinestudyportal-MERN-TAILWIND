import heroImage from "../assets/onlinestudy.jpeg";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth"

const Hero = () => {
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();

  return (
    /*
      min-h-screen
      -> makes this section take at least full screen height

      flex flex-col lg:flex-row
      -> Mobile: text above image
      -> Large screen: text beside image

      items-center
      -> vertically align items

      justify-between
      -> put text and image apart

      max-w-7xl mx-auto
      -> center content and limit width
    */

    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20 gap-12">

      {/* LEFT SIDE */}

      <div className="flex-1 text-center lg:text-left">

        <p className="text-blue-600 font-semibold text-lg">
          Welcome to Online Tutor
        </p>

        <h1
          className="
          mt-4
          text-4xl
          sm:text-5xl
          lg:text-6xl
          font-bold
          leading-tight
          "
        >
          Learn Anywhere,
          <br />
          Learn Anytime.
        </h1>

        <p
          className="
          mt-6
          text-gray-600
          text-base
          sm:text-lg
          max-w-xl
          "
        >
          Join thousands of students learning Web Development,
          App Development, UI/UX, Graphics, Software Engineering
          and much more from expert instructors.
        </p>

        {/* Buttons */}

        <div
          className="
          mt-8
          flex
          flex-col
          sm:flex-row
          gap-4
          justify-center
          lg:justify-start
          "
        >
          <button
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            transition
            "
            onClick={()=>{
              navigate("/courses");
            }}
          >
            Explore Courses
          </button>

         {!isLoggedIn && (
          <button
            className="
            border
            border-blue-600
            text-blue-600
            hover:bg-blue-600
            hover:text-white
            px-6
            py-3
            rounded-xl
            transition
            "
            onClick={()=>{
              navigate("/register")
            }}
          >
            Register Now
          </button>
         )} 
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 flex justify-center">

        <img
          src={heroImage}
          alt="Learning"
          className="
          w-full
          max-w-md
          lg:max-w-xl
          rounded-2xl
          shadow-xl
          "
        />

      </div>

    </section>
  );
};

export default Hero;