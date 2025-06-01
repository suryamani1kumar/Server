import { Request, Response } from 'express';
import { User } from '../../models/user.schema';

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userid = req.query.userid;
    const RequestData = req.body;
    const updatedUser = await User.findOneAndUpdate({ userid }, RequestData, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).json({ message: 'user not found' });
      return;
    }
    res.status(200).json({ message: 'user updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const userStatus = async (req: Request, res: Response) => {
  try {
    const userid = req.query.userid;
    const isActive = req.query.isActive;
    const statusUpdate = await User.findOneAndUpdate(
      { userid },
      { isActive },
      {
        new: true,
      }
    );

    if (!statusUpdate) {
      res.status(404).json({ message: 'user not found' });
      return;
    }
    res.status(200).json({ message: 'user updated', user: statusUpdate });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
