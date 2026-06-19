const bcrypt = require("bcryptjs");
const userModel = require("../schema/userDb");

const {sendWelcomeEmail} = require("../services/emailServices");

const register = async(req,res) =>{
        try {
                const {fullname,email,password, role} = req.body;
                const userExist = await userModel.findOne({email});
                if(userExist){
                        return res.status(400).json({
                                message:"user already registerd"
                        });
                }
                const salt = await bcrypt.genSaltSync(10);
                const hashPassword = await bcrypt.hashSync(password,salt);
                const userCreated = await userModel.create({fullname,email,password:hashPassword},role);

                const token = await userCreated.generateToken();

                        try {
                                await sendWelcomeEmail(email, fullname);
                        } 
                        catch (mailError) {
                                console.error("Nodemailer failed:", mailError);
                        }

                res.status(200).json({
                        success:true,
                        message:"registration success",
                        token:token,
                })
                console.log(`${email} just registered`);

        } catch (err) {
                console.log("registration error:", err);
                res.status(400).json({
                        success:false,
                        message:"registration error",
                        error:err,
                });
        }
}
const login = async(req,res)=>{
        try {
                const {email, password} = req.body;
                const userExist = await userModel.findOne({email});
                if(!userExist){
                        return res.status(400).json({
                                success:false,
                                message:"invalid credentials",
                        });
                }
                const comparedPass = await bcrypt.compare(password,userExist.password);
                if(comparedPass){
                        const token = await userExist.generateToken();
                        res.status(200).json({
                                success:true,
                                token:token,
                                message:"login successful",
                                isAdmin:userExist.isAdmin
                        });
                        console.log(`${email} has just logged in`);
                }
                else{
                        res.status(400).json({
                                success:false,
                                message:"invalid credentials",
                        });
                        
                }
        } catch (err) {
                console.log("login error: ", err)
                res.status(400).json({
                        success:false,
                        message:"login error",
                        error:err.message,
                });
        }
}
const user = async(req,res)=>{
        try {
                const userData = req.user;
                const userToken = req.token;
                const userId = req._id;

                res.status(200).json({
                success:true,
                user: userData,
                id:userId,
                token:userToken,
        });
        } catch (error) {
                res.status(400).json({
                        success:false,
                        message:"user not found",
                        error:err.message,
                });
        }
}
module.exports = {register, login, user};