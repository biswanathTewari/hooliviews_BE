import express from "express";
const router = express.Router();

import { getLaterVideos } from "../controllers";
import { auth } from "../middleware";

router.get("/", auth, getLaterVideos);

export default router;
