const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt =require("bcrypt");
const convert = require('../utils/convertName');
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '30d' });
};


// sign up by username,password
const signupUser = async (req, res) => {
  try{
  const { username,password } = req.body;
  const user = await User.findOne({ username :{$regex:username,$options:"i"}});
if(user)
return res.status(401).json({message:"User Already Exists"});
  const newUser=new User({username,password:await bcrypt.hash(password,10) });
  await newUser.save();
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
  const user = await User.findOne({ username : { $regex: username, $options: 'i' }});
  if (user) {
    const match=await bcrypt.compare(password,user.password)
    if(match)
    {
    let userData={_id:user._id,
      username:user.username,}
    return res.status(200).json({message:"Logged In successfully",token: generateToken(user._id),userData
    });
  }
  return res.status(401).json({ message: 'Invalid username or password' });
  } else {
    return res.status(401).json({ message: 'User Not Found' });
  }
}
catch(err)
{
  res.status(400).json(err)
}
};

// creating new user
const createUser = async (req, res) => {
  const { username, password } = req.body;
  try{
  const userExists = await User.findOne({ username:convert(username) });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  } else {
    
    const user = await User.create({
      username,
      password,
    });

    if (user) {
      res.status(201).json({
       message:"User Created Successfully"
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data' });
    }
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
    const searchQuery = req.query.q;
  const users = await User.find({username:{$regex :searchQuery, $options: 'i'}}).select("-password");
  res.status(200).json({message :"Users fetched successfully",users});
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
  res.status(200).json({message:"User Data fetched successully",user});
}
catch(err)
{
  res.status(400).json(err)
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

module.exports = {signupUser, loginUser, createUser,  getUser, getUsers,deleteUser };
