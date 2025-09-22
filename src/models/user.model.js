import { Schema, model } from "mongoose";

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
      //   select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      first_name: { type: String, required: true, minLength: 2, maxLength: 50 },
      last_name: { type: String, required: true, minLength: 2, maxLength: 50 },
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
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model("User", UserSchema);

// UserModel.pre(/^find/, function (next) {
//   this.where({ deletedAt: { $eq: null } });
//   next();
// });
//Esta función es para que siempre que use un metodo find solo lleve los que no están eliminados.
