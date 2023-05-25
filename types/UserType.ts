import { Schema } from "mongoose";

export default interface UserType {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  image: string;
}
