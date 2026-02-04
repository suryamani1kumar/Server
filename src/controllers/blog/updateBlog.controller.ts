import { Request, Response } from "express";
import { Blogs } from "../../models/blog.schema";

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { pageurl } = req.query;

    if (!pageurl || typeof pageurl !== "string") {
      res.status(400).json({ message: "pageurl is required" });
      return;
    }

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
      images,
    } = req.body;

    const normalizedNewPageUrl =
      pageUrl && typeof pageUrl === "string"
        ? pageUrl.toLowerCase().trim().replace(/\s+/g, "-")
        : undefined;

    if (normalizedNewPageUrl && normalizedNewPageUrl !== pageurl) {
      const existingBlog = await Blogs.findOne({
        pageUrl: normalizedNewPageUrl,
      });

      if (existingBlog) {
        res.status(409).json({
          message: "Page URL already exists. Please choose another one.",
        });
        return;
      }
    }

    let parsedFaqs: any[] = [];
    if (faqs) {
      try {
        parsedFaqs = typeof faqs === "string" ? JSON.parse(faqs) : faqs;
      } catch {
        res.status(400).json({ message: "Invalid FAQs format" });
        return;
      }
    }

    const updatedBlog = await Blogs.findOneAndUpdate(
      { pageUrl: pageurl },
      {
        $set: {
          content,
          metaTitle,
          metaDescription,
          metaKeyword,
          ...(normalizedNewPageUrl && { pageUrl: normalizedNewPageUrl }),
          heading,
          category,
          isActive,
          images,
          smallDescription,
          faqs: parsedFaqs,
          author,
          updatedBy: userid,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const blogStatus = async (req: Request, res: Response) => {
  try {
    const pageUrl = req.query.pageurl;
    const isActive = req.query.isActive;
    const updatedBlog = await Blogs.findOneAndUpdate(
      { pageUrl },
      { isActive },
      {
        new: true,
      },
    );

    if (!updatedBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.status(200).json({ message: "blog updated", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
