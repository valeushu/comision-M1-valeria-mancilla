
import { CommentModel } from '../models/comment.js';
import { isAuthor } from './post.controller.js';
import { PostModel } from '../models/post.js';


  export const ctrlGetAllComments = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    // const isPostAuthor = await isAuthor({ postId, userId });
    // if (!isPostAuthor) {
    //   return res.status(403).json({ error: 'User is not the post author' });
    // }
    try {
      const post = await PostModel.findById(postId)
      .populate({
        path: 'author',
        select: '_id username avatar',
      })
      .select('-__v');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Now, let's separately populate the comments
    const populatedPost = await CommentModel.populate(post, {
      path: 'comments',
      select: '-__v',
      populate: {
        path: 'author',
        select: '_id username avatar',
      },
    });

    res.status(200).json(populatedPost);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Couldn't get comments" });
    }
  };

export const ctrlCreateComment = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;
  const { author, description } = req.body;
  try {
    const comment = new CommentModel({
      // author,
      description,
      post: postId,
      author: userId,
    });

    await comment.save();
    
    await PostModel.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: comment._id } }
    );

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't create comment" });
  }
};

export const ctrlEditComment = async (req, res) => {
  const { commentId, postId } = req.params;
  const userId = req.user._id;
  try {
    const comment = await CommentModel.findOne({ _id: commentId });
    if (!comment) {
      return res.status(404).json({ error: "Comment doesn't exist" });
    }
    comment.set(req.body);
    await comment.save();
    res.status(200).json({message: "comment edit", comment});
  } catch (error) {
    res.status(500).json({ error: "Couldn't update comment" });
  }
};

export const ctrlDeleteComment = async (req, res) => {
    const { commentId, postId } = req.params;
    const userId = req.user._id;
  
    try {
      await CommentModel.findOneAndDelete({ _id: commentId, post: postId });
  
      await PostModel.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: commentId } }
      );
  
      res.status(200).json({message: "succefully"});
    } catch (error) {
      res.status(500).json({ error: "Couldn't delete comment" });
    }
  };
  
