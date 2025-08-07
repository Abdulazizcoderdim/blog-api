import { logger } from "@/lib/winston";
import type { IBlog } from "@/models/blog";
import Blog from "@/models/blog";
import User from "@/models/user";
import DOMPurify from "dompurify";
import type { Request, Response } from "express";
import { JSDOM } from "jsdom";

type BlogData = Partial<Pick<IBlog, "title" | "content" | "banner" | "status">>;

const window = new JSDOM("").window;
const purify = DOMPurify(window);

const updateBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, banner, status } = req.body as BlogData;

    const userId = req.userId;
    const blogId = req.params.blogId;

    const user = await User.findById(userId).select("role").lean().exec();
    const blog = await Blog.findById(blogId).select("-__v").exec();

    if (!blog) {
      res.status(404).json({
        code: "NotFound",
        message: "Blog not found",
      });
      return;
    }

    if (blog.author !== userId && user?.role !== "admin") {
      res.status(403).json({
        code: "AuthorizationError",
        message: "Access denied, insufficient permission",
      });

      logger.warn("A user tried to update a blog without permission", {
        userId,
        blog,
      });
      return;
    }

    if (title) blog.title = title;
    if (content) {
      const cleanContent = purify.sanitize(content);
      blog.content = cleanContent;
    }
    if (banner) blog.banner = banner;
    if (status) blog.status = status;

    await blog.save();
    logger.info("Blog update", { blog });

    res.status(200).json({
      blog,
    });
  } catch (error) {
    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error,
    });

    logger.error("Error while updating blog", error);
  }
};

export default updateBlog;
