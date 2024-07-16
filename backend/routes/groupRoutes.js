const express = require('express');
const{  getGroups,getGroupDetails,createGroup, deleteGroup,renameGroupName,addUserToGroup,removeUserFromGroup,exitFromGroup,searchGroup, searchMember }= require('../controller/groupCntrl');

const groupRoutes = express.Router();

groupRoutes.post('/', createGroup);
groupRoutes.delete('/:groupId',deleteGroup);
groupRoutes.get('/', getGroups);
groupRoutes.get("/search",searchGroup);
groupRoutes.get('/:groupId', getGroupDetails);
groupRoutes.get("/:groupId/search-member",searchMember);
groupRoutes.put('/add-user', addUserToGroup);
groupRoutes.put('/remove-user', removeUserFromGroup);
groupRoutes.put('/exit', exitFromGroup);
groupRoutes.put('/rename-group', renameGroupName);



module.exports = groupRoutes;
