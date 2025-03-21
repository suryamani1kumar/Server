import { Request, Response } from "express";
import { Blogs } from "../../models/blog.schema";

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const pageurl = req.query.pageurl;
    const blog = await Blogs.findOneAndDelete({ pageUrl: pageurl });
    if (!blog) {
      res.status(404).json({ message: "Blog is not exist" });
      return;
    }
    res.status(200).json({ message: "Blog is deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
