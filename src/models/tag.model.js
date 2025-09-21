import { Schema, model } from "mongoose";

export const TagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 30,
    },
    description: {
      type: String,
      maxLength: 200,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const TagModel = model("Tag", TagSchema);
