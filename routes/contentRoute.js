const getCommentsByPost = require("../functions/getCommentsByPost");
const placeComment = require("../functions/placeComment");
const placeLike = require("../functions/placeLike");
const Post = require("../models/post");

const contentRoute = require("express").Router();

contentRoute.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.json({ content: posts });
  } catch (err) {
    next(err);
  }
});

contentRoute.get("/images", async (req, res, next) => {
  try {
    const allPosts = await Post.find({});
    const images = allPosts.map((post) => post.imageURLs).flat();
    const finalImages = images.map((img) => ({
      src: img,
      height: 500,
      width: 300,
    }));

    res.json({ images: finalImages });
    // images: [
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1592403386852-6f3c746e1ea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyY2Vsb25hJTIwYWlycG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1680169822776-c36e0fabb0ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhcmNlbG9uYSUyMGFpcnBvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1592403386852-6f3c746e1ea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyY2Vsb25hJTIwYWlycG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1680169822776-c36e0fabb0ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhcmNlbG9uYSUyMGFpcnBvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1592403386852-6f3c746e1ea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyY2Vsb25hJTIwYWlycG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1680169822776-c36e0fabb0ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhcmNlbG9uYSUyMGFpcnBvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1592403386852-6f3c746e1ea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyY2Vsb25hJTIwYWlycG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1680169822776-c36e0fabb0ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhcmNlbG9uYSUyMGFpcnBvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1592403386852-6f3c746e1ea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyY2Vsb25hJTIwYWlycG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1680169822776-c36e0fabb0ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhcmNlbG9uYSUyMGFpcnBvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1592403386852-6f3c746e1ea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyY2Vsb25hJTIwYWlycG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1680169822776-c36e0fabb0ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhcmNlbG9uYSUyMGFpcnBvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1592403386852-6f3c746e1ea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyY2Vsb25hJTIwYWlycG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1680169822776-c36e0fabb0ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhcmNlbG9uYSUyMGFpcnBvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1592403386852-6f3c746e1ea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyY2Vsb25hJTIwYWlycG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1680169822776-c36e0fabb0ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhcmNlbG9uYSUyMGFpcnBvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1592403386852-6f3c746e1ea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyY2Vsb25hJTIwYWlycG9ydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    //   {
    //     height: 500,
    //     width: 300,
    //     src: "https://images.unsplash.com/photo-1680169822776-c36e0fabb0ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhcmNlbG9uYSUyMGFpcnBvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    //   },
    // ],
  } catch (err) {
    next(err);
  }
});

contentRoute.post("/like", async (req, res, next) => {
  try {
    const response = await placeLike(req.body.userId, req.body.postId);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

contentRoute.post("/comment", async (req, res, next) => {
  try {
    const response = await placeComment(
      req.body.comment.text,
      req.body.comment.date,
      req.body.userId,
      req.body.postId
    );
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

contentRoute.get("/comment/:postId", async (req, res, next) => {
  try {
    const response = await getCommentsByPost(req.params.postId);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = contentRoute;
