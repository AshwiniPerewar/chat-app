const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt =require("bcrypt")
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '30d' });
};


// sign up by username,password
const signupUser = async (req, res) => {
  try{
  const { username,password } = req.body;
  const user = await User.findOne({ username});
if(user)
res.status(401).json({message:"User Already Exists"});
  const newUser=new User({username,password:hashedPassword });
  const response=await newUser.save();
res.status(201).json({message:"User Created Successfully"});
  }
catch(err)
{
  res.status(400).json(err)
}
};


// login user with username and password
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try{
  const user = await User.findOne({ username });
  if (user && user.password==password) {
    let userData={_id:user._id,
      username:user.username,
    isAdmin:user.isAdmin}
    res.status(200).json({message:"Logged In successfully",token: generateToken(user._id),userData
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
}
catch(err)
{
  res.status(400).json(err)
}
};

// creating new user
const createUser = async (req, res) => {
  const { username, password, isAdmin } = req.body;
  try{
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
  } else {
    
    const user = await User.create({
      username,
      password,
      isAdmin,
    });

    if (user) {
      res.status(201).json({
       message:"User Created Successfully"
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  }
}
catch(err)
{
  res.status(400).json(err)
}
};

// updating user by userId
const editUser = async (req, res) => {
  try{
  const user = await User.findById(req.params.userId);
  if (user) {
    user.username = req.body.username || user.username;
    user.password = req.body.password || user.password;
    user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

    const updatedUser = await user.save();
    res.status(200).json({
     message:"User Details Updated Successfully"
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}
catch(err)
{
  res.status(400).json(err)
}
};

// fetching all users
const getUsers = async (req, res) => {
  try{
  const users = await User.find({});
  res.status(200).json(users);
}
catch(err)
{
  res.status(400).json(err)
}
};


// fetching user deatils
const getUser = async (req, res) => {
  try{
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
}
catch(err)
{
  res.status(400).json(err)
}
};

// Search users
const searchUser=async (req, res) => {
  try {
      const searchQuery = req.query.q;
      const users = await User.find({
          username: { $regex: searchQuery, $options: 'i' }
      }).select('-password');

      res.status(200).json(users);
  } catch (err) {
      res.status(500).send('Server error');
  }
};

// delete user by userId 
const deleteUser=async(req,res)=>{
  try {
    const userDeleted=await User.findByIdAndDelete(req.params.userId);
    res.status(200).json(userDeleted)
  } catch (error) {
    res.status(500).send(error);

  }
}

module.exports = {signupUser, loginUser, createUser, editUser, searchUser,getUser, getUsers,deleteUser };
