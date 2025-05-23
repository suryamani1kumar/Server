import { Request, Response } from "express";
import { category } from "../../models/category.schema";

export const AddSubCategory = async (req: Request, res: Response) => {
  try {
    const { subcategory, active } = req.body;
    const { id } = req.params;
    
    // if (!active) {
    //   return res.status(200).json({ message: "Category is not Active" });
    // }

    const subCategory = await category.findByIdAndUpdate(
      { _id: id },
      { $push: { subCategory: { $each: subcategory } } },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Create subCategory", data: subCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
