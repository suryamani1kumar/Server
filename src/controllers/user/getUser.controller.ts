import { Request, Response } from 'express';
import { User } from '../../models/user.schema';

export const getUser = async (req: Request, res: Response) => {
    try {
        const page: number = parseInt(req.query.page as string) || 1;
        const limit: number = parseInt(req.query.limit as string) || 4;
        const user = await User.find(
            {},
            { name: 1, email: 1, isActive: 1, role: 1, username: 1, userid: 1 },
            {
                new: true,
            }
        )
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        if (!user) {
            res.status(404).json({ message: 'user is not exist' });
            return;
        }
        const totalCount: number = await User.countDocuments();
        res.status(200).json({
            message: 'User fetch All',
            page,
            limit,
            totalPages: Math.ceil(totalCount / limit),
            totalBlogs: totalCount,
            user: user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
