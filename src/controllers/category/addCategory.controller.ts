import { Request, Response } from "express";
import { category } from "../../models/category.schema";
import { config } from "../../config/config";

export const AddCategory = async (req: Request, res: Response) => {
  try {
    const file = req.files;
    const Images = (file as Array<Express.Multer.File>)?.map(
      (image: Express.Multer.File) =>
        `${config.SERVER_URL}/image/${image.filename}?w=200`
    );
    const categoryData = new category({ ...req.body, image: Images });
    const savedData = await categoryData.save();
    res.status(200).json({ message: "Create category", data: savedData });
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error });
  }
};
