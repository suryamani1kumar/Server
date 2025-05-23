import { Request, Response } from "express";
import { category } from "../../models/category.schema";

export const AddSubCategory = async (req: Request, res: Response) => {
  try {
    const { subcategory } = req.body;
    const { id } = req.params;
    
    const subCategory = await category.findByIdAndUpdate(
      id,
      { $push: { subCategory: { $each: subcategory } } },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Create subCategory", data: subCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
