import { Request, Response } from 'express'
import Thumbnail from '../modules/Thumbnail.js';


export const generateThumbnail = async (
  req: Request,
  res: Response
) => {

  try {

    const { userId } = req.session;

    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay
    } = req.body;

    const thumbnail = await Thumbnail.create({

      userId,

      title,

      prompt_used: user_prompt,

      user_prompt,

      style,

      aspect_ratio,

      color_scheme,

      text_overlay,

      isGenerating: true

    });

    res.status(201).json({
      success: true,
      thumbnail
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to generate thumbnail'
    });

  }

}