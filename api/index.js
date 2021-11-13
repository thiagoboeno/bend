const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes/index');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

require('dotenv').config();

// mongo connection and events handler
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB!');
});

mongoose.connection.on('disconnected', () => {
  console.log('Desconnected to MongoDB!');
});

mongoose.connection.on('error', (error) => {
  console.log("Error connecting to MongoDB! Error: " + error);
});

// use dependencies and express json
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// api routes
app.use('/api', routes);

// websocket
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);

    io.emit('getUsers', users);
  });

  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);

    io.to(user.socketId).emit('getMessage', {
      senderId,
      text,
    });
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);

    io.emit('getUsers', users);
  });
});

// run server
server.listen(process.env.PORT || 8000, () => {
  console.log('Server is running!');
});