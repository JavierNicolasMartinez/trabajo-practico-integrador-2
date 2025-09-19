import { Schema } from "mongoose";
import { type } from "os";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
      match: /^[a-zA-Z0-9]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      firstName: { type: String, minLength: 2, maxLength: 50 },
      lastName: { type: String, minLength: 2, maxLength: 50 },
      biography: {
        type: String,
        maxLength: 500,
      },
      avatarUrl: {
        type: String,
        match: [
          /^(https?:\/\/)([\w.-]+)\.([a-z\.]{2,})([\/\w .-]*)*\/?$/i,
          "Debe ser una URL válida",
        ],
      },
      birthDate: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model("User", UserSchema);
