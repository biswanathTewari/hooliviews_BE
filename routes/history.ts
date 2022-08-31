import express from "express";
const router = express.Router();

import { getHistory, addHistory } from "../controllers";
import { auth } from "../middleware";

router.get("/", auth, getHistory);
router.post("/:videoId", auth, addHistory);

export default router;
