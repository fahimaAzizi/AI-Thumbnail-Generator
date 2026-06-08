import { Request, Response } from 'express';
import Thumbnail from './models/Thumbnail.js';

// Controllers to get All User Thumbnails
export const getUsersThumbnails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const thumbnails = await Thumbnail.find({ userId }).sort({ createdAt: -1 });
    
    res.json({ thumbnails });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};