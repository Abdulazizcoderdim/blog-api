import commentBlog from "@/controllers/v1/comment/comment_blog";
import getCommentsByBlog from "@/controllers/v1/comment/get_comments_by_blog";
import authorize from "@/lib/authorize";
import authenticate from "@/middleware/authenticate";
import validationError from "@/middleware/validationError";
import { Router } from "express";
import { body, param } from "express-validator";

const router = Router();

router.post(
  "/blog/:blogId",
  authenticate,
  authorize(["admin", "user"]),
  param("blogId").isMongoId().withMessage("Invalid blog ID"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  validationError,
  commentBlog
);

router.get(
  "/blog/:blogId",
  authenticate,
  authorize(["admin", "user"]),
  param("blogId").isMongoId().withMessage("Invalid blog ID"),
  validationError,
  getCommentsByBlog
);

export default router;
