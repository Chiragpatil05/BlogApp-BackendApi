// importing express 
const express = require("express");
// importing router module for routing
const router = express.Router();

// import controllers
const {dummyLink} = require("../controllers/likeController");
const {createComment} = require("../controllers/commentController");
const {createPost} = require("../controllers/postController");
const {getAllPosts} = require("../controllers/postController");
const {likePost} = require("../controllers/likeController");
const {unlikePost} = require("../controllers/likeController");


// map controllers
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);



// export controllers
module.exports = router;