const router = require('express').Router();
const Conversation = require('../models/Conversation');

router.post('/', async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.serderId, req.body.receiverId]
  });

  try {
    const savedConversation = await newConversation.save();
    
    return res.status(200).json(savedConversation);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    return res.status(200).json(conversation);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/find/:firstUserId/:secondUserId', async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });

    return res.status(200).json(conversation)
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;