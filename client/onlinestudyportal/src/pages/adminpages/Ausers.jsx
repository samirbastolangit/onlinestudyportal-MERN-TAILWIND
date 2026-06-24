import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
const getalluseruri = import.meta.env.VITE_ADMIN_GET_ALLUSERS_URI;
const ruseruri = import.meta.env.VITE_ADMIN_DELETE_USER_URI;

import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
const Ausers = () => {
        const {token} = useAuth();

        const [showDeleteModal, setShowDeleteModal] = useState(false);
const [userToDelete, setUserToDelete] = useState(null);
        //function to fetch all users
        const [users,setUsers] = useState([]);
        const getUsers = async ()=>{
          try {
            const response = await fetch(getalluseruri,{
              method:"GET",
              headers:{
                Authorization:`Bearer ${token}`
              }
      });
      if(response.ok){
        const data = await response.json();
        setUsers(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getUsers();
  }, []);
  
  const confirmDeleteUser = (user) => {
  setUserToDelete(user);
  setShowDeleteModal(true);
};
  //delete user function
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${ruseruri}${id}`,{
        method:"DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if(response.ok){
        toast.success("user removed successfully");
        getUsers();
      }
      else{
        toast.error("admin user cann't be removed");
      }
    } catch (error) {
      toast.error("problem while removing user");
      console.error(error);
    }
  };  

  return (
    <div className="min-h-screen bg-gray-100 p-5 mt-[80px]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Users
          </h1>
          <p className="text-gray-500">
            View and Delete existing Users.
          </p>
        </div>
      </div>

      {/* Users Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  xl:grid-cols-6 gap-6">

        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl duration-300 overflow-hidden p-5"
          >
            {/* <img
              src={user.thumbnail}
              alt={user.title}
              className="w-full h-52 object-cover"
            /> */}

            <div >

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {user.fullname}
              </h2>

              <p className="text-blue-600 text-sm mb-4 line-clamp-3">
                {user.email}
              </p>
              <p className="text-blue-600 text-sm mb-4 line-clamp-3">
                Role-{user.role}
              </p>
              
                </div>

                <button
  onClick={() => confirmDeleteUser(user)}
  className="flex-1 flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
>
  <FaTrash />
  Delete
</button>

              </div>
        ))}

      </div>
      {showDeleteModal && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">

      <h2 className="text-xl font-bold mb-3">
        Delete User?
      </h2>

      <p className="text-gray-600 mb-2">
        Are you sure you want to delete:
      </p>

      <p className="font-semibold mb-5">
        {userToDelete?.fullname}
      </p>

      <p className="text-sm text-gray-500 mb-5">
        {userToDelete?.email}
      </p>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => {
            setShowDeleteModal(false);
            setUserToDelete(null);
          }}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            await deleteUser(userToDelete._id);
            setShowDeleteModal(false);
            setUserToDelete(null);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Now
        </button>

      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Ausers;