import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useEffect, useState } from "react";

const dashboarduri = "http://localhost:3000/api/dashboard/admin/get";

const Adashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  const getdashboard = async () => {
    try {
      const response = await fetch(dashboarduri, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Make sure these field names match your backend response
        setTotalStudents(data.totalstudent);
        setTotalTeachers(data.totalteacher);
        setTotalCourses(data.totalcourse);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      getdashboard();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 mt-[80px]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <h1 className="text-5xl font-extrabold leading-tight">
                Admin Dashboard
              </h1>

              <p className="mt-5 text-lg text-gray-100">
                Manage your Online Study Portal with complete control over
                courses, students, instructors, notices, and feedbacks from
                one centralized platform.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:scale-105 duration-300 shadow-lg"
                  onClick={() => navigate("/admin/courses")}
                >
                  Manage Courses
                </button>

                <button
                  className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:scale-105 duration-300 shadow-lg"
                  onClick={() => navigate("/admin/notices")}
                >
                  Manage Notices
                </button>

                <button
                  className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:scale-105 duration-300 shadow-lg"
                  onClick={() => navigate("/admin/users")}
                >
                  Manage Users
                </button>

                <button
                  className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:scale-105 duration-300 shadow-lg"
                  onClick={() => navigate("/admin/feedback")}
                >
                  Manage Feedback
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="flex justify-center">
              <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold mb-6">
                  Portal Overview
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between bg-white/10 p-4 rounded-xl">
                    <span>Total Students</span>
                    <span className="font-bold">{totalStudents}</span>
                  </div>

                  <div className="flex justify-between bg-white/10 p-4 rounded-xl">
                    <span>Total Courses</span>
                    <span className="font-bold">{totalCourses}</span>
                  </div>

                  <div className="flex justify-between bg-white/10 p-4 rounded-xl">
                    <span>Total Teachers</span>
                    <span className="font-bold">{totalTeachers}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl text-white p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold">
            Create, update and organize educational content.
            <br />
            <br />
            "Education is the passport to the future."
          </h2>

          <p className="mt-4 text-lg text-gray-100">
            Welcome, Admin! Build, organize, and inspire thousands of learners
            through your Online Study Portal.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Adashboard;