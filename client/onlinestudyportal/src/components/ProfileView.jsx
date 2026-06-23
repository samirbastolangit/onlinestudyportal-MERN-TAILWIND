const deletemyacuri = "http://localhost:3000/api/users/deletemyac";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth";
import { toast } from 'react-toastify';
import { useState } from "react";

const ProfileView = ({ user, profile, openForm }) => {
  const {token} = useAuth();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const deletemyac = async()=>{
    try {
      const response = await fetch(deletemyacuri,{
        method:"DELETE",
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(response.ok){
       toast.success("Your account is now deleted");
       navigate("/logout");
      }
      else{
        toast.error("Problem while deleting account, try later");
      }
    } catch (error) {
      toast.error("Problem while deleting account, try later");
     console.log(error);
    }
  }
  return (
    <section className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <button
            onClick={openForm}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:text-black"
          >
            {profile ? "Update Profile" : "Add Profile"}
          </button>

        </div>

        <div className="flex flex-col items-center mt-8">

          <img
  src={
    profile?.profileImage ? profile.profileImage :
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

          <button
  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:text-black"
  onClick={() => setShowModal(true)}
>
  Delete Account
</button>
        </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 className="text-xl font-bold mb-3">
        Delete Account?
      </h2>

      <p className="text-gray-600 mb-5">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            setShowModal(false);
            await deletemyac();
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Now
        </button>
      </div>
    </div>
  </div>
)}
    </section>
  );
};

export default ProfileView;