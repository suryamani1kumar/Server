import { Request, Response } from "express";
import { Blogs } from "../../models/blog.schema";

export const allBlog = async (req: Request, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 4;
    const blog = await Blogs.find(
      {},
      { pageUrl: 1, heading: 1, category: 1, status: 1 }
    )
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    if (!blog) {
      res.status(404).json({ message: "Blog is not exist" });
      return;
    }
    const totalCount: number = await Blogs.countDocuments();
    res.status(200).json({
      message: "blog fetch All",
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      totalBlogs: totalCount,
      blog: blog,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
