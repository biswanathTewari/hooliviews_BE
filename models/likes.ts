import { Schema, Model, model } from "mongoose";
import Joi from "joi";

//& interfaces
interface ILikes {
  video: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}

interface ILikesMethods {}

type LikesModel = Model<ILikes, {}, ILikesMethods>;

//& Schema
const likesSchema = new Schema<ILikes, LikesModel, ILikesMethods>({
  video: { type: Schema.Types.ObjectId, ref: "Video", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

//& Model
const Likes = model<ILikes, LikesModel>("Likes", likesSchema);

//& Validation
const validateLikes = (like) => {
  const schema = Joi.object({
    video: Joi.string().required(),
  });
  return schema.validate(like);
};

export { Likes, validateLikes };
