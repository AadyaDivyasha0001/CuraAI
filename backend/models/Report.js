import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },

    doctorName:{
        type:String,
        required:true
    },

    reportType:{
        type:String,
        required:true
    },

    fileName:{
        type:String,
        required:true
    },

    fileUrl:{
        type:String,
        required:true
    },

    uploadedOn:{
        type:Date,
        default:Date.now
    }

});

export default mongoose.model(
    "Report",
    reportSchema
);