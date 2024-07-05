const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
require("./config/dbConnect")
const app = express();
app.use(bodyParser.json());
app.use(cors());
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { auth } = require('./middleware/authMiddleware');

app.use('/users', userRoutes);
app.use('/groups',auth, groupRoutes);
app.use('/messages', messageRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
