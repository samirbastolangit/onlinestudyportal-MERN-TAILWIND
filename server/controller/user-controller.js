const user = require("../schema/userDb");
const Profile = require("../schema/profileSchema");
const cloudinary = require("../config/cloudinary");

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

    return res.status(200).json({
      success: true,
      message: wholeuser,
      display_message: "all users fetched successfully",
    });

  } catch (error) {
    console.log("unable to fetch all users: ",error);

    return res.status(500).json({
      success: false,
      message: "unable to fetch all users",
    });
  }
};
const deleteuserac = async (req,res)=>{
        try {
                const id = req.params.id;

                // delete profile linked to user
                const currentuser = await user.findOne({_id:id});
                if(!currentuser.isAdmin){

                        const oldProfile = await Profile.findOneAndDelete({ user: id });
                        const accountRemoved = await user.findByIdAndDelete(id);
                        
                        if(accountRemoved && oldProfile?.profileImagePublicId)
                        
                               await cloudinary.uploader.destroy(
                                oldProfile.profileImagePublicId
                        )
                        console.log(`${accountRemoved.email} has been removed from dbs`);

                        return res.status(200).json({
                                success:true,
                                message:`user has been removed`,
                        });
                }

                return res.status(400).json({
                                success:false,
                                message:`admin cann't be removed`,
                        });                

        } catch (error) {
                console.log("error while deleting users: ",error);

                return res.status(400).json({
                        success:false,
                        message:`error while deleting users`,
                })
        }
}
const deletemyac = async (req,res)=>{
        try {
                const id = req.id;

                        const oldProfile = await Profile.findOneAndDelete({ user: id });
                        const accountRemoved = await user.findByIdAndDelete(id);
                        
                        if(accountRemoved && oldProfile?.profileImagePublicId)
                        
                               await cloudinary.uploader.destroy(
                                oldProfile.profileImagePublicId
                        )
                        console.log(`${accountRemoved.email} has been removed from dbs`);

                        return res.status(200).json({
                                success:true,
                                message:`your account is removed`,
                        });
        } catch (error) {
                console.log("error while deleting your account: ", error);
                return res.status(400).json({
                        success:false,
                        message:`error while deleting your account`,
                })
        }
}
const updatemyac = async (req,res)=>{
        try {
                const id = req.id;
                const updatedBody = req.body;
                if(!updatedBody){
                        return res.status(400).json({
                        success:false,
                        message:"please insert updated user data, update failed..",
                        err:error.message,
                })}

                await user.findByIdAndUpdate(
                        id,
                        updatedBody,
                        {new:true}
                );
                return res.status(200).json({
                        success:true,
                        message:"user updated successfully",
                })
                
        } catch (error) {
                console.log("error while updating account: ", error);
              return res.status(400).json({
                        success:false,
                        message:"error while updating user",
                        err:error.message,
                })  
        }
}
module.exports = {getallusers, deletemyac, updatemyac, deleteuserac};