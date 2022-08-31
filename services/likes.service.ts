import { isValidObjectId, Types } from "mongoose";
import { Likes, Video, validateLikes } from "../models";
import { responseObject } from "../helpers";

const likeVideoById = async (
  videoId: string,
  userId: string
): Promise<responseObject> => {
  try {
    //~ Validate the request body
    const { error } = validateLikes({ video: videoId });
    if (error) throw { status: 400, message: error.details[0].message };

    if (!isValidObjectId(videoId))
      throw { status: 400, message: "Invalid video id" };

    //~ Check if video exists
    const video = await Video.findById(videoId);
    if (!video) throw { message: "Video not found", status: 404 };

    //~ Check if the user has already liked the video
    const like = await Likes.findOne({
      video: new Types.ObjectId(videoId),
      user: new Types.ObjectId(userId),
    });
    if (like) throw { message: "Video already liked", status: 400 };

    //~ Create a new like
    const newLike = new Likes({
      video: new Types.ObjectId(videoId),
      user: new Types.ObjectId(userId),
    });
    await newLike.save();
    return { success: true, data: { video } };
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

export default { likeVideoById };
