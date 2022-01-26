const mongoose = require('mongoose');

exports.connect = () => {
    // mongo connection and events handler
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log('Connect to MongoDB!');
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
}