import { PostModel } from '../models/post.js';
import { CommentModel } from '../models/comment.js';

  export const ctrlCreatePost = async (req, res) => {
    console.log(req.user)
    const userId = req.user._id;
    try {
      const { title, description, imageURL} = req.body;
      const post = new PostModel({
        title,
        description,
        imageURL,
        author: userId,
      });
      await post.save();
      return res.status(201).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  export const ctrlGetAllPosts = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const posts = await PostModel.find({ author: userId })
        .populate('author', ['username', 'avatar'])
        .populate('comments', ['comment']);
  
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  export const ctrlGetPost = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;
  
    try {
      const post = await PostModel.findOne({
        _id: postId,
        author: userId,
      })
        .populate('author', ['username', 'avatar'])
        //.populate('comments', ['description']);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

export const ctrlDeletePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await CommentModel.deleteMany({ _id: { $in: post.comment } });

    await PostModel.findOneAndDelete({
      _id: postId,
      author: userId,
    });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const isAuthor = async ({ postId, userId }) => {
  try {
    const post = await PostModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};


