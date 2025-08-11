import { logger } from "@/lib/winston";
import Blog from "@/models/blog";
import User from "@/models/user";
import { v2 as cloudinary } from "cloudinary";
import type { Request, Response } from "express";

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const blogs = await Blog.find({ author: userId })
      .select("banner.publicId")
      .lean()
      .exec();
    const publicIds = blogs.map(({ banner }) => banner.publicId);
    await cloudinary.api.delete_resources(publicIds);

    logger.info("Multiple blog banners deleted from Coudinary", {
      publicIds,
    });

    await Blog.deleteMany({ author: userId });
    logger.info("Multiple blogs deleted", {
      userId,
      blogs,
    });

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
