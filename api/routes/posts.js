const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  
  try {
    const savedPost = await newPost.save();
    
    return res.status(200).json(savedPost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });

      return res.status(200).json('Your post has been updated');
    } else {
      return res.status(403).json('You can update only your post');
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (post.userId === req.body.userId) {
      await post.deleteOne();

      return res.status(200).json('Your post has been deleted');
    } else {
      return res.status(403).json('You can delete only your post');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });

      return res.status(200).json('The post has been liked');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });

      return res.status(200).json('The post has been disliked');
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    const timeline = userPosts.concat(...friendPosts).sort((a,b) => b.updatedAt - a.updatedAt);

    return res.json(timeline);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/profile/:username', async (req, res) => {
  try {
    const currentUser = await User.findOne({ username: req.params.username });
    const userPosts = await Post.find({ userId: currentUser._id });

    const profilePosts = userPosts.sort((a,b) => b.updatedAt - a.updatedAt);

    return res.json(profilePosts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;