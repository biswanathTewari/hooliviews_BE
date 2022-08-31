import express from "express";
const router = express.Router();

import { getLaterVideos, addToLater } from "../controllers";
import { auth } from "../middleware";

router.get("/", auth, getLaterVideos);
router.post("/:videoId", auth, addToLater);

export default router;
