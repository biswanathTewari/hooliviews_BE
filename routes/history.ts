import express from "express";
const router = express.Router();

import {
  getHistory,
  addHistory,
  removeFromHistory,
  clearHistory,
} from "../controllers";
import { auth } from "../middleware";

router.get("/", auth, getHistory);
router.post("/:videoId", auth, addHistory);
router.delete("/all", auth, clearHistory);
router.delete("/:videoId", auth, removeFromHistory);

export default router;
