import { Request, Response } from "express";
import { Blogs } from "../../models/blog.schema";

export const searchBlog = async (req: Request, res: Response) => {
  try {
    const text = req.query.text;
    const blog = await Blogs.find({ heading: text });
    if (!blog) {
      res.status(404).json({ message: "Blog is not exist" });
      return;
    }
    res.status(200).json({ message: "blog fetch", blog: blog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
