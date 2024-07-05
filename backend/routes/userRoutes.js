const express = require('express');
const { auth, admin } = require('../middleware/authMiddleware');
const { loginUser, createUser, editUser, getUsers, getUser,signupUser,searchMember, searchUser, deleteUser } = require('../controller/userCntrl');

const userRoutes = express.Router();

userRoutes.post('/register', signupUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/create', auth, admin, createUser);
userRoutes.put('/edit/:userId', auth, admin, editUser);
userRoutes.get("/search",auth,searchUser);
userRoutes.get('/', auth, getUsers);
userRoutes.get('/:userId', auth, getUser);
userRoutes.delete("/:userId",deleteUser);

module.exports = userRoutes;
