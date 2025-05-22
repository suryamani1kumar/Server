import { Request, Response } from "express";
import { category } from "../../models/category.schema";

export const AddSubCategory = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const dats = await category.findOneAndUpdate({
      _id: req.params.id,
      subCategory: [req.body],
    });
    console.log("dats", dats);
    res.status(200).json({ message: "Internal server error", data: "dtata" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
