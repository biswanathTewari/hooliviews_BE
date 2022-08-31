import { Video } from "../models";
import { responseObject } from "../helpers";

const getAllVideos = async (): Promise<responseObject> => {
  try {
    const videos = await Video.find();
    return { success: true, data: { videos } };
  } catch (err) {
    return { success: false, data: { err }, status: 500 };
  }
};

const getVideoById = async (videoId: number): Promise<responseObject> => {
  try {
    const video = await Video.findById(videoId);
    if (!video) throw { status: 404, message: "Video not found" };
    return { success: true, data: { video } };
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

export default { getAllVideos, getVideoById };
