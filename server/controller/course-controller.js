const courseModel = require("../schema/courseSchema");
const courseFeedback = require("../schema/courseFeedback");

const uploadToCloudinary = require("../services/uploadToCloudinary");
const cloudinary = require("../config/cloudinary");

const addCourses = async (req,res)=>{
        try {
                const {title,description,duration,fee}= req.body;

                let thumbnailimg = null;
                let thumbnailimgid = null;

                const addedBy = req.user.email;
                if(req.file){
                              const result = await uploadToCloudinary(req.file.buffer, "courses-thumbnails");
                              thumbnailimg = result.secure_url;
                              thumbnailimgid = result.public_id;
                }
                const course = await courseModel.create(
                        {title,description,duration,fee,
                                thumbnailImg:thumbnailimg,
                                thumbnailImgId:thumbnailimgid,
                        });
                return res.status(200).json({
                        success:true,
                        message:"course added successfully",
                        createdBy:addedBy,
                        course: course,
                });
        } catch (err) {
                console.log("error while adding course:", err);

                return res.status(400).json({
                success:false,
                message:"fail while adding courses",
             });
        }
};
const listCourses = async (req, res) =>{
        try {
                const courses = await courseModel.find();
                return res.status(200).json({
                        success:true,
                        message:courses,
                });
        } catch (err) {
                console.log("error while getting courses: ", err);
                return res.status(400).json({
                   success:false,
                   message:"failed while fetching courses",
                });
        }
};
const updateCourses = async(req,res)=>{
        try{
                const id = req.params.id; 
                
                if(!req.body){
                        return res.status(400).json({
                                success:false,
                                message:"please insert new course data, update failed..",
                        });
                }
                const {title,description,duration,fee} = req.body;

                const updateData = {title,description,duration,fee};
                const oldCourse = await courseModel.findOne({_id:id});
                
                if(req.file){
                        const result = await uploadToCloudinary(req.file.buffer, "courses-thumbnails");
                        updateData.thumbnailImg =result.secure_url;
                        updateData.thumbnailImgId = result.public_id;
                }
                await courseModel.findByIdAndUpdate(
                        id,
                        updateData,
                        {new:true,
                        }
                );
                if(oldCourse?.thumbnailImgId){
                        await cloudinary.uploader.destroy(
                                oldCourse.thumbnailImgId
                        )
                }
                return res.status(200).json({
                        success:true,
                        message:"course updated successfully",
                });
        }
        catch(error){
                console.log("error while updating courses: ",error);
                return res.status(400).json({
                        success:false,
                        message:"error while updating course",
                });
        }
}
const deleteCourses = async(req,res)=>{
        try {
                const id = req.params.id;
                const course = await courseModel.findByIdAndDelete(id)

                if(course?.thumbnailImgId){
                        await cloudinary.uploader.destroy(
                                course.thumbnailImgId
                        )
                }
                return res.status(200).json({
                        success:true,
                        message:`${course.title} successfully deleted`,
                });
        } 
        catch (error) {
                console.log("error while deleting course: ", error);

                return res.status(400).json({
                        success:false,
                        message:"error while deleting course",
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
                return res.status(200).json({
                        success:true,
                        message:"feed message add successfully",
                        feed:msg
                });
        } catch (err) {
                console.log("error while adding feedmessage:",err);
                return res.status(400).json({
                        success:false,
                        message:"fail to add feed messages",
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
                return res.status(400).json({
                        success:false,
                        message:"fail to view feed messages",
                        error:error,
                })
        }
}
const removefeedmessage = async (req,res)=>{
        try {
                const id = req.params.id;
                await courseFeedback.findByIdAndDelete(id);
                return res.status(200).json({
                        success:true,
                        message:`feed message successfully deleted`,
                });
        } 
        catch (error) {
                console.log("error while deleting feedback: ",error);
                return res.status(400).json({
                        success:false,
                        message:"error while deleting feedback",
                });
        }
}
module.exports = {addCourses,listCourses, updateCourses, deleteCourses,
        addfeedmessage, viewfeedmessage, removefeedmessage};