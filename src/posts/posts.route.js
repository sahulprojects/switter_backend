const express = require("express");
const PostRouter = express.Router();
const {
  createPost,
  allPosts,
  myPosts,
  updateMyPost,
  deleteMyPost,
  likePost,
  dislikePost,
  commentPost,
} = require("./posts.serivce");

PostRouter.post("/createPost", createPost);
PostRouter.get("/allPosts", allPosts);
PostRouter.get("/myPosts", myPosts);
PostRouter.put("/updateMyPost/:id", updateMyPost);
PostRouter.delete("/deleteMyPost/:id", deleteMyPost);
PostRouter.get("/likePost/:id", likePost);
PostRouter.get("/dislikePost/:id", dislikePost);
PostRouter.put("/commentPost/:id", commentPost);

module.exports = PostRouter;
