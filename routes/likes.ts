import express from "express";
const router = express.Router();

import { likeVideoById, getAllLikedVideos } from "../controllers";
import { auth } from "../middleware";

router.get("/", auth, getAllLikedVideos);
router.post("/:videoId", auth, likeVideoById);

export default router;
