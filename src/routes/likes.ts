import express from "express";
const router = express.Router();

import { likeVideoById, getAllLikedVideos, removeLike } from "../controllers";
import { auth } from "../middleware";

router.get("/", auth, getAllLikedVideos);
router.post("/:videoId", auth, likeVideoById);
router.delete("/:videoId", auth, removeLike);

export default router;
