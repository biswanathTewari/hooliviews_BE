import { isValidObjectId, Schema, Types } from "mongoose";
import { WatchLater, IWatchLater } from "../models";
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

export default { getLaterVideos };
