const mongoose = require("mongoose");
const mongodburl = process.env.MONGODB_URI;

const connectDb = async ()=>{
        try {
                await mongoose.connect(mongodburl);
                console.log("db connected");
        } catch (error) {
                console.error("db not connected: ", error);
                process.exit(1);
        }
}
module.exports = connectDb;