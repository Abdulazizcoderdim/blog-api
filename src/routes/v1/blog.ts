import createBlog from "@/controllers/v1/blog/create_blog";
import deleteBlog from "@/controllers/v1/blog/delete_blog";
import getAllBlogs from "@/controllers/v1/blog/get_all_blogs";
import getBlogBySlug from "@/controllers/v1/blog/get_blog_by_slug";
import getBlogsByUser from "@/controllers/v1/blog/get_blog_by_user";
import updateBlog from "@/controllers/v1/blog/update_blog";
import authorize from "@/lib/authorize";
import authenticate from "@/middleware/authenticate";
import uploadBlogBanner from "@/middleware/uploadBlogBanner";
import validationError from "@/middleware/validationError";
import { Router } from "express";
import { body, param, query } from "express-validator";
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
  authorize(["admin", "user"]),
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

router.get(
  "/user/:userId",
  authenticate,
  authorize(["admin", "user"]),
  param("userId").isMongoId().withMessage("Invalid user ID"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 to 50"),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a positive integer"),
  validationError,
  getBlogsByUser
);

router.get(
  "/:slug",
  authenticate,
  authorize(["admin", "user"]),
  param("slug").notEmpty().withMessage("Slug is required"),
  validationError,
  getBlogBySlug
);

router.put(
  "/:blogId",
  authenticate,
  authorize(["admin"]),
  param("blogId").isMongoId().withMessage("Invalid blog ID"),
  upload.single("banner_image"),
  body("title")
    .optional()
    .isLength({ max: 180 })
    .withMessage("Title must be less than 180 characters"),
  body("content"),
  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Status must be one the value, draft or published"),
  validationError,
  uploadBlogBanner("put"),
  updateBlog
);

router.delete(
  "/:blogId",
  authenticate,
  authorize(["admin"]),
  param("blogId").isMongoId().withMessage("Invalid blog ID"),
  validationError,
  deleteBlog
);

export default router;
