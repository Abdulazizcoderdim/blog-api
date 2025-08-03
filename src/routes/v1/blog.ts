import createBlog from "@/controllers/v1/blog/create_blog";
import authorize from "@/lib/authorize";
import authenticate from "@/middleware/authenticate";
import uploadBlogBanner from "@/middleware/uploadBlogBanner";
import { Router } from "express";
import multer from "multer";

const upload = multer();

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  upload.single("banner_image"),
  uploadBlogBanner("post"),
  createBlog
);

export default router;
