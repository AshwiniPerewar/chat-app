const Group = require('../models/Group');
const User = require('../models/User');
const mongoose=require("mongoose")
// create new group
const createGroup = async (req, res) => {
  const { groupName,admin,members} = req.body;
  try{
    const findGroup=await Group.findOne({name:groupName});
    if(findGroup)
    res.status(400).send({message:"Group already exists"});
 else{ 
  if(!members.includes(req.user._id))
  members.push(req.user._id);
  const group = new Group({ name:groupName,admin,members});
  const re=await group.save();
  console.log(re)
  res.status(201).json({message:"Group Created successfully",group});
 }
}
catch(err)
{
  res.status(400).json(err)
}
};

// rename  group name
const renameGroupName = async (req, res) => {
  const { groupName,groupId} = req.body;
  try{
  const group =await Group.findByIdAndUpdate(groupId,{ name:groupName});
  res.status(201).json(group);
}
catch(err)
{
  res.status(400).json(err)
}
};

// delete group by groupId
const deleteGroup = async (req, res) => {
  try{
  const group = await Group.findById(req.params.groupId);
  if (group && group.admin==req.user._id) {
    await Group.deleteOne(group)
    return res.status(200).json({ message: 'Group removed' });
  } else {
    return res.status(404).json({ message: 'You have not authorized to delete this group' });
  }
}
catch(err)
{
  res.status(400).json(err)
}
};

// fetching group details
const getGroups = async (req, res) => {
  try{
    const searchQuery = req.query.q;
  const groups = await Group.aggregate([
    {$match:{ name: { $regex: searchQuery, $options: 'i' }}},
    {$unwind:"$members"},
    {
      $match:{"members":req.user._id}
    }
  ])
  res.status(200).json({message:"Groups fetched successfully",groups});
}
catch(err)
{
  res.status(400).json(err)
}
};

// fetching group details by id
const getGroupDetails = async (req, res) => {
  try{
  const group = await Group.findById(req.params.groupId).populate('members', 'username').populate('admin','username');
  res.status(200).json({message:"group fetched successfully",group});
}
catch(err)
{
  res.status(400).json(err)
}
};

// adding user to group
const addUserToGroup = async (req, res) => {
  const { groupId, newMembers } = req.body;
  try{  const group = await Group.findById(groupId);
  if (group && group.admin.includes(req.user._id)) {
     group.members.push(...newMembers);
      await group.save();
      return res.status(200).json({message:"User added to group",group});
    } 
   else {
    res.status(403).json({ message: 'Not Authorized' });
  } }
  catch(err)
  {
    res.status(400).json(err)
  }
};


//  removing user from group
const removeUserFromGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  try{  const group = await Group.findById(groupId);
  if (group && group.admin.includes(req.user._id)) {
    const user = await User.findById(userId);
    if (user) {
      // Check if the user is a member of the group
    const userIndex = group.members.indexOf(userId);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not a member of the group' });
    }

    // Remove the user ID from the memberIds array
    group.members.splice(userIndex, 1);

    // Save the updated group document
    await group.save();
      return res.status(200).json({message:"User Removed from group",group});
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else {
    return res.status(403).json({ message: 'Not Authorized' });
  } }
  catch(err)
  {
    res.status(400).json(err)
  }
};


//  exiting from group
const exitFromGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  try{  const group = await Group.findById(groupId);
  if (group) {
    const user = await User.findById(userId);
    if (user) {
      // Check if the user is a member of the group
    const userIndex = group.members.indexOf(userId);
    const adminIndex = group.admin.indexOf(userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not a member of the group' });
    }

    if(adminIndex)
    group.admin.splice(adminIndex,1);
    // Remove the user ID from the memberIds array
    group.members.splice(userIndex, 1);

    // Save the updated group document
    await group.save();
      return res.status(200).json({message:"User Removed from group",group});
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else {
    return res.status(403).json({ message: 'Not Authorized' });
  } }
  catch(err)
  {
    res.status(400).json(err)
  }
};

// Search users
const searchGroup=async (req, res) => {
  try {
      const searchQuery = req.query.q;
      const groups = await Group.find({
          name: { $regex: searchQuery, $options: 'i' }
      });

      res.status(200).json({message:"Groups fetched succesfully",groups});
  } catch (err) {
      res.status(500).send('Server error');
  }
};


// Search members
const searchMember=async (req, res) => {
  try {
      const searchQuery = req.query.q;
      const members = await Group.aggregate([
        {$match:{_id:new mongoose.Types.ObjectId(req.params.groupId)}},
        {$lookup:{
          from:"users",
          localField:"members",
          foreignField:"_id",
          as:"memberDetails"
        }},
        {$unwind:"$memberDetails"},
        {$match:{"memberDetails.username":{$regex:searchQuery,$options:"i"}}},
        {
          $project: {
            _id: "$memberDetails._id",
            username: "$memberDetails.username"
          }
        }
      ]);
      res.status(200).json({message:"members list",members});
  } catch (err) {
      res.status(500).send('Server error');
  }
};

// update groupname
const changeGroupName=async(req,res)=>
{
  try{
const group=await Group.findById(req.params.groupId)
if(group && group.admin==req.user._id)
{
    const newName=await Group.findByIdAndUpdate(req.params.groupId,{name:req.body.name});
  return res.status(200).json({message:"Group renamed successfully",newName})
  }
  else
  return res.status(403).json("Not Authorized")
}
  catch(err)
  {
    res.status(400).json(err)
  }
}

module.exports = { createGroup, deleteGroup, getGroups,renameGroupName,searchGroup,exitFromGroup, getGroupDetails,addUserToGroup,removeUserFromGroup,searchMember, changeGroupName };

