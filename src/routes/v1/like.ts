import likeBlog from "@/controllers/v1/like/like_blog";
import unlikeBlog from "@/controllers/v1/like/unlike_blog";
import authorize from "@/lib/authorize";
import authenticate from "@/middleware/authenticate";
import validationError from "@/middleware/validationError";
import { Router } from "express";
import { body } from "express-validator";

const router = Router();

router.post(
  "/blog/:blogId",
  authenticate,
  authorize(["admin", "user"]),
  body("userId")
    .notEmpty()
    .withMessage("User id is required")
    .isMongoId()
    .withMessage("Invalid user ID"),
  validationError,
  likeBlog
);

router.delete(
  "/blog/:blogId",
  authenticate,
  authorize(["admin", "user"]),
  body("userId")
    .notEmpty()
    .withMessage("User id is required")
    .isMongoId()
    .withMessage("Invalid user ID"),
  validationError,
  unlikeBlog
);

export default router;
