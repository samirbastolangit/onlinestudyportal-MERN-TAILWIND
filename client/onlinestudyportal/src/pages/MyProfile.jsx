import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import ProfileView from "../components/ProfileView";
import ProfileForm from "../components/ProfileForm";

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
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data.profile);
        setShowForm(false);
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