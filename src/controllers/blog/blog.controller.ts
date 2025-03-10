import { Request, Response } from "express";
import { Blogs } from "../../models/blog.schema";

export const getBlog = async (req: Request, res: Response) => {
  try {
    const pageurl = req.query.pageurl;
    const blog = await Blogs.findOne({ pageUrl: pageurl });
    if (!blog) {
      res.status(404).json({ message: "Blog is not exist" });
      return;
    }
    res.status(200).json({ message: "blog fetch", blog: blog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
