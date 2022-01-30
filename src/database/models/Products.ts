import mongoose, { model, Schema } from "mongoose";

import { IProduct } from "../../helpers/common/types/Products";

const Product: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", Product, "products");

//export default model<IUser>("User", userSchema)
