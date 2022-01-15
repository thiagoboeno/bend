const router = require('express').Router();
const Notification = require('../models/Notification');

router.get('/:userId', async (req, res) => {
  try {
    const userNotifications = await Post.find({ userId: req.params.userId });
    const notifications = userNotifications.sort((a,b) => b.createdAt - a.createdAt);

    return res.status(200).json(notifications);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const newNotification = new Notification(req.body);

  try {
    const savedNotification = await newNotification.save();

    return res.status(200).json(savedNotification);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/:notificationId/read', async (req, res) => {
  try {
    const notification = await NotificationfindById(req.params.id);

    if (!notification.readAt) await notification.updateOne({ read_at: new Date() });

    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;