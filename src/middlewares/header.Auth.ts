import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';

const authenticateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.headers['api-key'];
  if (apiKey !== config.API_HEADER_KEY) {
    res.status(403).json({ message: 'Invalid API Key' });
    return;
  }
  res.removeHeader('X-Powered-By');
  next();
};

export default authenticateApiKey;
