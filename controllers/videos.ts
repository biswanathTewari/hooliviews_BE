import { Video } from "../models";

export const getAllVideos = async (_, res: any) => {
  try {
    const videos = await Video.find();
    return res.status(200).send(videos);
  } catch (err) {
    res.status(500).send(err);
  }
};
