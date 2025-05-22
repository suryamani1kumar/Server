import { Request, Response } from "express";
import { category } from "../../models/category.schema";

export const AddCategory = (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const categorys = new category(req.body);
    categorys.save();
    res.status(200).json({ message: "Internal server error", data: categorys });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
