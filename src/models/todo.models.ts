import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface ITodo {
  title: string;
  description: string;
  user:IUser
}

const TodoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user:{}
  },
  { timestamps: true }
);
