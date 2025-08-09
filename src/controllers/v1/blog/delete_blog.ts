import { Request, Response } from "express";
import Blog from "@/models/blog";
import { v2 as cloudinary } from "cloudinary";
import User from "@/models/user";
import { logger } from "@/lib/winston";

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.userId;

    const user = await User.findById(userId).select("role").lean().exec();
    const blog = await Blog.findById(blogId)
      .select("author banner.publicId")
      .lean()
      .exec();

    if (!blog) {
      return res
        .status(404)
        .json({ code: "NotFound", message: "Blog not found" });
    }

    if (blog.author !== userId && user?.role !== "admin") {
      res.status(403).json({
        code: "AuthorizationError",
        message: "Access denied, insufficient permission",
      });

      logger.warn(
        `User ${userId} attempted to delete blog ${blogId} but does not have permission`
      );

      return;
    }

    await cloudinary.uploader.destroy(blog.banner.publicId);
    logger.info(`Banner ${blog.banner.publicId} deleted from Cloudinary`);

    await Blog.findByIdAndDelete(blogId);
    logger.info(`Blog ${blogId} deleted from database`);

    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ code: "InternalServerError", message: "Internal server error" });

    logger.error("Error during blog deletion", error);
  }
};

export default deleteBlog;
