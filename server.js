const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const socketRoutes = require('./socketRoutes');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/trump');

const io = require('socket.io').listen(server);
io.sockets.on('connection', socketRoutes);

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/index.html'));
});

server.listen(port, () => {
  console.log('Running on port', port);
});
