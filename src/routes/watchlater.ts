import express from "express";
const router = express.Router();

import { getLaterVideos, addToLater, removeFromLater } from "../controllers";
import { auth } from "../middleware";

router.get("/", auth, getLaterVideos);
router.post("/:videoId", auth, addToLater);
router.delete("/:videoId", auth, removeFromLater);

export default router;
