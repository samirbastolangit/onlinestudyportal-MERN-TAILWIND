const Profile = require("../schema/profileSchema");
const uploadToCloudinary = require("../services/uploadToCloudinary");
const cloudinary = require("../config/cloudinary");


const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const {
      age,
      country,
      role,
      bio,
      interest,
    } = req.body;

    const updateData = {
  age,
  country,
  role,
  bio,
  interest,
};
const oldProfile = await Profile.findOne({user:userId});
    if(req.file){

      const result = await uploadToCloudinary(req.file.buffer, "profile-images");

      updateData.profileImage = result.secure_url;
      updateData.profileImagePublicId = result.public_id;   
      
    }
    
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      updateData,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );
    if (oldProfile?.profileImagePublicId) {
  await cloudinary.uploader.destroy(
    oldProfile.profileImagePublicId
  );
}

    return res.status(200).json({
      success: true,
      message: profile,
      display_message: "profile created/updated successfully"
    });
  } 
  catch (error) {
    console.error("error while updating profile: ",error);

    return res.status(500).json({
      success: false,
      message: "error while updating profile",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.id;

    const profile = await Profile.findOne({
      user: userId,
    }).populate(
      "user",
      "fullname email"
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:profile,
      display_message: "profile fetched successfully"
    });
  } 
  catch (error) {
    console.error("error while fetching profile: ", error);

    return res.status(500).json({
      success: false,
      message: "error while fetching profile",
    });
  }
};
module.exports = {createOrUpdateProfile, getProfile};