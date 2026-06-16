const Profile = require("../schema/profileSchema");

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

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      {
        age,
        country,
        role,
        bio,
        interest,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: profile,      
    });
  } 
  catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
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
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {createOrUpdateProfile, getProfile};