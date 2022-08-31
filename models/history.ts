import { Schema, Model, model } from "mongoose";
import Joi from "joi";

//& interfaces
interface IHistory {
  video: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}

interface IHistoryMethods {}

type HistoryModel = Model<IHistory, {}, IHistoryMethods>;

//& Schema
const historySchema = new Schema<IHistory, HistoryModel, IHistoryMethods>({
  video: { type: Schema.Types.ObjectId, ref: "videos", required: true },
  user: { type: Schema.Types.ObjectId, ref: "hooliusers", required: true },
});

//& Model
const History = model<IHistory, HistoryModel>("History", historySchema);

//& Validation
const validateHistory = (item) => {
  const schema = Joi.object({
    video: Joi.string().required(),
  });
  return schema.validate(item);
};

export { History, validateHistory, IHistory };
