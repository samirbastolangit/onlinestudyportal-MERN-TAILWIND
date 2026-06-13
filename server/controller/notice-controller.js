const notice = require("../schema/noticeSchema");

const addNotice = async (req,res)=>{
        try {
        const {title,description,author} = req.body;
        if(!req.body){
                res.status(400).json({
                        success:false,
                        message:"empty or invalid notice field provided",
                        err:error.message,
                })
        } 
        await notice.create({
                title,description,author
        });
        res.status(200).json({
                        success:true,
                        message:"notice add successfully",
        });
        } 
        catch (error) {
                res.status(400).json({
                        success:false,
                        message:"fail to add notices",
                        err:error.message,
                })
        }
}
const updateNotice = async (req,res)=>{
        try {
                const id = req.params.id;
                const updatedBody = req.body;
                if(!updatedBody){
                        res.status(400).json({
                        success:false,
                        message:"please insert new notice data, update failed..",
                        err:error.message,
                })}

                await notice.findByIdAndUpdate(
                        id,
                        updatedBody,
                        {new:true}
                );
                res.status(200).json({
                        success:true,
                        message:"notice updated successfully",
                })
                
        } catch (error) {
              res.status(400).json({
                        success:false,
                        message:"error while updating message, update failed..",
                        err:error.message,
                })  
        }
}
const removeNotice = async (req,res)=>{
        try {
                const id = req.params.id;
                const deletedNotice = await notice.findByIdAndDelete(id);
                res.status(200).json({
                        success:true,
                        message:`${deletedNotice.title} removed successfully`,
                })
        } catch (error) {
                res.status(400).json({
                        success:false,
                        message:"error while removing notice",
                        err:error.message,
                })
        }
}
const getNotice = async(req,res)=>{
        try {
                const allNotice = await notice.find();
                if(!allNotice){
                return res.status(400).json({
                        success:false,
                        message:"notice field is empty",
                });
                }
                res.status(200).json({
                        success:true,
                        message:allNotice,
                });
        } catch (error) {
                res.status(400).json({
                        success:false,
                        message:"fail to fetch notices in noticepage",
                        err:error.message,
                })
                
        }

}
module.exports = {addNotice, getNotice, updateNotice,removeNotice};