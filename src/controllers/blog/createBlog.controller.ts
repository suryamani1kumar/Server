import { Request, Response } from "express";
import saveJsonToFile from "../../services/saveJson";
import { Blogs } from "../../models/blog.schema";

export const createBlog = async (req: Request, res: Response) => {
  saveJsonToFile("blogData.json", req.body);
  const createblog = await new Blogs(req.body);

  await createblog.save();

  res.status(200).json({ message: "blog Added", blog: createblog });
};
