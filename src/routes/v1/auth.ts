import register from "@/controllers/v1/auth/register";
import validationError from "@/middleware/validationError";
import user from "@/models/user";
import { Router } from "express";
import { body } from "express-validator";

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
      const userExists = await user.exists({ email: value });
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

router.post("/login");

export default router;
