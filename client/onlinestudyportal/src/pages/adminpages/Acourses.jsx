// Acourses.jsx
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AddCourse from "../../components/admincomponents/Aaddcourse";
import { useState, useEffect } from "react";
import UpdateCourse from "../../components/admincomponents/Aupdatecourse";
const getcourseuri = "http://localhost:3000/api/courses/";
const rcourseuri = "http://localhost:3000/api/courses/admin/rcourses/";

import { useAuth } from "../../store/auth";
const Acourses = () => {
        const {token} = useAuth();
        //function to fetch all courses
        const [courses,setCourses] = useState([]);
        const getCourses = async ()=>{
          try {
            const response = await fetch(getcourseuri,{
              method:"GET"
      });
      if(response.ok){
        const data = await response.json();
        setCourses(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getCourses();
  }, []);
  
  //delete course function
  const deleteCourse = async (id) => {
    try {
      const response = await fetch(`${rcourseuri}${id}`,{
        method:"DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if(response.ok){
        const msg = await response.json();
        console.log(msg.message);
        getCourses();
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  //update course function
  const [showUpdateCourse, setShowUpdateCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  const updateCourse = (course) => {
  setSelectedCourse(course);
  setShowUpdateCourse(true);
  };
  
  //add course function
  const [showAddCourse, setShowAddCourse] = useState(false);
  

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
  <AddCourse 
  onClose={() => setShowAddCourse(false)}
  refreshCourses={getCourses} />
)}
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {courses.map((course) => (
          <div
            key={course._id}
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
                  onClick={() => updateCourse(course)}
                  className="flex-1 flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                >
                  <FaEdit />
                  Update
                </button>
{
  showUpdateCourse && (
    <UpdateCourse
      course={selectedCourse}
      onClose={() => setShowUpdateCourse(false)}
      refreshCourses={getCourses}
    />
  )
}
                <button
                  onClick={() => deleteCourse(course._id)}
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