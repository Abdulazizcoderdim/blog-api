import login from "@/controllers/v1/auth/login";
import refreshToken from "@/controllers/v1/auth/refresh_token";
import register from "@/controllers/v1/auth/register";
import validationError from "@/middleware/validationError";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { Router } from "express";
import { body, cookie } from "express-validator";

const router = Router();

router.post(
  "/register",
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Elektron pochta kerak")
    .isLength({ max: 50 })
    .withMessage("Elektron pochta 50 belgidan kam bo'lishi kerak")
    .isEmail()
    .withMessage("Yaroqsiz elektron pochta manzillari")
    .custom(async (value) => {
      const userExists = await User.exists({ email: value });
      if (userExists) throw new Error("User already exists.");
    }),
  body("password")
    .notEmpty()
    .withMessage("Password talab qilinadi")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("role")
    .optional()
    .isString()
    .withMessage("Role must be a string")
    .isIn(["admin", "user"])
    .withMessage("Role must be either admin or user"),
  validationError,
  register
);

router.post(
  "/login",
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Elektron pochta kerak")
    .isLength({ max: 50 })
    .withMessage("Elektron pochta 50 belgidan kam bo'lishi kerak")
    .isEmail()
    .withMessage("Yaroqsiz elektron pochta manzillari"),
  body("password")
    .notEmpty()
    .withMessage("Password talab qilinadi")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .custom(async (value, { req }) => {
      const { email } = req.body as { email: string };
      const user = await User.findOne({ email })
        .select("password")
        .lean()
        .exec();

      if (!user) {
        throw new Error("User email or password is invalid");
      }

      const passwordMatch = await bcrypt.compare(value, user.password);

      if (!passwordMatch) {
        throw new Error("User email or password is invalid");
      }
    }),
  validationError,
  login
);

router.post(
  "/refresh-token",
  cookie("refreshToken")
    .notEmpty()
    .withMessage("Refresh token required")
    .isJWT()
    .withMessage("Invalid refresh token"),
  validationError,
  refreshToken
);

export default router;
