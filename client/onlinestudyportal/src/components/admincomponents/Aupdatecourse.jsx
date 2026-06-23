import { useState } from "react";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";
const ucourseuri = "http://localhost:3000/api/courses/admin/ucourses/";
import { useAuth } from "../../store/auth";
import { toast } from 'react-toastify';

const UpdateCourse = ({ course, onClose, refreshCourses }) => {
  const {token} = useAuth();

    const [courseThumbnail, setCourseThumbnail] = useState(null);
    const [courseThumbnailPreview, setCourseThumbnailPreview] = useState(null);
    const [isSaving,setIsSaving] = useState(false);

  const [courseData, setCourseData] = useState({
    title: course.title,
    description: course.description,
    duration: course.duration,
    fee: course.fee,
  });

  const handleChange = (e) => {
  setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });  
  };

  const handleImage = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setCourseThumbnail(file);
  setCourseThumbnailPreview(URL.createObjectURL(file));

};

  const handleSubmit = async (e) => {
    if (isSaving) return;
    try { 
      setIsSaving(true);
      e.preventDefault();

      const formdata = new FormData();

        formdata.append("title", courseData.title);
        formdata.append("description", courseData.description);
        formdata.append("duration", courseData.duration);
        formdata.append("fee", courseData.fee);

        if(courseThumbnail){
    formdata.append(
      "courseThumbnail",
      courseThumbnail
    )
  }
      const response = await fetch(`${ucourseuri}${course._id}`,{
        method:"PUT",
        headers:{
          Authorization :`Bearer ${token}`,
        },
        body: formdata,
      });
      if(response.ok){
        toast.success("Course has been updated");
        refreshCourses();
        onClose();
      }
      else{
        toast.error("Problem while updating course may be due to invalid input");
      }
    } 
    catch (error) {
      toast.error("Problem while updating course may be due to invalid input");
      console.error(error);
    }
    finally{
      setIsSaving(false);
    }
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
            Update Your Course
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
                Course Thumbnail <span className="text-red-400 text-[14px]">"Max resolution 600*600 and file size 500kb"</span>
              </label>

              <label className="border-2 border-dashed border-gray-300 rounded-xl h-40 flex flex-col justify-center items-center cursor-pointer hover:border-blue-500 transition">

               {courseThumbnailPreview ? (
        <img
            src={courseThumbnailPreview}
            alt="thumbnail preview"
            className="h-full w-full object-cover rounded-xl"
        />
    ) : (
        <>
            <FaCloudUploadAlt className="text-5xl text-blue-600 mb-2" />

            <span className="text-gray-500">
                Click to Upload
            </span>
        </>
    )}

                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
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
                value={courseData.title}
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
                value={courseData.description}
                onChange={handleChange}
                placeholder="Enter Course Description"
                required
                className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* Duration + Fee */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>

                <label className="font-semibold block mb-2">
                  Duration
                </label>

                <input
                  type="number"
                  name="duration"
                  value={courseData.duration}
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
                  type="number"
                  name="fee"
                  value={courseData.fee}
                  onChange={handleChange}
                  placeholder="Example: Rs. 5000"
                  required
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

          </div>


        {/* Footer */}
        <div className="border-t bg-gray-50 p-4 flex flex-col sm:flex-row justify-end gap-3 flex-shrink-0">

          <button
  type="submit"
  disabled={isSaving}
  className={`flex-1 text-white py-3 rounded-lg font-medium
    ${isSaving
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
    }`}
>
  {isSaving ? "Updating..." : "Update Course"}
</button>

        <button
  onClick={onClose}
  disabled={isSaving}
  className={`flex-1 text-white py-3 rounded-lg font-medium
    ${isSaving
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gray-600 hover:bg-gray-700"
    }`}
>
  Cancel
</button>

        </div>
            </form>

      </div>

    </div>
  );
};

export default UpdateCourse;