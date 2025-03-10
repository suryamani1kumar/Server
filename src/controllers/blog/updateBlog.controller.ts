import { Request, Response } from "express";
import { Blogs } from "../../models/blog.schema";

export const updateBlog = async (req: Request, res: Response) => {
  const pageUrl = req.query.pageurl;
  const RequestData = req.body;
  const updatedBlog = await Blogs.findOneAndUpdate({ pageUrl }, RequestData, {
    new: true,
  });
  
  if (!updatedBlog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }
  res.status(200).json({ message: "blog updated", blog: RequestData });
};
