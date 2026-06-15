import { useState } from "react";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";
const pcourseuri = "http://localhost:3000/api/courses/admin/pcourses";
import { useAuth } from "../../store/auth";

const AddCourse = ({ onClose, refreshCourses }) => {
  const {token} = useAuth();
  const [formData, setFormData] = useState({
    thumbnail: null,
    title: "",
    description: "",
    duration: "",
    fee: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      setFormData({
        ...formData,
        thumbnail: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
  }};

  const handleSubmit = async (e) => {
    try { 
      e.preventDefault();
      const response = await fetch(pcourseuri,{
        method:"POST",
        headers:{
          Authorization :`Bearer ${token}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      });
      if(response.ok){
        const data = await response.json();
        console.log(data.message);
        onClose();
        refreshCourses();
      }
    } 
    catch (error) {
      console.error(error);
    }

    // Backend Example
    // const data = new FormData();
    // data.append("thumbnail", formData.thumbnail);
    // data.append("title", formData.title);
    // data.append("description", formData.description);
    // data.append("duration", formData.duration);
    // data.append("fee", formData.fee);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-3">

      {/* Floating Box */}
      <div
        className="
        bg-white
        rounded-2xl
        shadow-2xl
        w-full
        sm:w-[95%]
        md:w-[88%]
        lg:w-[80%]
        xl:w-[75%]
        h-[92vh]
        sm:h-[85vh]
        md:h-[75vh]
        lg:h-[85vh]
        flex
        flex-col
        overflow-hidden
        "
      >

        {/* Header */}
        <div className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 flex-shrink-0">

          <h2 className="text-xl md:text-2xl font-bold">
            Add New Course
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:scale-110 duration-200"
          >
            <FaTimes />
          </button>

        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6"
        >

          <div className="space-y-5">

            {/* Upload */}

            <div>

              <label className="font-semibold block mb-2">
                Course Thumbnail
              </label>

              <label className="border-2 border-dashed border-gray-300 rounded-xl h-40 flex flex-col justify-center items-center cursor-pointer hover:border-blue-500 transition">

                <FaCloudUploadAlt className="text-5xl text-blue-600 mb-2" />

                <span className="text-gray-500">
                  Click to Upload
                </span>

                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />

              </label>

            </div>

            {/* Title */}

            <div>

              <label className="font-semibold block mb-2">
                Course Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Course Title"
                required
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Description */}

            <div>

              <label className="font-semibold block mb-2">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Course Description"
                required
                className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Duration + Fee */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <label className="font-semibold block mb-2">
                  Duration
                </label>

                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Example: 3 Months"
                  required
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div>

                <label className="font-semibold block mb-2">
                  Fee
                </label>

                <input
                  type="text"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  placeholder="Example: Rs. 5000"
                  required
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-4 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0">

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
            Add Course
          </button>

        </div>
            </form>
      </div>
    </div>


  );
};

export default AddCourse;