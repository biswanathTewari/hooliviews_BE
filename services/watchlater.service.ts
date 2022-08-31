import { isValidObjectId, Schema, Types } from "mongoose";
import {
  WatchLater,
  IWatchLater,
  validateWatchLater,
  Video,
  IVideo,
} from "../models";
import { responseObject } from "../helpers";

const getLaterVideos = async (userId: string): Promise<responseObject> => {
  try {
    const videoArray: Array<IWatchLater> = await WatchLater.find({
      user: new Types.ObjectId(userId),
    })
      .populate("video")
      .select("-user -_id");

    const watchlater: Array<Schema.Types.ObjectId> = videoArray.map(
      (item) => item.video
    );
    return { success: true, data: { watchlater } };
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

const addToLater = async (
  videoId: string,
  userId: string
): Promise<responseObject> => {
  try {
    //~ Validate the request body
    const { error } = validateWatchLater({ video: videoId });
    if (error) throw { status: 400, message: error.details[0].message };

    if (!isValidObjectId(videoId))
      throw { status: 400, message: "Invalid video id" };

    //~ Check if video exists
    const video: IVideo = await Video.findById(videoId);
    if (!video) throw { message: "Video not found", status: 404 };

    //~ Check if the video is already in watch later
    const laterVideo: IWatchLater = await WatchLater.findOne({
      video: new Types.ObjectId(videoId),
      user: new Types.ObjectId(userId),
    });
    if (laterVideo)
      throw { message: "Video already added to watch later", status: 400 };

    //~ Create a new like
    const newVideo = new WatchLater({
      video: new Types.ObjectId(videoId),
      user: new Types.ObjectId(userId),
    });
    await newVideo.save();
    return { success: true, data: { video } };
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

const removeLater = async (videoId: string, userId: string) => {
  try {
    //~ Validate the request body
    const { error } = validateWatchLater({ video: videoId });
    if (error) throw { status: 400, message: error.details[0].message };

    if (!isValidObjectId(videoId))
      throw { status: 400, message: "Invalid video id" };

    //~ Check if video exists
    const video: IVideo = await Video.findById(videoId);
    if (!video) throw { message: "Video not found", status: 404 };

    //~ Remove the video from watchlater
    await WatchLater.deleteOne({
      video: new Types.ObjectId(videoId),
      user: new Types.ObjectId(userId),
    });

    return await getLaterVideos(userId); //~ return the updated list of watchlater videos
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

export default { getLaterVideos, addToLater, removeLater };
