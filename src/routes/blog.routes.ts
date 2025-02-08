import { Router } from 'express';
import { createBlog } from '../controllers/blog.controller';

const router = Router();

router.post('/addBlog', createBlog);

export default router;
