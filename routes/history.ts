import express from "express";
const router = express.Router();

import { getHistory, addHistory, removeFromHistory } from "../controllers";
import { auth } from "../middleware";

router.get("/", auth, getHistory);
router.post("/:videoId", auth, addHistory);
router.delete("/:videoId", auth, removeFromHistory);

export default router;
