import { Request, Response } from "express";
import { IUserDocument, User } from "../../models/user.schema";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/token";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { password, userIdOrmail } = req.body;

    if (!userIdOrmail || !password) {
      res.status(400).json({
        message: "Email/Username and Password are required",
      });
      return;
    }

    const query = {
      isActive: true,
      $or: [{ username: userIdOrmail }, { email: userIdOrmail }],
    };

    const findUser = (await User.findOne(query)) as IUserDocument | null;

    if (!findUser) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }

    const isPasswordMatch = await findUser.comparePassword(password);

    if (!isPasswordMatch) {
      res.status(400).json({ message: "Password does not match" });
      return;
    }

    // Update last login time
    await User.findByIdAndUpdate(findUser._id, {
      $set: { lastLogin: new Date() },
    });

    const accessToken = generateAccessToken({
      name: findUser.name,
      username: findUser.username,
      email: findUser.email,
      userId: findUser._id.toString(),
      role: findUser.role,
    });

    const refreshToken = generateRefreshToken({
      userId: findUser._id.toString(),
    });

    let cookieOptions: any = {
      httpOnly: true,
      path: "/",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    };

    if (req.hostname === "localhost") {
      cookieOptions.secure = false;
      cookieOptions.sameSite = "lax";
    } else {
      cookieOptions.secure = true;
      cookieOptions.sameSite = "none";
      cookieOptions.domain = ".tourmingle.com";
    }

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: findUser._id,
        name: findUser.name,
        username: findUser.username,
        email: findUser.email,
        role: findUser.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const authVerify = (req: AuthRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  res.status(200).json({
    message: "User is authenticated",
    user: {
      ...req.user,
    },
  });
};
