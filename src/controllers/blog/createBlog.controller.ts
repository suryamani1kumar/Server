import { Request, Response } from "express";
import saveJsonToFile from "../../services/saveJson";
import { Blogs } from "../../models/blog.schema";
import { config } from "../../config/config";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const file = req.files;
    const Images = (file as Array<Express.Multer.File>)?.map(
      (image: Express.Multer.File) =>
        `${config.SERVER_URL}/uploads/${image.filename}`
    );
    const { content,
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
      userid, } = req.body
    const faq = JSON.parse(faqs)
    // saveJsonToFile("blogData.json", {
    //   content,
    //   metaTitle,
    //   metaDescription,
    //   metaKeyword,
    //   pageUrl,
    //   heading,
    //   category,
    //   active,
    //   faqs: faq,
    //   images: Images,
    //   authorName,
    //   authorDescription,
    //   userid,
    // });
    const createblog = await new Blogs({
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
    });

    await createblog.save();

    res.status(200).json({ message: "blog Added", blog: createblog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
