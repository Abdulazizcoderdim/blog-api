import createBlog from "@/controllers/v1/blog/create_blog";
import authorize from "@/lib/authorize";
import authenticate from "@/middleware/authenticate";
import uploadBlogBanner from "@/middleware/uploadBlogBanner";
import validationError from "@/middleware/validationError";
import { Router } from "express";
import { body, query } from "express-validator";
import multer from "multer";

const upload = multer();

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  upload.single("banner_image"),
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
  uploadBlogBanner("post"),
  createBlog
);

router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 to 50"),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a positive integer"),
  validationError,
  getAllBlogs
);

export default router;
