const Message = require("../models/Message");
const mongoose = require("mongoose");

// sending message in a group
const sendMessage = async (req, res) => {
  try {
    const { group, content } = req.body;
    const message = new Message({
      group,
      sender: req.user._id,
      content,
    });

    const createdMessage = await message.save();
    res.status(201).json(createdMessage);
  } catch (err) {
    res.status(400).json(err);
  }
};

// like message in a group
const likeMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (message) {
      {
        const likeIndex = message.likes.indexOf(req.user._id);
        if (likeIndex === -1) {
          message.likes.push(req.user._id);
        } else {
          message.likes.splice(likeIndex, 1);
        }
        await message.save();
        res.status(200).json(message);
      }
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// fetching messages by groupId
const getMessages = async (req, res) => {
  try {
    const messages = await Message.aggregate([
      { $match: { group: new mongoose.Types.ObjectId(req.params.groupId) } },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $lookup: {
          from: "users",
          localField: "likes",
          foreignField: "_id",
          as: "likeDetails",
        },
      },
      {
        $project: {
          content: 1,
          sender: "$userDetails.username",
          likes: "$likeDetails.username",
        },
      },
    ]);
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { sendMessage, likeMessage, getMessages };
