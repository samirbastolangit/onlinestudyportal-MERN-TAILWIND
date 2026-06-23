const adminMiddleware = async (req,res,next)=>{
try {
                const adminRole = req.user.isAdmin;
                console.log(adminRole);
                if(!adminRole){
                return res.status(400).json({
                        success:false,
                        message:`unauthorized users`,
                        err:error.message
                })
                }
                next();
        }
catch(error){
        console.error("error in admin page: ", error);
                return res.status(400).json({
                        success:false,
                        message:`unauthorized users`,
                })
}
}

module.exports = adminMiddleware;