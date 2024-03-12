import { Schema, model } from "mongoose";
import ProfileEntity from "../entities/ProfileEntity";

//Allow to manage the mongo db connection
const ProfileScheme = new Schema<ProfileEntity>(
  {
    profileName: { type: String, required: true, unique: true },
    profileStatus: { type: Number, enum: [1, 2, 3], default: 1 },
  },
  { versionKey: false }
);

export default model("Profile", ProfileScheme, "Profile");
