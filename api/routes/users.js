const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

const ObjectId = require('mongoose').Types.ObjectId;

router.get('/:id', async (req, res) => {
  try {
    let user = null;

    if (ObjectId.isValid(req.params.id)) {
      user = await User.findById(req.params.id);
    } else {
      user = await User.findOne({ username: req.params.id });
    }

    const { password, updatedAt, ...other } = user._doc;

    return res.status(200).json(other);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      } 
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      return res.status(200).json('Account has been updated');
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json('You can update only your account!');
  }
});

router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const currentUser = await User.findById(req.params.id);

      const users = await User.find({ $or: [{ 'followers': currentUser.id }, { 'followings': currentUser.id }] });
      users.forEach(async user => {
        await user.updateOne({ $pull: { followers: currentUser.id } });
        await user.updateOne({ $pull: { followings: currentUser.id } });
      });

      const posts = await Post.find({
        likes: { $in: [currentUser.id] },
      });
      posts.forEach(async post => {
        await post.updateOne({ $pull: { likes: currentUser.id } });
      });

      await Post.deleteMany({ userId: currentUser.id });
      await User.findByIdAndDelete(currentUser._id);

      return res.status(200).json('Account has been deleted');
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json('You can delete only your account!');
  }
});

router.get('/friends/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];

    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });

        return res.status(200).json('User has been followed');
      } else {
        return res.status(403).json('You already follow this user');
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json('You can\'t follow yourself!');
  }
});

router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });

        return res.status(200).json('User has been unfollowed');
      } else {
        return res.status(403).json('You already unfollow this user');
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json('You can\'t unfollow yourself!');
  }
});

module.exports = router;