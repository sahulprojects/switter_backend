const express = require("express");
const PostRouter = express.Router();
const {
  createPost,
  allPosts,
  myPosts,
  updateMyPost,
  deleteMyPost,
} = require("./posts.serivce");

PostRouter.post("/createPost", createPost);
PostRouter.get("/allPosts", allPosts);
PostRouter.get("/myPosts", myPosts);
PostRouter.put("/updateMyPost/:id", updateMyPost);
PostRouter.delete("/deleteMyPost/:id", deleteMyPost);

module.exports = PostRouter;
