const Adashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">

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
                <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:scale-105 duration-300 shadow-lg">
                  Manage Courses
                </button>

                <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-700 duration-300">
                  View Analytics
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
                    <span className="font-bold">1,250+</span>
                  </div>

                  <div className="flex justify-between bg-white/10 p-4 rounded-xl">
                    <span>Total Courses</span>
                    <span className="font-bold">85+</span>
                  </div>

                  <div className="flex justify-between bg-white/10 p-4 rounded-xl">
                    <span>Active Teachers</span>
                    <span className="font-bold">42</span>
                  </div>

                  <div className="flex justify-between bg-white/10 p-4 rounded-xl">
                    <span>Certificates Issued</span>
                    <span className="font-bold">3,800+</span>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Statistics */}

      <section className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Quick Statistics
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 duration-300">
            <div className="text-5xl">📚</div>
            <h3 className="mt-4 text-xl font-bold">
              Courses
            </h3>
            <p className="text-gray-500 mt-2">
              Create, update and organize educational content.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 duration-300">
            <div className="text-5xl">👨‍🎓</div>
            <h3 className="mt-4 text-xl font-bold">
              Students
            </h3>
            <p className="text-gray-500 mt-2">
              Monitor enrollments and learning progress.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 duration-300">
            <div className="text-5xl">📝</div>
            <h3 className="mt-4 text-xl font-bold">
              Feedback
            </h3>
            <p className="text-gray-500 mt-2">
              Review student suggestions and improve quality.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 duration-300">
            <div className="text-5xl">📢</div>
            <h3 className="mt-4 text-xl font-bold">
              Notices
            </h3>
            <p className="text-gray-500 mt-2">
              Publish announcements for all learners instantly.
            </p>
          </div>

        </div>

      </section>

      {/* Features */}

      <section className="bg-white py-14">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-10">
            Why This Admin Panel?
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="border rounded-2xl p-7 hover:shadow-xl duration-300">
              <h3 className="text-2xl font-bold mb-3">
                🎯 Easy Management
              </h3>

              <p className="text-gray-600">
                Manage students, teachers, notices, and learning materials
                through a clean and efficient interface.
              </p>
            </div>

            <div className="border rounded-2xl p-7 hover:shadow-xl duration-300">
              <h3 className="text-2xl font-bold mb-3">
                ⚡ Fast Performance
              </h3>

              <p className="text-gray-600">
                Optimized layout with responsive design for desktops,
                tablets, and mobile devices.
              </p>
            </div>

            <div className="border rounded-2xl p-7 hover:shadow-xl duration-300">
              <h3 className="text-2xl font-bold mb-3">
                🔒 Secure Administration
              </h3>

              <p className="text-gray-600">
                Control portal resources with role-based access and secure
                management capabilities.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Quote */}

      <section className="max-w-6xl mx-auto px-6 py-14">

        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl text-white p-10 text-center shadow-xl">

          <h2 className="text-3xl font-bold">
            "Education is the passport to the future."
          </h2>

          <p className="mt-4 text-lg text-gray-100">
            Welcome, Admin! Build, organize, and inspire thousands of
            learners through your Online Study Portal.
          </p>

        </div>

      </section>

    </div>
  );
};

export default Adashboard;