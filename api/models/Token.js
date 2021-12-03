const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    img: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,
    },
  },
);

module.exports = mongoose.model('Token', TokenSchema);