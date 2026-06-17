import express from 'express';
import { generateThumbnail } from '../controllers/ThumbnailController.ts';

const ThumbnailRouter = express.Router();

ThumbnailRouter.post('/generate', generateThumbnail);

export default ThumbnailRouter;