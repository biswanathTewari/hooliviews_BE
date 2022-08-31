import express from "express";
const router = express.Router();

import { getHistory } from "../controllers";
import { auth } from "../middleware";

router.get("/", auth, getHistory);

export default router;
