import { logger } from "@/lib/winston";
import User from "@/models/user";
import type { Request, Response } from "express";

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    await User.deleteOne({ _id: userId });
    logger.info("A user account has been deleted", { userId });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error,
    });

    logger.error("Error while delete a user", error);
  }
};

export default deleteUser;
