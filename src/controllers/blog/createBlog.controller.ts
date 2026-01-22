import { Request, Response } from "express";
import { Blogs } from "../../models/blog.schema";
import { config } from "../../config/config";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const file = req.files;
    const Images = (file as Array<Express.Multer.File>)?.map(
      (image: Express.Multer.File) =>
        `${config.SERVER_URL}/image/${image.filename}?w=200`,
    );
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
    } = req.body;
    const faq = JSON.parse(faqs);

    const createblog = await new Blogs({
      content,
      metaTitle,
      metaDescription,
      metaKeyword,
      pageUrl,
      heading,
      category,
      isActive,
      faqs: faq,
      images: Images,
      author,
      createdBy: userid,
    });

    await createblog.save();

    res.status(200).json({ message: "blog Added", blog: createblog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
