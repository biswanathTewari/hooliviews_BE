import express from "express";
const router = express.Router();

import { createPlaylist } from "../controllers";
import { auth } from "../middleware";

router.post("/", auth, createPlaylist);

export default router;
