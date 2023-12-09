import { Router } from 'express';
import {ctrlCreatePost, ctrlGetAllPosts, ctrlGetPost, ctrlDeletePost} from '../controllers/post.controller.js';
import { createPostValidations , listPostValidations, deletePostValidations  } from '../models/validations/post-validations.js';

const postRouter = Router();

postRouter.post('/', createPostValidations, ctrlCreatePost);
postRouter.get('/', listPostValidations, ctrlGetAllPosts);
postRouter.get('/:postId', ctrlGetPost);
postRouter.delete('/:postId',  deletePostValidations , ctrlDeletePost);

export { postRouter };