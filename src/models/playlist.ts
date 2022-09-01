import { Schema, model, Model } from "mongoose";
import Joi from "joi";

//& interface
interface IPlaylistItem {
  video: Schema.Types.ObjectId;
}

interface IPlaylistItemMethods {}

type PlaylistItemModel = Model<IPlaylistItem, {}, IPlaylistItemMethods>;

interface IPlaylist {
  videos: Array<IPlaylistItem>;
  user: Schema.Types.ObjectId;
  title: string;
  description?: string;
}

interface IPlaylistMethods {}

type PlaylistModel = Model<IPlaylist, {}, IPlaylistMethods>;

//& Schema
const playlistItem = new Schema<
  IPlaylistItem,
  PlaylistItemModel,
  IPlaylistItemMethods
>({
  video: { type: Schema.Types.ObjectId, ref: "videos" },
});

const playlistSchema = new Schema<IPlaylist, PlaylistModel, IPlaylistMethods>({
  videos: [playlistItem],
  title: { type: String, required: true },
  description: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "hooliusers", required: true },
});

//& Model
const Playlist = model<IPlaylist, PlaylistModel>("Playlist", playlistSchema);

//& Validation
const validatePlaylist = (playlist) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
  });
  return schema.validate(playlist);
};

export { Playlist, validatePlaylist, IPlaylist, IPlaylistItem };
