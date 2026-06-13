const mongoose = require("mongoose")

const courseFeedback = new mongoose.Schema({
        email:{
                type:String,
                require:true,
        },
        feedmessage:{
                type:String,
                require:true,
        }
});
const feedbackModel = new mongoose.model(
        process.env.COURSE_FEEDBACK_COLLECTION,
        courseFeedback
);

module.exports = feedbackModel;