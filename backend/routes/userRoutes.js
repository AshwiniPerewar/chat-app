const express = require('express');
const { auth } = require('../middleware/authMiddleware');
const { loginUser, createUser, editUser, getUsers, getUser,signupUser,searchMember,  deleteUser } = require('../controller/userCntrl');

const userRoutes = express.Router();

userRoutes.post('/register', signupUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/create', auth, createUser);
userRoutes.put('/edit/:userId', auth, editUser);
userRoutes.get('/', auth, getUsers);
userRoutes.get('/:userId', auth, getUser);
userRoutes.delete("/:userId",deleteUser);

module.exports = userRoutes;
