// importing model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// createComment is also a post request
exports.createComment = async (req , res) =>{
    try{
        // extracting data from request body
        const {post , user , body} = req.body;

        // create a comment object
        const comment = new Comment({
            post,user,body
        })

        // save the new comment entry in the database
        const savedComment = await comment.save();

        // whenever a new comment is created a comment object is added ,it will be added in the comment model database 
        // but also there is a comments array in the post model , which will include all the comment ids or the actual comment object of commented post
        // so we also have to add the comment id or comment object int the comment array of the post model

        // toh apn ko jis bhi post par comment kara hai usko find karna hai
        // find the post by id 
        // hame update karna hoga post collection ko
        const updatedPost = await Post.findByIdAndUpdate(post , {$push: {comments: savedComment._id}} , {new: true})
                            .populate("comments") // populate the comment array with comment documents matlab populate karenge toh comments array mai pura ka pura comment object aajayega (post,user,body)
                            // and agar populate nahi kara toh comments wale array me sirf comment ki id aayegi
                            .exec(); // execute the commands

        res.json({
            post: updatedPost,
        })
    }
    catch(error){
        return res.status(500).json({
            error:"internal server error while creating comment",
        })
    }
}