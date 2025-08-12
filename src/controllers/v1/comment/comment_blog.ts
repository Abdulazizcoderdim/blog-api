import { logger } from "@/lib/winston";
import Blog from "@/models/blog";
import type { IComment } from "@/models/comment";
import DOMPurfiy from "dompurify";
import type { Request, Response } from "express";
import { JSDOM } from "jsdom";

type CommentData = Pick<IComment, "content">;

const window = new JSDOM("").window;
const purify = DOMPurfiy(window);

const commentBlog = async (req: Request, res: Response): Promise<void> => {
  const { content } = req.body as CommentData;
  const { blogId } = req.params;
  const userId = req.userId;

  try {
    const blog = await Blog.findById(blogId).select("_id commentsCount").exec();

    if (!blog) {
      res.status(404).json({
        code: "NotFound",
        message: "Blog not found",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error,
    });

    logger.error("Error while liking blog", error);
  }
};

export default commentBlog;
