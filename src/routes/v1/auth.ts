import register from "@/controllers/v1/auth/register";
import { Router } from "express";

const router = Router();

router.post("/register", register);

export default router;
