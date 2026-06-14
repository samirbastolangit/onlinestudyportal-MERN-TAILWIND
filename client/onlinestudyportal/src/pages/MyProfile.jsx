import { useState } from "react";
import { useAuth } from "../store/auth";
const Profile = () => {
  const {user} = useAuth();
  console.log("user:",user);
  // ===============================
  // PROFILE STATE (Frontend only)
  // Later connect to backend API
  // ===============================

  const [profile, setProfile] = useState({
    fullName: "",
    country: "",
    role: "student",
    bio: "",
    interests: [],
  });

  const [image, setImage] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Handle checkbox (interests)
  const handleInterest = (value) => {
    const alreadySelected = profile.interests.includes(value);

    if (alreadySelected) {
      setProfile({
        ...profile,
        interests: profile.interests.filter((i) => i !== value),
      });
    } else {
      setProfile({
        ...profile,
        interests: [...profile.interests, value],
      });
    }
  };

  // Handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file)); // preview only
  };

  return (
    <section className="min-h-screen bg-gray-100 py-20 px-4">

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center">
          My Profile
        </h1>

        {/* ================= PROFILE IMAGE ================= */}

        <div className="flex flex-col items-center mt-8">

          <img
            src={
              image ||
              "https://via.placeholder.com/120"
            }
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
          />

          <label className="mt-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Upload Image
            <input
              type="file"
              className="hidden"
              onChange={handleImage}
            />
          </label>

        </div>

        {/* ================= FORM ================= */}

        <div className="mt-10 space-y-6">

          {/* Full Name */}
          <div>
            <label className="font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Country */}
          <div>
            <label className="font-medium">Country</label>

            <select
              name="country"
              value={profile.country}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg"
            >
              <option value="">Select Country</option>
              <option>Nepal</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>Canada</option>
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="font-medium">I am</label>

            <div className="flex gap-6 mt-2">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={profile.role === "student"}
                  onChange={handleChange}
                />{" "}
                Student
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  value="freelancer"
                  checked={profile.role === "freelancer"}
                  onChange={handleChange}
                />{" "}
                Freelancer
              </label>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="font-medium">Interest In</label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">

              {[
                "UI/UX",
                "Web Development",
                "App Development",
                "Software",
                "QA",
                "Automation",
                "Graphics",
              ].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={profile.interests.includes(item)}
                    onChange={() => handleInterest(item)}
                  />
                  {item}
                </label>
              ))}

            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="font-medium">Short Bio</label>

            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Write something about yourself..."
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">

            <button className="w-full sm:w-1/2 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition">
              Change Email
            </button>

            <button className="w-full sm:w-1/2 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition">
              Change Password
            </button>

          </div>

          {/* Save Button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Save Profile
          </button>

        </div>

      </div>

    </section>
  );
};

export default Profile;