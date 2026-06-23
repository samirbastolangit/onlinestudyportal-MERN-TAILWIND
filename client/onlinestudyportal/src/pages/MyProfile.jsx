import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import ProfileView from "../components/ProfileView";
import ProfileForm from "../components/ProfileForm";
import { toast } from 'react-toastify';


const getProfileURI = "http://localhost:3000/api/profile/readmyprofile";
const updateProfileURI = "http://localhost:3000/api/profile/add";

const Profile = () => {
  const { user, token } = useAuth();
 
  const [profile, setProfile] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const getProfile = async () => {
    try {
      const response = await fetch(getProfileURI, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const saveProfile = async (formData) => {
    try {
      const response = await fetch(updateProfileURI, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body:formData,
      }
    );

      const data = await response.json();

      if (response.ok) {
        profile ? toast.success("profile updated successfully"):toast.success("profile added successfully");
        setProfile(
          data.message
        );

        setShowForm(false);
      }
      else{
        toast.error("error occur while adding/updating profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ProfileView
        user={user}
        profile={profile}
        openForm={() => setShowForm(true)}
      />

      {showForm && (
        <ProfileForm
          profile={profile}
          onSave={saveProfile}
          refreshProfile={getProfile}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
};

export default Profile;