const Post = require("../models/post.models");

const createPost = async (req, res) => {
  const author_user = req.user.username;
  console.log(author_user);
  const title = req.body.title;

  const content = req.body.content;
  console.log(title, content);
  const newPost = new Post({
    author_user,
    title,
    content,
    date_posted: new Date().toLocaleString(),
  });

  try {
    const savePost = await newPost.save();
    console.log(savePost.date_posted);
    res.send(savePost);
  } catch (err) {
    console.log(err);
    res.send("Error occur while saving the post", 404);
  }
};

const allPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.send("Error occur while getting the posts", 404);
  }
};

const myPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author_user: req.user.username });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.send("Error occur while getting your posts", 404);
  }
};

const updateMyPost = async (req, res) => {
  const id = req.params.id;
  const content = req.body.content;
  try {
    const updatePost = await Post.findByIdAndUpdate(
      { _id: id },
      {
        content: content,
        date_posted: new Date().toLocaleString()+"(updated)",
      },
      { new: true }
    );
    res.send(updatePost);
  } catch (err) {
    console.log(err);
    res.send("Error occur while updating post", 404);
  }
};

const deleteMyPost = async (req, res) => {
  const id = req.params.id;
  try {
    await Post.findByIdAndRemove({ _id: id });
    res.send("Post deleted successfully");
  } catch (err) {
    console.log(err);
    res.send("Error occur while deleting post", 404);
  }
};

module.exports = { createPost, allPosts, myPosts, updateMyPost, deleteMyPost };
