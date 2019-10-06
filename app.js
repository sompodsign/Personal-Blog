//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

const postsSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postsSchema);

const homeStartingContent = "This is Shampad Sharkar. I'm from Bangladesh. I was born and raised in Sherpur but moved here(Dhaka) 5 years ago for my further study. Now I'm working as a freelance web developer. Thank you for visiting my blog.";
const aboutContent = "Thank you so much for visiting my journal. I always dreamed about my own journal where I'll keep notes for everything where I'll be able to share my daily stories. So here it is. I am Shampad Sharkar. Currently I'm living in Dhaka, Bangladesh and working as a freelance web developer. When I dreamed about my personal journal I didn't know how to build one. I think now I'll be able to keep my daily journal here. ";
const contactContent = "Email: sompod123@gmail.com";

const app = express();


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    res.render("home", {
      postOne: homeStartingContent,
      posts: posts
    });
  });
});


app.get("/about", function(req, res) {
  res.render("about", {
    about: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contact: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postText
  });
  post.save();
  res.redirect("/");
});

app.get("/posts/:postId", function(req, res) {
const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post) {
      res.render("post",  {
        postTitle: post.title,
        postContent: post.content
      });
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
