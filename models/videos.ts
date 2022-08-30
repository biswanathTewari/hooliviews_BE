import { Schema, Model, model } from "mongoose";
import Joi from "joi";

//& interfaces
interface IVideo {
  title: string;
  description: string;
  img: string;
  creator: string;
  creatorImg: string;
  duration: string;
}

interface IVideoMethods {}

type VideoModel = Model<IVideo, {}, IVideoMethods>;

//& Schema
const videoSchema = new Schema<IVideo, VideoModel, IVideoMethods>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  creator: { type: String, required: true },
  creatorImg: { type: String, required: true },
  duration: { type: String, required: true },
});

//& Model
const Video = model<IVideo, VideoModel>("videos", videoSchema);

//& Validation
const validateVideo = (video) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    img: Joi.string().required(),
    creator: Joi.string().required(),
    creatorImg: Joi.string().required(),
    duration: Joi.string().required(),
  });
  return schema.validate(video);
};

export { Video, validateVideo };
