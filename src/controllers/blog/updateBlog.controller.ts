import { Request, Response } from "express";
import { Blogs } from "../../models/blog.schema";
import { config } from "../../config/config";

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const UpdatepageUrl = req.query.pageurl;
    const file = req.files;
    const Images = (file as Array<Express.Multer.File>)?.map(
      (image: Express.Multer.File) =>
        `${config.SERVER_URL}/image/${image.filename}?w=200`
    );

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
    const faq = JSON.parse(faqs);
    const updatedBlog = await Blogs.findOneAndUpdate(
      { pageUrl: UpdatepageUrl },
      {
        content,
        metaTitle,
        metaDescription,
        metaKeyword,
        pageUrl,
        heading,
        category,
        active,
        faqs: faq,
        images: Images,
        authorName,
        authorDescription,
        userid,
      },
      {
        new: true,
      }
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

export const blogStatus = async (req: Request, res: Response) => {
  try {
    const pageUrl = req.query.pageurl;
    const active = req.query.active;
    const updatedBlog = await Blogs.findOneAndUpdate(
      { pageUrl },
      { active },
      {
        new: true,
      }
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
