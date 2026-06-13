import aboutImage from "../assets/Best-E-Learning-Portals.jpg";

const Introduction = () => {
  return (
    <section className="bg-gray-50 py-20">

      <div
        className="
        max-w-7xl
        mx-auto
        px-6

        flex
        flex-col
        lg:flex-row

        items-center

        gap-12
        "
      >

        {/* IMAGE */}

        <div className="flex-1">

          <img
            src={aboutImage}
            alt="About"
            className="
            w-full
            rounded-2xl
            shadow-lg
            "
          />

        </div>

        {/* TEXT */}

        <div className="flex-1">

          <p className="text-blue-600 font-semibold">
            About Us
          </p>

          <h2
            className="
            text-3xl
            sm:text-4xl
            font-bold
            mt-3
            "
          >
            Learn with Confidence
          </h2>

          <p
            className="
            mt-6
            text-gray-600
            leading-8
            "
          >
            Our Online Tutor platform provides quality education
            through practical courses designed by experienced
            instructors. Whether you are a beginner or an
            advanced learner, we help you gain skills that
            prepare you for real-world careers.
          </p>

          <p
            className="
            mt-4
            text-gray-600
            leading-8
            "
          >
            Study at your own pace, explore multiple technology
            fields, connect with fellow learners, and build
            projects that strengthen your portfolio.
          </p>

        </div>

      </div>

    </section>
  );
};

export default Introduction;