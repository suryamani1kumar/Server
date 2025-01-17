import { Request, Response, NextFunction } from "express";

const authenticateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.headers["api-header-key"];
  if (apiKey !== process.env.API_HEADER_KEY) {
    res.status(403).json({ message: "Invalid API Key" });
    return;
  }
  res.removeHeader("X-Powered-By");
  next();
};

export default authenticateApiKey;
