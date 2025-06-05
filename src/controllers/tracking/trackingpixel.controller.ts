import { Response, Request } from "express";
import { tracking } from "../../models/track.schema";

export const trackingpixel = async (req: Request, res: Response) => {
  try {
    const track = new tracking(req.body);
    await track.save();

    res.end();
  } catch (error) {
    res.status(500).json({ message: "Failed to tracking pixel", error });
  }
};
