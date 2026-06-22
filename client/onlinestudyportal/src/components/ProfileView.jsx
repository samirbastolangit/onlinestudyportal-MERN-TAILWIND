// components/profile/ProfileView.jsx

const ProfileView = ({ user, profile, openForm }) => {
  return (
    <section className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <button
            onClick={openForm}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            {profile ? "Update Profile" : "Add Profile"}
          </button>

        </div>

        <div className="flex flex-col items-center mt-8">

          <img
  src={
    profile?.profileImage ? `http://localhost:3000${profile.profileImage}`:
    "https://dummyimage.com/150x150/e5e7eb/6b7280&text=Profile"
  }
  alt="profile img"
  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
/>

        </div>

        <div className="mt-8 space-y-4">

          <p>
            <strong>Name:</strong> {user?.fullname}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          {profile ? (
            <>
              <p>
                <strong>Age:</strong> {profile.age}
              </p>

              <p>
                <strong>Country:</strong> {profile.country}
              </p>

              <p>
                <strong>Role:</strong> {profile.role}
              </p>

              <p>
                <strong>Interest:</strong> {profile.interest}
              </p>

              <p>
                <strong>Bio:</strong> {profile.bio}
              </p>
            </>
          ) : (
            <p className="text-gray-500">
              No profile information available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileView;