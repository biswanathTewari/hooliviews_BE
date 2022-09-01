import { isValidObjectId, Schema, Types } from "mongoose";
import {
  validatePlaylist,
  Playlist,
  IPlaylist,
  IPlaylistItem,
  IVideo,
  Video,
} from "../models";
import { responseObject } from "../helpers";

const getPlaylists = async (userId: string): Promise<responseObject> => {
  try {
    //~ Check if the user exists
    if (!isValidObjectId(userId))
      throw { status: 400, message: "Something went wrong" };

    //~ Get all the playlists of the user
    const playlists: Array<IPlaylist> = await Playlist.find({
      user: new Types.ObjectId(userId),
    })
      .populate("videos.video")
      .select("-user");
    return { success: true, data: { playlists } };
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

const createPlaylist = async (
  title: string,
  description: string,
  userId: string
): Promise<responseObject> => {
  try {
    //~ Validate the request body
    const { error } = validatePlaylist({ title, description });
    if (error) throw { status: 400, message: error.details[0].message };

    //~ check if a playlist already exists with a given title
    const playlist: Array<IPlaylist> = await Playlist.findOne({
      title,
      user: new Types.ObjectId(userId),
    });
    if (playlist)
      throw {
        status: 400,
        message: "A playlist already exists, with the given title",
      };

    //~ Create a new playlist
    const newPlaylist = new Playlist({
      title,
      description,
      user: new Types.ObjectId(userId),
      playlists: [],
    });
    await newPlaylist.save();
    return await getPlaylists(userId);
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

const deletePlaylist = async (
  playlistId: string,
  userId: string
): Promise<responseObject> => {
  try {
    //~ Check if the playlist exists
    const playlist: Array<IPlaylist> = await Playlist.findOne({
      _id: new Types.ObjectId(playlistId),
      user: new Types.ObjectId(userId),
    });
    if (!playlist) throw { status: 404, message: "Playlist not found" };

    //~ Delete the playlist
    await Playlist.findByIdAndDelete(playlistId);
    return await getPlaylists(userId);
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

const addVideoToPlaylist = async (
  playlistId: string,
  videoId: string,
  userId: string
) => {
  try {
    //~ Check for valid ids
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId))
      throw { status: 400, message: "Something went wrong" };

    //~ Check if the playlist exists
    const playlist = await Playlist.findOne({
      _id: new Types.ObjectId(playlistId),
      user: new Types.ObjectId(userId),
    });
    if (!playlist) throw { status: 404, message: "Playlist not found" };

    //~ Check if the video exists
    const videoExists: IVideo = await Video.findOne({
      _id: new Types.ObjectId(videoId),
      user: new Types.ObjectId(userId),
    });
    if (!videoExists) throw { status: 404, message: "Video not found" };

    //~ Check if the video exists in the playlist
    const video: IPlaylistItem = playlist.videos.find(
      (video) => video.video === new Schema.Types.ObjectId(videoId)
    );
    if (video)
      throw { status: 400, message: "Video already exists in the playlist" };

    //~ Add the video to the playlist
    // @ts-ignore
    playlist.videos.push({ video: new Types.ObjectId(videoId) });
    await playlist.save();
    return await getPlaylists(userId);
  } catch (err) {
    return {
      success: false,
      data: { message: err.message },
      status: err.status,
    };
  }
};

export default {
  createPlaylist,
  getPlaylists,
  deletePlaylist,
  addVideoToPlaylist,
};
