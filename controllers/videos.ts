import { Request, Response } from "express";
import { Video } from "../models";
import { ResponseWrapper } from "../helpers";

export const getAllVideos = async (_, res: Response) => {
  try {
    const videos = await Video.find();
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.created({ success: true, data: { videos } });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).send("Video not found");

    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.created({ success: true, data: { video } });
  } catch (err) {
    res.status(500).send(err);
  }
};
