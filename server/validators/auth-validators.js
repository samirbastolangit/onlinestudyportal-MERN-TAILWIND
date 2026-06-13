const {z} = require("zod");

// defining schema 
const signUpSchema = z.object({
        fullname: z
        .string({reqired_error:"fullname is required"})
        .trim()
        .min(3,({message:"fullname must be atleast 3 character"}))
        .max(100,({message:"fullname can be maximum 100 character"})),

        email: z
        .string({required_error:"email is required"})
        .email({message:"invalid email address"})
        .trim()
        .min(3,({message:"email must be atleast 3 character"}))
        .max(100,({message:"email can be maximum 100 character"})),
        password: z
        .string({required_error:"password is required"})
        .min(6,({message:"password must be atleast 6 character"}))
        .max(100,({message:"password can be maximum 100 character"})),
});
module.exports = signUpSchema;