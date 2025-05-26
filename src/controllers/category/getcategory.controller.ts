import { Request, Response } from "express";
import { category } from "../../models/category.schema";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const getAllcCategory = await category.find({}, { createdAt: 0, updatedAt: 0, __v: 0, description: 0, image: 0, userid: 0, });
    res.status(200).json({ message: "category data", data: getAllcCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getAllcCategory = await category.findOne({ _id: id });
    res.status(200).json({ message: "category data", data: getAllcCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
