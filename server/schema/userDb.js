const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
        fullname:{
                type:String,
                maxlength:100,
                minlength:3,
                required:true
        },
        email:{
                unique:true,
                lowercase:true,
                trim:true,
                type:String,
                maxlength:100,
                minlength:7,
                required:true
        },
        password:{
                type:String,
                maxlength:100,
                minlength:6,
                required:true
        },
        isAdmin:{
                type:Boolean,
                default:false
        }
},
        {
                timestamps:true,
        }
);

// defining jwt token 
userSchema.methods.generateToken = async function(){
        try {
                return jwt.sign({
                        userId: this._id.toString(),
                        email: this.email,
                        isAdmin:this.isAdmin,
                },
                process.env.JWT_SECRET_KEY,
                {
                        expiresIn:"30d",
                });
        } catch (error) {
                console.error("error in jwt field: ",error);
        }
}

const userModel = new mongoose.model(
        process.env.USER_COLLECTION , userSchema
)
module.exports = userModel;


