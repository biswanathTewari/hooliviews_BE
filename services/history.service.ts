import { isValidObjectId, Schema, Types } from "mongoose";
import { History, IHistory, validateHistory, Video, IVideo } from "../models";
import { responseObject } from "../helpers";

const getAllVideos = async (userId: string): Promise<responseObject> => {
  try {
    const videoArray: Array<IHistory> = await History.find({
      user: new Types.ObjectId(userId),
    })
      .populate("video")
      .select("-user -_id");

    const history: Array<Schema.Types.ObjectId> = videoArray.map(
      (item) => item.video
    );
    return { success: true, data: { history } };
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

const addHistory = async (
  videoId: string,
  userId: string
): Promise<responseObject> => {
  try {
    //~ Validate the request body
    const { error } = validateHistory({ video: videoId });
    if (error) throw { status: 400, message: error.details[0].message };

    if (!isValidObjectId(videoId))
      throw { status: 400, message: "Invalid video id" };

    //~ Check if video exists
    const video: IVideo = await Video.findById(videoId);
    if (!video) throw { message: "Video not found", status: 404 };

    //~ Check if the video is already in history
    const historyVideo: IHistory = await History.findOne({
      video: new Types.ObjectId(videoId),
      user: new Types.ObjectId(userId),
    });
    if (historyVideo) throw { message: "Video already liked", status: 400 };

    //~ Add video to history
    const newHistoryVideo = new History({
      video: new Types.ObjectId(videoId),
      user: new Types.ObjectId(userId),
    });
    await newHistoryVideo.save();
    return await getAllVideos(userId);
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

const removeHistory = async (videoId: string, userId: string) => {
  try {
    //~ Validate the request body
    const { error } = validateHistory({ video: videoId });
    if (error) throw { status: 400, message: error.details[0].message };

    if (!isValidObjectId(videoId))
      throw { status: 400, message: "Invalid video id" };

    //~ Check if video exists
    const video: IVideo = await Video.findById(videoId);
    if (!video) throw { message: "Video not found", status: 404 };

    //~ Remove the liked video
    await History.deleteOne({
      video: new Types.ObjectId(videoId),
      user: new Types.ObjectId(userId),
    });

    return await getAllVideos(userId); //~ return the updated list of liked videos
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

export default { getAllVideos, addHistory, removeHistory };
