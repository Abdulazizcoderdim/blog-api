import getCurrentUser from "@/controllers/v1/user/get_current_user";
import authorize from "@/lib/authorize";
import authenticate from "@/middleware/authenticate";
import { Router } from "express";

const router = Router();

router.get(
  "/current",
  authenticate,
  authorize(["admin", "user"]),
  getCurrentUser
);

export default router;
