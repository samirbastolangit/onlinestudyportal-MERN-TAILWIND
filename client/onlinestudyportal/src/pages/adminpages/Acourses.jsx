// Acourses.jsx 
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AddCourse from "../../components/admincomponents/Aaddcourse";
import { useState, useEffect } from "react";
import UpdateCourse from "../../components/admincomponents/Aupdatecourse";
const getcourseuri = import.meta.env.VITE_ADMIN_GET_COURSE_URI;
const rcourseuri = import.meta.env.VITE_ADMIN_DELETE_COURSE_URI;
import { toast } from "react-toastify";
import { useAuth } from "../../store/auth";

const Acourses = () => {
        const {token} = useAuth();

        const [showDeleteModal, setShowDeleteModal] = useState(false);
const [courseToDelete, setCourseToDelete] = useState(null);

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
  
  const confirmDeleteCourse = (id) => {
  setCourseToDelete(id);
  setShowDeleteModal(true);
};

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
        toast.success("Course has been deleted");
        getCourses();
      }
      else{
        toast.error("deleting course failed");
      }
    } catch (error) {
      toast.error("deleting course failed");
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
              src={course.thumbnailImg}
              alt="course thumbnail img"
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {course.title}
              </h2>
              <div className="mt-4 flex justify-between">
                  <span>
    Published: {new Date(course.createdAt).toLocaleDateString()}
  </span>
                  <span>
    Modified: {new Date(course.updatedAt).toLocaleDateString()}
  </span>
                </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {course.description}
              </p>

              <div className="space-y-2 mb-5">
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {course.duration} {Number(course.duration) > 1 ? "Months":"Month"}
                </p>

                <p>
                  <span className="font-semibold">Fee:</span>{" "}
                  NRs. {course.fee}
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
  onClick={() => confirmDeleteCourse(course._id)}
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
      {showDeleteModal && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-3">
        Delete Course?
      </h2>

      <p className="text-gray-600 mb-5">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            setShowDeleteModal(false);
            setCourseToDelete(null);
          }}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            await deleteCourse(courseToDelete);
            setShowDeleteModal(false);
            setCourseToDelete(null);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Now
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Acourses;