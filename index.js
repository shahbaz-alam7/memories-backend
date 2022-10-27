import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRouter from "./routes/posts.js";

const app = express();
app.use("/post", postRouter);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECT_URL =
  "mongodb+srv://itzshah:itzshah07@javascript.qzdb2ml.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
// mongoose.set("useFindAndModify", false);
