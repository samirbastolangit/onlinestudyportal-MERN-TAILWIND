import { useState, useEffect } from "react";
import courseImage from "../assets/graphics.png";

const Courses = () => {
  // courseData should be an array because we'll use filter() and map()
  const [courseData, setCourseData] = useState([]);

  // Search text
  const [search, setSearch] = useState("");

  const uri = "http://localhost:3000/api/courses/";

  // Function to fetch all courses
  const getCourses = async () => {
    try {
      const response = await fetch(uri, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setCourseData(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Fetch only once when component mounts
  useEffect(() => {
    getCourses();
  }, []);

  // Filter courses according to search
  const filteredCourses = courseData.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gray-100 min-h-screen py-20 px-4">

      {/* Heading */}

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center">
          Our Courses
        </h1>

        <p className="text-gray-600 text-center mt-3">
          Learn industry-ready skills from expert instructors.
        </p>

        {/* Search Box */}

        <div className="flex justify-center mt-8">

          <input
            type="text"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-[450px] border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Course Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

          {filteredCourses.map((course) => (

            <div
              // Use MongoDB _id instead of id
              key={course._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >

              {/* Course Image */}

              <img
                // If thumbnail doesn't exist, use local image
                src={course.thumbnail || courseImage}
                alt={course.title}
                className="w-full h-52 object-cover"
              />

              {/* Card Body */}

              <div className="p-5">

                <h2 className="text-2xl font-bold">
                  {course.title}
                </h2>

                <p className="text-yellow-500 mt-2">
                  ⭐⭐⭐⭐☆
                </p>

                <p className="text-gray-600 mt-3">
                  {course.description}
                </p>

                <div className="mt-4 flex justify-between">

                  <span>
                    ⏰ {course.duration}
                  </span>

                  <span className="font-semibold text-green-600">
                    {course.fee}
                  </span>

                </div>

                <button
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
                >
                  Get Enrolled
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Courses;