import userRoutes from "./user.routes";
import blogRoutes from "./blog.routes";
import categoryRoutes from "./category.routes";
import trackingRoutes from "./trackingpixel.routes";
import Author from "./author.routes";
import Sitemap from "./sitemap.routes";
import uploadImage from "./uploadFile.routes";

export const protectedRoutes = [
  userRoutes,
  categoryRoutes,
  blogRoutes,
  trackingRoutes,
  Author,
  Sitemap,
  uploadImage,
];
