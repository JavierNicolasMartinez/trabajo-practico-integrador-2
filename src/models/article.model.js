import { Schema } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 3,
      maxLength: 300,
    },
    content: {
      type: String,
      minLength: 50,
    },
    excerpt: {
      type: String,
      maxLength: 500,
    },
    status: {
      type: String,
      enum: ["published", "archived"],
      default: "published",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ArticleModel = model("Article", ArticleSchema);
