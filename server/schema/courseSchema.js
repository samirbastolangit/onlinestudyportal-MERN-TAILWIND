const mongoose = require("mongoose");
 
const courseSchema = new mongoose.Schema({
        title:{
                type:String,
                require:true
        },
        description:{
                type:String,
                require:true,
        },
        duration:{
                type:String,
                require:true,
        },
        fee:{
                type:Number,
                require:true,
        },
},
{
        timestamps:true,
});
const courseModel = new mongoose.model(
        process.env.COURSE_COLLECTION,
        courseSchema
)
module.exports = courseModel;