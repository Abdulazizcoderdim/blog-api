import likeBlog from "@/controllers/v1/like/like_blog";
import authorize from "@/lib/authorize";
import authenticate from "@/middleware/authenticate";
import { Router } from "express";

const router = Router();

router.post(
  "/blog/:blogId",
  authenticate,
  authorize(["admin", "user"]),
  likeBlog
);

export default router;
