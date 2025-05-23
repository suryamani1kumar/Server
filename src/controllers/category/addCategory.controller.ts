import { Request, Response } from "express";
import { category } from "../../models/category.schema";

export const AddCategory = async (req: Request, res: Response) => {
  try {
    const categoryData = new category(req.body);
    const savedData = await categoryData.save();
    res.status(200).json({ message: "Create category", data: savedData });
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error });
  }
};
