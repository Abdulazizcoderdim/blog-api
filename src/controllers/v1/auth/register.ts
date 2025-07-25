import { logger } from "@/lib/winston";
import type { IUser } from "@/models/user";
import User from "@/models/user";
import { genUsername } from "@/utils";
import type { Request, Response } from "express";

type UserData = Pick<IUser, "email" | "password" | "role">;

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body as UserData;

  try {
    const username = genUsername();

    const newUser = await User.create({
      username,
      email,
      password,
      role,
    });

    res.status(201).json({
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: "ServerError",
      message: "Internal server error",
      error,
    });

    logger.error("Error during user registeration", error);
  }
};

export default register;
