import { Schema, model, Types } from "mongoose";
import UserEntity from "../entities/UserEntity";

//Allow to manage the mongo db connection
const UserScheme = new Schema<UserEntity>(
  {
    nameUser: { type: String, required: true, trim: true },
    emailUser: { type: String, required: true, unique: true },
    passwordUser: { type: String, required: true },
    stateUser: { type: Number, enum: [1, 2, 3], default: 1 },
    dateUser: { type: Date, default: Date.now() },
    nameUserImg: { type: String, default: "noAvatar.png" },
    userAvatar: { type: String, default: "noAvatar" },
    codProfile: { type: Types.ObjectId, ref: "Profile", required: true },
  },
  { versionKey: false }
);

export default model("User", UserScheme, "User");
