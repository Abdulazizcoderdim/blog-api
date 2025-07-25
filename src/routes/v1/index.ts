import authRoutes from "@/routes/v1/auth";
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

export default router;
