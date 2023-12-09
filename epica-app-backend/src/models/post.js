import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    imageURL: { type: String },
    createdAt: { type: Date, default: Date.now },
  }, {
    timestamps: true,
    versionKey: false,
  });

export const PostModel = model('post', PostSchema);
