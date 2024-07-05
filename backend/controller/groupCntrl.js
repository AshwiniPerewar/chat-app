const Group = require('../models/Group');
const User = require('../models/User');
const mongoose=require("mongoose")
// create new group
const createGroup = async (req, res) => {
  const { groupName,members} = req.body;
  try{
  const group = new Group({ name:groupName,members});

  const createdGroup = await group.save();
  res.status(201).json(createdGroup);
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
  if (group) {
    await Group.deleteOne(group)
    res.status(200).json({ message: 'Group removed' });
  } else {
    res.status(404).json({ message: 'Group not found' });
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
  const groups = await Group.find({}).populate('members', 'username');
  res.status(200).json(groups);
}
catch(err)
{
  res.status(400).json(err)
}
};

// fetching group details by id
const getGroupDetails = async (req, res) => {
  try{
  const group = await Group.findById(req.params.groupId).populate('members', 'username');
  res.status(200).json(group);
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

  if (group) {
     group.members.push(...newMembers);
      await group.save();
      res.status(200).json(group);
    } 
   else {
    res.status(404).json({ message: 'Group not found' });
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
  if (group) {
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
      res.status(200).json({message:"User Removed from group",group});
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Group not found' });
  } }
  catch(err)
  {
    res.status(400).json(err)
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
      res.status(200).json(members);
  } catch (err) {
      res.status(500).send('Server error');
  }
};

// update groupname
const changeGroupName=async(req,res)=>
{
  try{
  const deleted=await Group.findByIdAndUpdate(req.params.groupId,{name:req.body.name});
  res.status(200).json(deleted)
  }
  catch(err)
  {
    res.status(400).json(err)
  }
}

module.exports = { createGroup, deleteGroup, getGroups,renameGroupName, getGroupDetails,addUserToGroup,removeUserFromGroup,searchMember, changeGroupName };

