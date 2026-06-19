const Profile = require("../schema/profileSchema");
const courseModel = require("../schema/courseSchema");

const adminDashboard = async (req,res)=>{
try {
        const totalcourse = await courseModel.countDocuments();
        const totalstudent = await Profile.countDocuments({
                role:"student"
        });
        const totalteacher = await Profile.countDocuments({
                role:"teacher"
        });
        res.status(200).json({
                success:true,
                totalcourse:totalcourse,
                totalstudent:totalstudent,
                totalteacher:totalteacher
             });
}
catch (err) {
                console.log("error while adding course:", err);
                res.status(400).json({
                success:false,
                message:"fail while adding courses",
                error:err,
             });
        }
}
module.exports = adminDashboard;