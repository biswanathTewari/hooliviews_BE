import express from "express";
const router = express.Router();

import { likeVideoById } from "../controllers";
import { auth } from "../middleware";

router.post("/:videoId", auth, likeVideoById);

export default router;
