const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      max: 500,
      required: true,
    },
    read_at: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);