const jwt = require("jsonwebtoken");
const User = require("../schema/userDb");

const authmiddleware = async (req,res, next)=>{

        try {
        const token = req.header("Authorization");

        if(!token){
                return res.status(400).json({
                        success:false,
                        message:"unauthorized attempt token dont exists",
                })
        };
        
        const jwtToken = token.replace("Bearer","").trim();

        const isVerified = await jwt.verify(
                jwtToken,
                process.env.JWT_SECRET_KEY
        );
        const userData = await User.findOne({email:isVerified.email}).select({password:0});

        req.user = userData;
        req.id = userData._id;
        req.token = jwtToken;

        next();    
        } 
        
        catch (error) {
                res.status(400).json({
                        success:false,
                        message:"unauthorized attempt, invalid token",
                        error:error.message,
                })
        }
}
module.exports = authmiddleware;