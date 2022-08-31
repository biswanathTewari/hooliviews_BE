import { isValidObjectId, Schema, Types } from "mongoose";
import { Likes, Video, validateLikes, ILikes, IVideo } from "../models";
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
    const video: IVideo = await Video.findById(videoId);
    if (!video) throw { message: "Video not found", status: 404 };

    //~ Check if the user has already liked the video
    const like: ILikes = await Likes.findOne({
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

const getAllLikedVideos = async (userId: string): Promise<responseObject> => {
  try {
    const likeArray: Array<ILikes> = await Likes.find({
      user: new Types.ObjectId(userId),
    })
      .populate("video")
      .select("-user -_id");

    const likes: Array<Schema.Types.ObjectId> = likeArray.map(
      (like) => like.video
    );
    return { success: true, data: { likes } };
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

const removeLike = async (videoId: string, userId: string) => {
  try {
    //~ Validate the request body
    const { error } = validateLikes({ video: videoId });
    if (error) throw { status: 400, message: error.details[0].message };

    if (!isValidObjectId(videoId))
      throw { status: 400, message: "Invalid video id" };

    //~ Check if video exists
    const video: IVideo = await Video.findById(videoId);
    if (!video) throw { message: "Video not found", status: 404 };

    //~ Remove the liked video
    await Likes.deleteOne({
      video: new Types.ObjectId(videoId),
      user: new Types.ObjectId(userId),
    });

    return await getAllLikedVideos(userId); //~ return the updated list of liked videos
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

export default { likeVideoById, getAllLikedVideos, removeLike };
