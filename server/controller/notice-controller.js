const notice = require("../schema/noticeSchema");

const addNotice = async (req,res)=>{
        try {
        const {title,description,author} = req.body;
        if(!req.body){
                return res.status(400).json({
                        success:false,
                        message:"empty or invalid notice field provided",
                })
        } 
        await notice.create({
                title,description,author
        });
        return res.status(200).json({
                        success:true,
                        message:"notice added successfully",
        });
        } 
        catch (error) {
                console.log("fail to add notices: ",error);

                return res.status(400).json({
                        success:false,
                        message:"fail to add notices",
                })
        }
}

const removeNotice = async (req,res)=>{
        try {
                const id = req.params.id;
                await notice.findByIdAndDelete(id);
                return res.status(200).json({
                        success:true,
                        message:`notice removed successfully`,
                })
        } catch (error) {
                console.log("error while removing notice: ", error);
                return res.status(400).json({
                        success:false,
                        message:"error while removing notice",
                })
        }
}
const getNotice = async(req,res)=>{
        try {
                const allNotice = await notice.find();
                if(!allNotice){
                return res.status(400).json({
                        success:false,
                        message:"no notice exists",
                });
                }
                return res.status(200).json({
                        success:true,
                        message:allNotice,
                });
        } catch (error) {
                console.log("fail to fetch notices in noticepage: ",error);

                return res.status(400).json({
                        success:false,
                        message:"fail to fetch notices in noticepage",
                })
                
        }

}
module.exports = {addNotice, getNotice ,removeNotice};