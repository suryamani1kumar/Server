import { Request, Response } from "express";
import saveJsonToFile from "../../services/saveJson";
import { Blogs } from "../../models/blog.schema";
import { config } from "../../config/config";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const file = req.files;
    const Images = (file as Array<Express.Multer.File>)?.map(
      (image: Express.Multer.File) =>
        `${config.SERVER_URL}/uploads/${image.filename}`
    );
    saveJsonToFile("blogData.json", { ...req.body, Images });
    const createblog = await new Blogs({ ...req.body, Images });

    await createblog.save();

    res.status(200).json({ message: "blog Added", blog: createblog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
