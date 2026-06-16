const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: process.env.USER_COLLECTION,
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      min: 1,
      max: 120,
    },

    country: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    interest: {
      type: String,
      enum: [
        "Programming",
        "AI",
        "Cybersecurity",
        "Networking",
        "Web Development",
        "Mobile Development",
        "Data Science",
        "Cloud Computing",
        "DevOps",
        "Game Development",
        "UI/UX",
        "QA",
      ],
      default: "Programming",
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model(
  process.env.PROFILE_COLLECTION,
  profileSchema
);

module.exports = Profile;