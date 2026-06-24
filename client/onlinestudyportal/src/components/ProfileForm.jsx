// components/profile/ProfileForm.jsx

import { useState } from "react";

const ProfileForm = ({ profile, onSave, onClose,refreshProfile }) => {

  const [profileImage, setProfileImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    age: profile?.age || "",
    country: profile?.country || "",
    role: profile?.role || "student",
    bio: profile?.bio || "",
    interest: profile?.interest || "Programming"
  }
);
  const [imagePreview, setImagePreview] = useState(
  profile?.profileImage || ""
);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleImage = (e) => {
  const file = e.target.files[0];

  if (!file) return;

    setProfileImage(file);

  setImagePreview(
    URL.createObjectURL(file)
  );
};
const submitHandler =async () => {
 
    if (isSaving) return;

  try{
    setIsSaving(true);
const formdata = new FormData();

  formdata.append(
    "age",
    form.age
  );
  formdata.append(
    "country",
    form.country
  );
  formdata.append(
    "role",
    form.role
  );
  formdata.append(
    "bio",
    form.bio
  );
  formdata.append(
    "interest",
    form.interest
  );
  if(profileImage){
    formdata.append(
      "profileImage",
      profileImage
    )
  }
  
  await onSave(formdata);
  await refreshProfile();
  }
  finally{
    setIsSaving(false)
  }
  
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

  <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">

    {/* Header */}

    <div className="flex justify-between items-center px-6 py-4 border-b">

      <h2 className="text-2xl font-bold">
        {profile ? "Update Profile" : "Add Profile"}
      </h2>
      <button
        onClick={onClose}
        className="text-2xl font-bold text-gray-500 hover:text-black"
      >
        ×
      </button>

    </div>

    {/* Body */}

    <div className="p-6 max-h-[75vh] overflow-y-auto">

      {/* Image Section */}

      <div className="flex flex-col items-center mb-8">

        <img
          src={
            imagePreview ||
            "https://dummyimage.com/150x150/e5e7eb/6b7280&text=Profile"
          }
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
        />

        <label className="mt-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">

          Upload Image 

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
        </label>
  <span className="text-[14px] font-bold text-red-400">" upload image file with size less than 500 and max resollution 600*600 "</span>

      </div>

      {/* Age */}

      <div className="mb-4">
        <label className="block font-medium mb-2">
          Age
        </label>

        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Country */}

      <div className="mb-4">
        <label className="block font-medium mb-2">
          Country
        </label>

        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Country</option>
          <option>Nepal</option>
          <option>India</option>
          <option>Bangladesh</option>
          <option>USA</option>
          <option>Canada</option>
          <option>UK</option>
          <option>Australia</option>
        </select>
      </div>

      {/* Role */}

      <div className="mb-4">

        <label className="block font-medium mb-2">
          I am
        </label>

        <div className="flex flex-wrap gap-6">

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="student"
              checked={form.role === "student"}
              onChange={handleChange}
            />
            Student
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={form.role === "teacher"}
              onChange={handleChange}
            />
            Teacher
          </label>

        </div>

      </div>

      {/* Interest */}

      <div className="mb-4">

        <label className="block font-medium mb-2">
          Interest
        </label>

        <select
          name="interest"
          value={form.interest}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option>Programming</option>
          <option>AI</option>
          <option>Cybersecurity</option>
          <option>Networking</option>
          <option>Web Development</option>
          <option>Mobile Development</option>
          <option>Data Science</option>
          <option>Cloud Computing</option>
          <option>DevOps</option>
          <option>Game Development</option>
          <option>UI/UX</option>
          <option>QA</option>
        </select>

      </div>

      {/* Bio */}

      <div className="mb-6">

        <label className="block font-medium mb-2">
          Bio
        </label>

        <textarea
          rows="3"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          className="w-full border rounded-lg p-3 resize-none"
        />

      </div>

      {/* Buttons */}

      <div className="flex flex-col sm:flex-row gap-3">

        <button
  onClick={submitHandler}
  disabled={isSaving}
  className={`flex-1 text-white py-3 rounded-lg font-medium
    ${isSaving
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
    }`}
>
  {isSaving ? "Saving..." : "Save Profile"}
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

    </div>
  </div>
</div>
  );
};

export default ProfileForm;