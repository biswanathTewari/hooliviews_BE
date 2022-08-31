import { isValidObjectId, Schema, Types } from "mongoose";
import { History, IHistory } from "../models";
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

export default { getAllVideos };
