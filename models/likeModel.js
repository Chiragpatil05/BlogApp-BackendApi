// import mongoose to create schema of like model
const mongoose = require('mongoose');

// defining route handler
const likeSchema = new mongoose.Schema({
    // kis post pe like kar rhe hai
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    },
    // konsa user like kar rha hai ya kis user ne like kara
    user:{
        type:String,
        required:true,
    }
})

// export
module.exports = mongoose.model("Like" , likeSchema);