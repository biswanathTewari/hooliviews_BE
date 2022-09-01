import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { videos, auth, likes, watchlater, history, playlist } from "../routes";

const app = express();
app.use(express.json());
dotenv.config();

//^ db connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/hooliviews")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

//^ routes
app.get("/", (_, res: any) => {
  res.send("Welcome to HooliViews Server!");
});
app.use("/api/videos", videos);
app.use("/api/auth", auth);
app.use("/api/user/likes", likes);
app.use("/api/user/watchlater", watchlater);
app.use("/api/user/history", history);
app.use("/api/user/playlist", playlist);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(`Server listening on port ${port}`);
});
