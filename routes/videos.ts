import express from "express";
const router = express.Router();

import { getAllVideos, getVideoById } from "../controllers";

router.get("/", getAllVideos);
router.get("/:id", getVideoById);

export default router;
