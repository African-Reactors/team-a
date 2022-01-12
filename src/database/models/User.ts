import mongoose, { model, Schema } from "mongoose";

import { IUser } from "../../helpers/common/types/User";

const User: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    access_token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", User, "users");

//export default model<IUser>("User", userSchema)
