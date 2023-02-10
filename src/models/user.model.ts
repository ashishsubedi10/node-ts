import mongoose, { Document, Schema } from "mongoose";


export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
}

const userSchema = new Schema<IUser>(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export { User };
