import { logger } from "@/lib/winston";
import DOMPurify from "dompurify";
import type { Request, Response } from "express";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

const createBlog = async (res: Response, req: Request) => {
  try {
  } catch (error) {
    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error,
    });

    logger.error("Error during blog creation", error);
  }
};

export default createBlog;
