import { Request, Response } from "express";
import { Blogs } from "../../models/blog.schema";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const {
      content,
      metaTitle,
      metaDescription,
      metaKeyword,
      pageUrl,
      heading,
      category,
      isActive,
      faqs,
      author,
      userid,
      smallDescription,
    } = req.body;

    // 🔹 1. Check if pageUrl already exists
    const existingBlog = await Blogs.findOne({ pageUrl });

    if (existingBlog) {
      res.status(409).json({
        message: "Page URL already exists. Please use a different URL.",
      });
      return;
    }

    const faq = faqs ? JSON.parse(faqs) : [];

    const createblog = new Blogs({
      content,
      metaTitle,
      metaDescription,
      metaKeyword,
      pageUrl,
      heading,
      category,
      isActive,
      faqs: faq,
      author,
      createdBy: userid,
      updatedBy: userid,
      smallDescription,
    });

    await createblog.save();

    res.status(200).json({ message: "Blog added", blog: createblog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
