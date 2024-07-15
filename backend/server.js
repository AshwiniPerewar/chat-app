const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
require("./config/dbConnect")
const app = express();
app.use(bodyParser.json());
app.use(cors(
    {
        "origin":"*",
    }
));

// connecting with frontend for deployment
const path=require("path");
const _dirname=path.dirname("");
const buildpath=path.join(_dirname,"../frontend/build");
app.use(express.static(buildpath));

const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { auth } = require('./middleware/authMiddleware');


// const http = require('http');
// const socketIo = require('socket.io');
// const server = http.createServer(app);
// const io = socketIo(server);

// Middleware to attach io instance to req
// app.use((req, res, next) => {
//     req.io = io;
//     next();
//   });

// io.on('connection', (socket) => {
//     console.log('a user connected');
  
//     socket.on('joinGroup', (groupId) => {
//       socket.join(groupId);
//       console.log(`User joined group: ${groupId}`);
//     });
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });
  

app.use('/users', userRoutes);
app.use('/groups',auth, groupRoutes);
app.use('/messages', messageRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
