const courseModel = require("../schema/courseSchema");
const courseFeedback = require("../schema/courseFeedback");

const addCourses = async (req,res)=>{
        try {
                const {title,description,duration,fee}= req.body;
                const addedBy = req.user.email;
                await courseModel.create({title,description,duration,fee});
                res.status(200).json({
                        success:true,
                        message:"course added successfully",
                        createdBy:addedBy
                });
        } catch (err) {
                console.log("error while adding course:", err);
                res.status(400).json({
                success:false,
                message:"fail while adding courses",
                error:err,
             });
        }
};
const listCourses = async (req, res) =>{
        try {
                const courses = await courseModel.find();
                res.status(200).json({
                        success:true,
                        message:courses,
                });
        } catch (err) {
                res.status(400).json({
                   success:false,
                   message:"failed while fetching courses",
                   error:err
                });
        }
};
const updateCourses = async(req,res)=>{
        try{
                const id = req.params.id;
                const updatedData = req.body;
                if(!updatedData){
                        return res.status(400).json({
                        success:false,
                        message:"please insert new course data, update failed..",
                });
                }
                await courseModel.findByIdAndUpdate(
                        id,updatedData,{new:true}
                );
                res.status(200).json({
                        success:true,
                        message:"course updated successfully",
                });
        }
        catch(error){
                res.status(400).json({
                        success:false,
                        message:"error while updating course",
                        err: error.message,
                });
        }
}
const deleteCourses = async(req,res)=>{
        try {
                const id = req.params.id;
                const course = await courseModel.findByIdAndDelete(id)
                res.status(200).json({
                        success:true,
                        message:`${course.title} successfully deleted`,
                });
        } 
        catch (error) {
                res.status(400).json({
                        success:false,
                        message:"error while deleting course",
                        err: error.message,
                });
        }
}



const addfeedmessage = async (req,res)=>{
        try {
                const {email,feedmessage} = req.body;
                if(!feedmessage){
                        return res.status(400).json({
                                success:false,
                                message:"fail to add feed message"
                        })
                }
                const msg = await courseFeedback.create({email,feedmessage});
                res.status(200).json({
                        success:true,
                        message:"feed message add successfully",
                        feed:msg
                });
        } catch (err) {
                console.log("error while adding feedmessage:",err);
                res.status(400).json({
                        success:false,
                        message:"fail to add feed messages",
                        error:err,
                })
        }
};
const viewfeedmessage = async (req,res)=>{
        try {
                const feedmessage = await courseFeedback.find();
                if(feedmessage.length == 0){
                        return res.status(400).json({
                                success:false,
                                message:"feed message is empty",
                        })
                }
                return res.status(200).json({
                        success:true,
                        message:feedmessage,
                })
        } catch (error) {
                console.log("error while fetching feedmessage:",error);
                res.status(400).json({
                        success:false,
                        message:"fail to view feed messages",
                        error:error,
                })
        }
}
const removefeedmessage = async (req,res)=>{
        try {
                const id = req.params.id;
                const feeds = await courseFeedback.findByIdAndDelete(id);
                res.status(200).json({
                        success:true,
                        message:`feed message successfully deleted`,
                });
        } 
        catch (error) {
                res.status(400).json({
                        success:false,
                        message:"error while deleting feedback",
                        err: error.message,
                });
        }
}
module.exports = {addCourses,listCourses, updateCourses, deleteCourses,
        addfeedmessage, viewfeedmessage, removefeedmessage};