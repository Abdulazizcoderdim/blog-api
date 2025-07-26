import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    x?: string;
    youtube?: string;
  };
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Foydalanuvchi nomi talab qilinadi"],
      maxlength: [20, "Foydalanuvchi nomi 20 ta belgidan oshmasligi kerak"],
      unique: [true, "Foydalanuvchi nomi noyob bo'lishi kerak"],
    },
    email: {
      type: String,
      required: [true, "Elektron pochta talab qilinadi"],
      maxlength: [50, "Elektron pochta 50 belgidan kam bo'lishi kerak"],
      unique: [true, "Elektron pochta noyob bo'lishi kerak"],
    },
    password: {
      type: String,
      required: [true, "Password talab qilinadi"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "Role talab qilinadi"],
      enum: {
        values: ["admin", "user"],
        message: "{VALUE} qo'llab-quvvatlanmaydi",
      },
      default: "user",
    },
    firstName: {
      type: String,
      maxlength: [20, "First name must be less than 20 characters"],
    },
    lastName: {
      type: String,
      maxlength: [20, "Last name must be lass than 20 characters"],
    },
    socialLinks: {
      website: {
        type: String,
        maxlength: [100, "Website address must be less than 100 characters"],
      },
      facebook: {
        type: String,
        maxlength: [100, "Facebook address must be less than 100 characters"],
      },
      instagram: {
        type: String,
        maxlength: [100, "Instagram address must be less than 100 characters"],
      },
      linkedin: {
        type: String,
        maxlength: [100, "Linkedin address must be less than 100 characters"],
      },
      x: {
        type: String,
        maxlength: [100, "X address must be less than 100 characters"],
      },
      youtube: {
        type: String,
        maxlength: [100, "YouTube address must be less than 100 characters"],
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default model<IUser>("User", userSchema);
