import mongoose from "mongoose";
import Joi from "joi";

//& Schema
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  creator: { type: String, required: true },
  creatorImg: { type: String, required: true },
  duration: { type: String, required: true },
});

//& Model
const Video = mongoose.model("videos", videoSchema);

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
