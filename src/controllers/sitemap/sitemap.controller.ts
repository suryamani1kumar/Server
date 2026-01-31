import { Request, Response } from "express";
import { Blogs } from "../../models/blog.schema";


export const getSitemapUrl = async (req: Request, res: Response) => {
  try {
    const Url = await Blogs.find({ isActive: true }).select("pageUrl");
   
    res.status(200).json({ message: "Sitemap fetch", blogUrl: Url });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
