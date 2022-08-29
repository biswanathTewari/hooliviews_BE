import express from "express";
const router = express.Router();

import { getAllVideos } from "../controllers";

router.get("/", getAllVideos);

export default router;
