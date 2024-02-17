// like controllers = like and unlike post

const Like = require("../models/likeModel");
const Post = require("../models/postModel");

// like post => post method
exports.likePost = async (req , res) => {
    try{
        // extracting data from request body
        const {post , user} = req.body;

        // create an like object
        const like = new Like({
            post , user
        })

        // save or create an entry of like object in the database
        const savedLike = await like.save();

        // so whenever a new post is liked a new liked object is created which will be saved in the like model database
        // but there is an likes array in post model which will save all the like id od actual like object of liked posts 
        // so we also need to save the like object of liked model in the likes array

        // toh apn ko jis bhi post par like kara hai usko find karna hai
        // find the post by id
        // hame update karna hoga post collection ko
        const updatedPost = await Post.findByIdAndUpdate(post , {$push : {likes: savedLike._id}} , {new: true})
                            .populate("likes").exec();

        res.json({
            post : updatedPost
        })
    }
    catch(err){
        return res.json({
            err:"error while liking a post :-("
        })
    }
}

// unlike a post
exports.unlikePost = async (req,res) =>{
    try{
        // extracting data
        const {post , like} = req.body;

        // find and delete the like from like model
        const deleteLike = await Like.findOneAndDelete({post:post , _id:like});

        // update the post collection 
        const updatedPost = await Post.findByIdAndUpdate(post , {$pull: {likes: deleteLike._id}} , {new:true})

        res.json({
            post:updatedPost
        })
    }

    catch(err){
        return res.json({
            err:"error while unlinking a post :-("
        })
    }
}