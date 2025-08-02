import { logger } from "@/lib/winston";
import type { IBlog } from "@/models/blog";
import Blog from "@/models/blog";
import DOMPurify from "dompurify";
import type { Request, Response } from "express";
import { JSDOM } from "jsdom";

type BlogData = Pick<IBlog, "title" | "content" | "banner" | "status">;

const window = new JSDOM("").window;
const purify = DOMPurify(window);

const createBlog = async (res: Response, req: Request) => {
  try {
    const { title, content, banner, status } = req.body as BlogData;
    const userId = req.userId;

    const cleanContent = purify.sanitize(content);

    const newBlog = await Blog.create({
      title,
      content: cleanContent,
      banner,
      status,
      author: userId,
    });

    logger.info("New blog created", newBlog);

    res.status(201).json({
      blog: newBlog,
    });
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
