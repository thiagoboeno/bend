const router = require('express').Router();

// index
router.get('/', (req, res) => {
  res.send('Welcome to Homepage');
});

// routes
const userRoute = require('./users');
router.use('/users', userRoute);

const authRoute = require('./auth');
router.use('/auth', authRoute);

const postRoute = require('./posts');
router.use('/posts', postRoute);

const conversationRoute = require('./conversations');
router.use('/conversations', conversationRoute);

const messageRoute = require('./messages');
router.use('/messages', messageRoute);

module.exports = router;