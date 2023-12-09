import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'post', required: true },
});

export const CommentModel = model('Comment', commentSchema);
