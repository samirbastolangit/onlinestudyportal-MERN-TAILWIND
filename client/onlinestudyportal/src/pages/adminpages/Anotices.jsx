import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import AddNotice from "../../components/admincomponents/Aaddnotice";
const getnoticeuri = "http://localhost:3000/api/notices/";
const rnoticeruri = "http://localhost:3000/api/notices/admin/rnotice/";
import {useAuth} from "../../store/auth";

const ANotices = () => {
  const {token} = useAuth();
  //function to fetch all notices
  const [notices,setNotices] = useState([]);
            const getNotices = async ()=>{
              try {
                const response = await fetch(getnoticeuri,{
                  method:"GET"
          });
          if(response.ok){
            const data = await response.json();
            setNotices(data.message);
          }
        } 
        catch (error) {
          console.error(error);
        }
      }
      
      useEffect(() => {
        getNotices();
      }, []);

// function to delete notice 
const deleteNotice = async (id)=>{
  try {
    const response = await fetch(`${rnoticeruri}${id}`,
      {
        method:"DELETE",
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      if(response.ok){
        const msg = await response.json();
        console.log(msg.message);
        getNotices();
      }
  } catch (error) {
    console.error(error);
  }
}
// for function to add notice
          const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 mt-[80px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Notice Management
          </h1>
          <p className="text-slate-500 mt-1">
            Create, update and manage notices.
          </p>
        </div>

        <button onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl shadow-lg transition"
        >
          <FiPlus size={20} />
          Add Notice
        </button>
         {open && (
        <AddNotice 
        onClose={() => setOpen(false)}
        refreshNotices={getNotices}
        />
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {notices.map((notice) => (
           <div
            key={notice._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-slate-200"
          >
            {/* Title */}
            <h2 className="text-2xl font-bold text-slate-800">
              {notice.title}
            </h2>

            {/* Description */}
            <p className="text-slate-600 mt-3 leading-relaxed">
              {notice.description}
            </p>

            {/* Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <FiUser />
                <span>{notice.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiCalendar />
                <span>{notice.publishedDate}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">

              <button
              onClick={()=>deleteNotice(notice._id)}
                className="flex-1 flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg transition"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ANotices;