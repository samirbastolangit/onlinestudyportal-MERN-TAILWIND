const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* 
          Grid layout:
          - Mobile: 1 column
          - Small screens: 2 columns
          - Large screens: 4 columns
        */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ================= ABOUT SECTION ================= */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Online Tutor
            </h2>

            <p className="text-gray-400 leading-6">
              Learn modern skills like Web Development,
              App Development, UI/UX, Software Engineering
              and more from expert instructors anytime,
              anywhere.
            </p>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer">
                Home
              </li>
              <li className="hover:text-white cursor-pointer">
                Courses
              </li>
              <li className="hover:text-white cursor-pointer">
                Notices
              </li>
              <li className="hover:text-white cursor-pointer">
                Login
              </li>
            </ul>
          </div>

          {/* ================= SUPPORT ================= */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Support
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Email: support@onlinetutor.com</li>
              <li>Phone: +977-98XXXXXXXX</li>
              <li>Help Center</li>
              <li>FAQs</li>
            </ul>
          </div>

          {/* ================= NEWSLETTER ================= */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Newsletter
            </h3>

            <p className="text-gray-400 mb-4">
              Subscribe to get latest updates.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full p-2 rounded-lg text-black outline-none"
              />

              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} developed by B Samir.
      </div>

    </footer>
  );
};

export default Footer;