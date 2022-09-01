import { isValidObjectId, Schema, Types } from "mongoose";
import { validatePlaylist, Playlist } from "../models";
import { responseObject } from "../helpers";

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
    const playlist = await Playlist.findOne({
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
    return {
      success: true,
      data: { playlist: newPlaylist.playlists, _id: newPlaylist._id },
    };
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
};
