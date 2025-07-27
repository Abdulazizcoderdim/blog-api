import authorize from "@/lib/authorize";
import authenticate from "@/middleware/authenticate";
import { Router } from "express";

const router = Router();

router.get("/current", authenticate, authorize(["admin", "user"]));

export default router;
