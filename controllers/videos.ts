import { Request, Response } from "express";
import { Video } from "../models";

export const getAllVideos = async (_, res: Response) => {
  try {
    const videos = await Video.find();
    return res.status(200).send(videos);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).send("Video not found");
    return res.status(200).send(video);
  } catch (err) {
    res.status(500).send(err);
  }
};
