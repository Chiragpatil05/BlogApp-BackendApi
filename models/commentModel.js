// import mongoose to create schema of comment model
const mongoose = require('mongoose');

// route handhler
const commentSchema = new mongoose.Schema({
    // konsi post pe comment kiya - post is a refrence
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post", // refrence to the post model
    },
    // kis user ne comment kara hai
    user:{
        type:String,
        required:true,
    },
    // kya comment kiya
    body:{
        type:String,
        required:true,
    }

})

// export
module.exports = mongoose.model("Comment",commentSchema);