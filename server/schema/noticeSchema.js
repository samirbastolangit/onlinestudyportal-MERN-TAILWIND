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
        },
        publishedDate: {
      type: Date,
      default: Date.now,
    }
});
const noticeModel = new mongoose.model( 
        process.env.NOTICE_COLLECTION,
        noticeSchema
);

module.exports = noticeModel;