import { Request, Response } from "express";
import { User } from "../../models/user.schema";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userid } = req.query;
    const requestData = req.body;

    if (!userid) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userid },
      { $set: requestData },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const userStatus = async (req: Request, res: Response) => {
  try {
    const userid = req.query.userid;
    const isActive = req.query.isActive;
    const statusUpdate = await User.findOneAndUpdate(
      { _id: userid },
      { isActive },
      {
        new: true,
      },
    );

    if (!statusUpdate) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.status(200).json({ message: "user updated", user: statusUpdate });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
