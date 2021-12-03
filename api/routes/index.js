const router = require('express').Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

// index
router.get('/', (req, res) => {
  res.send('Welcome to Homepage');
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images/post');
  },
   
  filename: (req, file, callback) => {
    callback(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('postImage'), (req, res) => {
  try {
    return res.status(200).json(req.file.filename);
  } catch (error) {
    return res.status(500).json(error);
  }
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

const resetPasswordRoute = require('./resetPassword');
router.use('/reset-password', resetPasswordRoute);

module.exports = router;