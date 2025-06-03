import { Response, Request } from "express";

export const trackingpixel = async (req: Request, res: Response) => {
    try {
        console.log(req.query)
        res.end()
    } catch (error) {
        res.status(500).json({ message: "Failed to tracking pixel", error });

    }
}