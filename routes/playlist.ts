import express from "express";
const router = express.Router();

import { createPlaylist, getPlaylists, deletePlaylist } from "../controllers";
import { auth } from "../middleware";

router.get("/", auth, getPlaylists);
router.post("/", auth, createPlaylist);
router.delete("/:playlistId", auth, deletePlaylist);

export default router;
