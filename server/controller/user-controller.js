const user = require("../schema/userDb");
const Profile = require("../schema/profileSchema");

const getallusers = async (req, res) => {
  try {
    const persons = await user.find().select("-password");

    const wholeuser = await Promise.all(
      persons.map(async (person) => {
        const profile = await Profile.findOne({
          user: person._id,
        });

        return {
          ...person.toObject(),
          role: profile?.role || "Not Set",
        };
      })
    );

    res.status(200).json({
      success: true,
      message: wholeuser,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const deleteuserac = async (req,res)=>{
        try {
                const id = req.params.id;

                // delete profile linked to user
                const currentuser = await user.findOne({_id:id});
                if(!currentuser.isAdmin){
                        await Profile.findOneAndDelete({ user: id });
                        const accountRemoved = await user.findByIdAndDelete(id);
                        
                        res.status(200).json({
                                success:true,
                                message:`account ${accountRemoved.email} has been removed from dbs`,
                        });
                        console.log(`${accountRemoved.email} has been removed from dbs`);
                }

                res.status(400).json({
                                success:false,
                                message:`admin cann't be removed`,
                        });                

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

                // delete profile linked to user
                await Profile.findOneAndDelete({ user: id });

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