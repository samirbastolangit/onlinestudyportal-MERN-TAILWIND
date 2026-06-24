import { useState } from "react";
import { FiX } from "react-icons/fi";
const pnoticeuri = import.meta.env.VITE_ADMIN_POST_NOTICE_URI;
import { useAuth } from "../../store/auth";
import { toast } from 'react-toastify';

const AddNotice = ({ onClose, refreshNotices }) => {
  const {token} = useAuth();

  const [isSaving,setIsSaving] = useState(false);
  const [notice, setNotice] = useState({
    title: "",
    description: "",
    author: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNotice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    if (isSaving) return;
    try {  
      setIsSaving(true);
      e.preventDefault();
      
      const response = await fetch(pnoticeuri,{
        method:'POST',
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"application/json"
        },
        body: JSON.stringify(notice)
      });
      if(response.ok){
        toast.success("Notice has been added");
        onClose();
        refreshNotices();
      }
      else{
        toast.error("Cann't add notice.May be invalid input field");
      }
      
    } 
    catch (error) {
      console.error(error);
      toast.error("Cann't add notice.May be invalid input field");
    }
    finally{
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3">
      <div className="w-full max-w-4xl h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}

        <div className="bg-blue-600 text-white px-8 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Add New Notice
          </h1>

          <button
            onClick={onClose}
            className="text-4xl hover:rotate-90 duration-300"
          >
            <FiX />
          </button>
        </div>

        {/* Body */}

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-8"
        >
          <div className="space-y-6">

            {/* Notice Title */}

            <div>
              <label className="font-semibold text-xl block mb-2">
                Notice Title
              </label>

              <input
                type="text"
                name="title"
                value={notice.title}
                required
                onChange={handleChange}
                placeholder="Enter Notice Title"
                className="w-full border-2 rounded-xl p-4 outline-none focus:border-blue-500"
              />
            </div>

            {/* Description */}

            <div>
              <label className="font-semibold text-xl block mb-2">
                Description
              </label>

              <textarea
                rows={7}
                required
                name="description"
                value={notice.description}
                onChange={handleChange}
                placeholder="Enter Notice Description"
                className="w-full border-2 rounded-xl p-4 outline-none resize-none focus:border-blue-500"
              />
            </div>

            {/* Author */}

            <div>
              <label className="font-semibold text-xl block mb-2">
                Author
              </label>

              <input
                type="text"
                name="author"
                value={notice.author}
                onChange={handleChange}
                required
                placeholder="Enter Author Name"
                className="w-full border-2 rounded-xl p-4 outline-none focus:border-blue-500"
              />
            </div>

          </div>

        {/* Footer */}

        <div className="border-t bg-gray-50 px-6 py-5 flex justify-end gap-4">

          <button
  type="submit"
  disabled={isSaving}
  className={`flex-1 text-white py-3 rounded-lg font-medium
    ${isSaving
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
    }`}
>
  {isSaving ? "Adding..." : "Add Notice"}
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

export default AddNotice;