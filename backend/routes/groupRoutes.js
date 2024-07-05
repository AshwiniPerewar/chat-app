const express = require('express');
const { createGroup, deleteGroup, getGroups,getGroupDetails,searchMember,renameGroupName,removeUserFromGroup, addUserToGroup } = require('../controller/groupCntrl');

const groupRoutes = express.Router();

groupRoutes.post('/', createGroup);
groupRoutes.delete('/:groupId', deleteGroup);
groupRoutes.get('/', getGroups);
groupRoutes.get('/:groupId', getGroupDetails);
groupRoutes.get("/:groupId/search-member",searchMember);
groupRoutes.put('/add-user', addUserToGroup);
groupRoutes.put('/remove-user', removeUserFromGroup);
groupRoutes.put('/rename-group', renameGroupName);



module.exports = groupRoutes;
