import authRoutes from "@/routes/v1/auth";
import blogRoutes from "@/routes/v1/blog";
import commentRoutes from "@/routes/v1/comment";
import likeRoutes from "@/routes/v1/like";
import userRoutes from "@/routes/v1/user";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "API is live",
    status: "ok",
    version: "1.0.0",
    docs: "https://docs.blogpostpro.uz",
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/likes", likeRoutes);
router.use("/comments", commentRoutes);

export default router;
