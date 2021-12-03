const router = require('express').Router();
const Token = require('../models/Token');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send('User with given email doesn\'t exist');

    let token = await Token.findOne({ userId: user._id });

    if (!token) {
      const hashedToken = crypto.randomBytes(32).toString('hex');

      const newToken = await new Token({
        userId: user._id,
        token: hashedToken,
      });

      token = await newToken.save();
    }

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, 'Password reset', link);

    return res.status(200).json('Password reset link sent to your email account');
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post('/:userId/:token', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(403).send('Invalid link or expired');

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(403).send('Invalid link or expired');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    await user.save();
    await token.delete();

    return res.status(200).json('Password reset sucessfully');
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;