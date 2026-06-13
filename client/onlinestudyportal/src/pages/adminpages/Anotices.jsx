import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiUser } from "react-icons/fi";
import { useState } from "react";
import AddNotice from "../../components/admincomponents/Aaddnotice";

const notices = [
  {
    id: 1,
    title: "Holiday Announcement",
    description:
      "The institute will remain closed on Friday due to a public holiday.",
    author: "Admin",
    published: "13 June 2026",
  },
  {
    id: 2,
    title: "New MERN Course Added",
    description:
      "A complete MERN Stack Development course has been added for students.",
    author: "Course Manager",
    published: "11 June 2026",
  },
  {
    id: 3,
    title: "Exam Schedule",
    description:
      "Mid-term examinations will begin from next Monday. Check your dashboard for details.",
    author: "Examination Dept.",
    published: "09 June 2026",
  },
];

const ANotices = () => {
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
        <AddNotice onClose={() => setOpen(false)} />
      )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {notices.map((notice) => (
          <div
            key={notice.id}
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
                <span>{notice.published}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition"
              >
                <FiEdit2 />
                Update
              </button>

              <button
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