import { response } from "express";
import postMessage from "../models/postMessage.js";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find();
    // console.log("postMessage", postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  res.send("Get Message Route");
};
export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
  res.send("Post Message Route");
};
