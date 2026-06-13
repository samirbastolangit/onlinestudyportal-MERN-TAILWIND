const mongoose = require("mongoose")

const noticeSchema = new mongoose.Schema({
        title:{
                type:String,
                require:true,
        },
        description:{
                type:String,
                require:true,
        },
        author:{
                type:String,
                require:true,
        }},
        {timestamps:true}
);
const noticeModel = new mongoose.model(
        process.env.NOTICE_COLLECTION,
        noticeSchema
);

module.exports = noticeModel;