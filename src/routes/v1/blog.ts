import createBlog from "@/controllers/v1/blog/create_blog";
import authorize from "@/lib/authorize";
import authenticate from "@/middleware/authenticate";
import uploadBlogBanner from "@/middleware/uploadBlogBanner";
import validationError from "@/middleware/validationError";
import { Router } from "express";
import { body } from "express-validator";
import multer from "multer";

const upload = multer();

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  upload.single("banner_image"),
  uploadBlogBanner("post"),
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 180 })
    .withMessage("Title must be less than 180 characters"),
  body("content").trim().notEmpty().withMessage("Connent is required"),
  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Status must be one of the value, draft or published"),
  validationError,
  createBlog
);

export default router;
