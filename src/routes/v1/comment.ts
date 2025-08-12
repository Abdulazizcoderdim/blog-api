import commentBlog from "@/controllers/v1/comment/comment_blog";
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
  body("content").trim().isEmpty().withMessage("Content is required"),
  validationError,
  commentBlog
);

export default router;
