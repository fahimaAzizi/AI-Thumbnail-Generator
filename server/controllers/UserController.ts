import { Request, Response } from 'express';
import Thumbnail from '../modules/Thumbnail.js';

// Controllers to get All User Thumbnails
export const getUsersThumbnails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const thumbnails = await Thumbnail.find({ userId }).sort({ createdAt: -1 });
    
    return res.status(200).json({ thumbnails });
    
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Controllers to get single Thumbnail of a User
export const getThumbnailById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!id) {
      return res.status(400).json({ message: 'Thumbnail ID is required' });
    }

    const thumbnail = await Thumbnail.findOne({ userId, _id: id });

    if (!thumbnail) {
      return res.status(404).json({ message: 'Thumbnail not found' });
    }

    return res.status(200).json({ thumbnail });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};