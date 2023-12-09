import { Router } from 'express';
import {ctrlCreateComment, ctrlGetAllComments, ctrlEditComment, ctrlDeleteComment} from '../controllers/comment.controller.js';
import {updateCommentValidations, createCommentValidations, listcommentValidations, deleteCommentValidations} from '../models/validations/comment-validations.js';

const commentRouter = Router();

commentRouter.post('/:postId', createCommentValidations, ctrlCreateComment);
commentRouter.get('/:postId', listcommentValidations, ctrlGetAllComments);
// commentRouter.patch('/:commentId', ctrlEditComment);
commentRouter.patch('/:commentId', updateCommentValidations, ctrlEditComment);
commentRouter.delete('/:postId/:commentId', deleteCommentValidations, ctrlDeleteComment);


export { commentRouter };