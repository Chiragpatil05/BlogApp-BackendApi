// post create karni hai fetch karni hai

const Post = require("../models/postModel");

// creating post => it is a post method
exports.createPost = async (req,res) =>{
    try{
        // extracting data from request body
        const {title , body} = req.body;

        // creating post object
        const post = new Post({
            title , body
        });

        // saving or create entry of post object in the database
        const savedPost = await post.save();

        res.json({
            post:savedPost
        })
    }
    catch(err){
        return res.json({
            error:"error while creating post :-("
        })
    }
}

// fetching all posts => get method
exports.getAllPosts = async (req,res) =>{
    try{
        // const posts = await Post.find(); - agar sirf ye likha toh like aur comment wale array me sirf id aayegi
        // agar like aur comment wale array me actual like and comments ka data laana hai toh populate ka use karna padega]
        const posts = await Post.find({}).populate("comments").exec();
        res.json({
            posts,
        })
    }
    catch(err){
        return res.json({
            err:"error while fetching all the posts :-("
        })
    }
}