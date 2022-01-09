import { model, Schema } from "mongoose"
import { IUser } from "../../helpers/common/types/User"

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default model<IUser>("User", userSchema)