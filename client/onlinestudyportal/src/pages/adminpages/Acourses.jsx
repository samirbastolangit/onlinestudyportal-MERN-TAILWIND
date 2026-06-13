// Acourses.jsx
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AddCourse from "../../components/admincomponents/Aaddcourse";
import { useState } from "react";

const Acourses = () => {

        const [showAddCourse, setShowAddCourse] = useState(false);
  // Dummy Data
  const courses = [
    {
      id: 1,
      thumbnail:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      title: "Full Stack Web Development",
      description:
        "Learn HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB from beginner to advanced.",
      duration: "6 Months",
      fee: "Rs. 15,000",
    },
    {
      id: 2,
      thumbnail:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600",
      title: "Python Programming",
      description:
        "Master Python with projects, automation, data structures, and backend development.",
      duration: "4 Months",
      fee: "Rs. 10,000",
    },
    {
      id: 3,
      thumbnail:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
      title: "UI/UX Design",
      description:
        "Learn Figma, wireframing, prototyping, and modern UI design principles.",
      duration: "3 Months",
      fee: "Rs. 8,500",
    },
  ];

  const deleteCourse = (id) => {
    // fetch(`/api/course/${id}`,{
    //   method:"DELETE"
    // })
    console.log("Delete Course :", id);
  };

  const updateCourse = (id) => {
    // Open update component/modal here
    console.log("Update Course :", id);
  };

  const addCourse = () => {
    // Navigate/Open Add Course Component
    console.log("Add Course");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 mt-[80px]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Courses
          </h1>
          <p className="text-gray-500">
            View, Update and Delete existing courses.
          </p>
        </div>

        <button
          onClick={() => setShowAddCourse(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-lg transition"
        >
          <FaPlus />
          Add Course
        </button>
        {showAddCourse && (
  <AddCourse onClose={() => setShowAddCourse(false)} />
)}
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl duration-300 overflow-hidden"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {course.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {course.description}
              </p>

              <div className="space-y-2 mb-5">
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {course.duration}
                </p>

                <p>
                  <span className="font-semibold">Fee:</span>{" "}
                  {course.fee}
                </p>
              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => updateCourse(course.id)}
                  className="flex-1 flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                >
                  <FaEdit />
                  Update
                </button>

                <button
                  onClick={() => deleteCourse(course.id)}
                  className="flex-1 flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                >
                  <FaTrash />
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Acourses;