import { Request, Response } from "express";
import { Blogs } from "../../models/blog.schema";
import { config } from "../../config/config";

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { pageurl } = req.query;

    if (!pageurl || typeof pageurl !== "string") {
      res.status(400).json({ message: "pageurl is required" });
      return;
    }

    /* ---------- Files (Images) ---------- */
    const files = req.files as Express.Multer.File[] | undefined;

    const images =
      files?.map(
        (file) => `${config.SERVER_URL}/image/${file.filename}?w=200`,
      ) || [];

    /* ---------- Body ---------- */
    const {
      content,
      metaTitle,
      metaDescription,
      metaKeyword,
      pageUrl,
      heading,
      category,
      active,
      faqs,
      authorName,
      authorDescription,
      userid,
    } = req.body;

    /* ---------- Safe FAQ Parsing ---------- */
    let parsedFaqs: any[] = [];
    if (faqs) {
      try {
        parsedFaqs = typeof faqs === "string" ? JSON.parse(faqs) : faqs;
      } catch {
        res.status(400).json({ message: "Invalid FAQs format" });
        return;
      }
    }

    /* ---------- Update ---------- */
    const updatedBlog = await Blogs.findOneAndUpdate(
      { pageUrl: pageurl },
      {
        $set: {
          content,
          metaTitle,
          metaDescription,
          metaKeyword,
          pageUrl,
          heading,
          category,
          active,
          faqs: parsedFaqs,
          ...(images.length > 0 && { images }),
          authorName,
          authorDescription,
          userid,
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

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
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
    const active = req.query.active;
    const updatedBlog = await Blogs.findOneAndUpdate(
      { pageUrl },
      { active },
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
