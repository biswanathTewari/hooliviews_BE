import { Schema, Model, model } from "mongoose";
import Joi from "joi";

//& interfaces
interface IWatchLater {
  video: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}

interface IWatchLaterMethods {}

type WatchLaterModel = Model<IWatchLater, {}, IWatchLaterMethods>;

//& Schema
const watchLaterSchema = new Schema<
  IWatchLater,
  WatchLaterModel,
  IWatchLaterMethods
>({
  video: { type: Schema.Types.ObjectId, ref: "videos", required: true },
  user: { type: Schema.Types.ObjectId, ref: "hooliusers", required: true },
});

//& Model
const WatchLater = model<IWatchLater, WatchLaterModel>(
  "WatchLater",
  watchLaterSchema
);

//& Validation
const validateWatchLater = (item) => {
  const schema = Joi.object({
    video: Joi.string().required(),
  });
  return schema.validate(item);
};

export { WatchLater, validateWatchLater, IWatchLater };
