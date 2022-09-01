import express from "express";
const router = express.Router();

import { createPlaylist, getPlaylists } from "../controllers";
import { auth } from "../middleware";

router.get("/", auth, getPlaylists);
router.post("/", auth, createPlaylist);

export default router;
