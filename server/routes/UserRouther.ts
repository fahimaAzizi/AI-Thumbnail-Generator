import express from 'express';
import { getThumbnailById, getUsersThumbnails } from '../controllers/UserController.ts';

const UserRouter = express.Router();

UserRouter.get('/thumbnails', getUsersThumbnails);
UserRouter.get('/thumbnail/:id', getThumbnailById);

export default UserRouter;