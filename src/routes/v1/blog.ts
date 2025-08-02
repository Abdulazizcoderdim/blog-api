import createBlog from "@/controllers/v1/blog/create_blog";
import authorize from "@/lib/authorize";
import authenticate from "@/middleware/authenticate";
import { Router } from "express";

const router = Router();

router.post("/", authenticate, authorize(["admin"]), createBlog);

export default router;
