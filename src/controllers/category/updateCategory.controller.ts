import { Request, Response } from "express";
import { category } from "../../models/category.schema";

export const ActiveCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getAllCategory = await category.findOne({ _id: id },{});
    res.status(200).json({ message: "category data", data: getAllCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};