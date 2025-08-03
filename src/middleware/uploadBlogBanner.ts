import type { NextFunction, Request, Response } from "express";
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 mb

const uploadBlogBanner = (method: "post" | "put") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (method === "post" && !req.file) {
      next();
      return;
    }

    if (!req.file) {
      res.status(400).json({
        code: "ValidationError",
        message: "Blog Banner is required",
      });
      return;
    }

    if (req.file.size > MAX_FILE_SIZE) {
      res.status(413).json({
        code: "ValidationError",
        message: "File Size must be less than 2 mb",
      });
      return;
    }

    try {
    } catch (error) {}
  };
};

export default uploadBlogBanner;
