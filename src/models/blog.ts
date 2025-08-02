import { model, Schema, Types } from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  banner: {
    publicId: string;
    url: string;
    width: number;
    height: number;
  };
  author: Types.ObjectId;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  status: "draft" | "published";
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: [180, "Title must be less than 180 characters."],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: [true, "Slug must be unique"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    banner: {
      publicId: {
        type: String,
        required: [true, "Banner public id is required"],
      },
      url: {
        type: String,
        required: [true, "Banner url id is required"],
      },
      width: {
        type: String,
        required: [true, "Banner width id is required"],
      },
      height: {
        type: String,
        required: [true, "Banner height id is required"],
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "published"],
        message: "{VALUE} is not supported",
      },
      default: "draft",
    },
  },
  {
    timestamps: {
      createdAt: "publishedAt",
    },
  }
);

export default model<IBlog>("Blog", blogSchema);
