import { Schema } from "mongoose";
import { UserType } from "./UserType";

interface PostType {
  _id: Schema.Types.ObjectId;
  prompt: string;
  tag: string;
  creator: UserType;
}

export default PostType;
