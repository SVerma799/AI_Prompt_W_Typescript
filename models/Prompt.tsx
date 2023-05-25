import { IUser } from "./User";
import mongoose, { Schema, Document } from "mongoose";

export interface IPrompt extends Document {
  prompt: string;
  tag: string;
  creator: IUser["_id"];
}
const PromptSchema: Schema = new Schema({
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
  creator: { type: Schema.Types.ObjectId, required: true, ref: "users" },
});

export default mongoose.models.Prompt ||
  mongoose.model<IPrompt>("Prompt", PromptSchema);
