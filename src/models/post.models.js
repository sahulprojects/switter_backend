const mongoose = require("mongoose");

const PostsSchema = mongoose.Schema({
  author_user: {
    type: String,
    reuired: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  liked_users: [
    {
      type: String,
    },
  ],
  disliked_users: [
    {
      type: String,
    },
  ],
  comments: [],
  date_posted: {
    type: String,
  },
});

module.exports = Post = mongoose.model("Post", PostsSchema);
