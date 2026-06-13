const user = require("../schema/userDb"); 

const getallusers = async (req,res)=>{

        try {
                const userData = req.user;
                const wholeuser = await user.find().select({password:0});
                console.log("admin has logged in ",userData.email);
                res.status(200).json({
                        success:true,
                        message:wholeuser,
                        admindata: userData,
                }); 
        } catch (error) {
                console.error("error in admin page...");
                res.status(400).json({
                        success:false,
                        message:`error in admin page...`,
                        err:error.message
                })
        }     
}

const deleteuserac = async (req,res)=>{
        try {
                const id = req.params.id;
                const accountRemoved = await user.findByIdAndDelete(id);
                res.status(200).json({
                        success:true,
                        message:`account ${accountRemoved.email} has been removed from dbs`,
                });
                console.log(`${accountRemoved.email} has been removed from dbs`);
        } catch (error) {
                res.status(400).json({
                        success:false,
                        message:`error while deleting users...`,
                        err:error.message
                })
        }
}
const deletemyac = async (req,res)=>{
        try {
                const id = req.id;
                const accountRemoved = await user.findByIdAndDelete(id);
                res.status(200).json({
                        success:true,
                        message:`your account ${accountRemoved.email} has been deleted`,
                });
                console.log(`${accountRemoved.email} has deleted his account`);
        } catch (error) {
                res.status(400).json({
                        success:false,
                        message:`error while deleting users...`,
                        err:error.message
                })
        }
}
const updatemyac = async (req,res)=>{
        try {
                const id = req.id;
                const updatedBody = req.body;
                if(!updatedBody){
                        res.status(400).json({
                        success:false,
                        message:"please insert updated user data, update failed..",
                        err:error.message,
                })}

                await user.findByIdAndUpdate(
                        id,
                        updatedBody,
                        {new:true}
                );
                res.status(200).json({
                        success:true,
                        message:"user updated successfully",
                })
                
        } catch (error) {
              res.status(400).json({
                        success:false,
                        message:"error while updating user, update failed..",
                        err:error.message,
                })  
        }
}
module.exports = {getallusers, deletemyac, updatemyac, deleteuserac};