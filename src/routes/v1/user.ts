import getCurrentUser from "@/controllers/v1/user/get_current_user";
import updateCurrentUser from "@/controllers/v1/user/update_current_user";
import authorize from "@/lib/authorize";
import authenticate from "@/middleware/authenticate";
import validationError from "@/middleware/validationError";
import User from "@/models/user";
import { Router } from "express";
import { body } from "express-validator";

const router = Router();

router.get(
  "/current",
  authenticate,
  authorize(["admin", "user"]),
  getCurrentUser
);

router.put(
  "/current",
  authenticate,
  authorize(["admin", "user"]),
  body("username")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .custom(async (value) => {
      const userExists = await User.exists({ username: value });

      if (userExists) {
        throw Error("This username is already in use");
      }
    }),
  validationError,
  updateCurrentUser
);

export default router;
