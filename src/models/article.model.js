import { Schema } from "mongoose";

const ArticleSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  excerpt: {
    type: String,
  },
  status: {
    type: String,
  },
});
