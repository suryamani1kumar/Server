import userRoutes from "./user.routes";
import blogRoutes from "./blog.routes";
import Image from "./image.routes";
import categoryRoutes from "./category.routes";
import trackingRoutes from "./trackingpixel.routes";

export const protectedRoutes = [
  userRoutes,
  categoryRoutes,
  blogRoutes,
  Image,
  trackingRoutes,
];
export const publicRoutes = [];
