import { logger } from "@/lib/winston";
import type { Request, Response } from "express";

const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (error) {
    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error,
    });

    logger.error("Error while getting all users", error);
  }
};

export default getAllUser;
