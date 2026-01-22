import { Request, Response } from "express";

import { User } from "../../models/user.schema";

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const RequestData = req.body;
    // find user before create user
    const findUser = await User.findOne({
      email: req.body.email.trim().toLowerCase(),
    });

    if (findUser) {
      res.status(302).json({ message: "User exists, please log in" });
      return;
    }

    // create user
    const userData = await new User({ ...RequestData });
    await userData.save();

    res.status(200).json({ message: "User registered ", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const blog = await User.findOneAndDelete({ _id: id });
    if (!blog) {
      res.status(404).json({ message: "User is not exist" });
      return;
    }
    res.status(200).json({ message: "User is deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const HandlePassword = async (req: Request, res: Response) => {
  try {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword) {
      res.status(400).json({
        success: false,
        message: "User ID and new password are required",
      });
      return;
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User password updated successfully",
    });
  } catch (error) {
    console.error("Admin change user password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
