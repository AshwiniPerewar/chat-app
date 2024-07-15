import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/Auth/LoginPage";
import GroupListPage from "./pages/group/GroupListPage";
import GroupChatPage from "./pages/group/GroupChatPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import UserListPage from "./pages/User/UserList";
import CreateUser from "./pages/User/CreateUser";
import SignUp from "./pages/Auth/SignUp";
import CreateGroup from "./pages/group/CreateGroup";
import EditUser from "./pages/User/EditUser";
import Protected from "./context/Protected";
import GroupInfo from "./pages/group/GroupInfo";
import AddMemberpage from "./pages/group/AddMemberPage";
import RenameGroup from "./pages/group/RenameGroup";
import Model from "./components/Model";
import SearchMember from "./pages/group/SearchMember";

const App = () => {
  return (
    <AuthProvider>
      {/* <Model></Model> */}
      <Navbar />
      <Routes>
        {/* home route */}
        <Route path="/" element={<HomePage />} />
        {/* auth routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        {/* user routes */}
        <Route path="/users" element={<Protected><UserListPage /></Protected>} />
        <Route path="/create-user" element={<Protected><CreateUser /></Protected>} />
        <Route path="/edit-user/:userId" element={<Protected><EditUser /></Protected>} />
        {/* group routes */}
        <Route path="/groups" element={<Protected><GroupListPage /></Protected>} />
        <Route path="/create-group" element={<Protected><CreateGroup /></Protected>} />
        <Route path="/group-info/:groupId" element={<Protected><GroupInfo/></Protected>} />
        <Route path="/rename-group/:groupId" element={<Protected><RenameGroup/></Protected>} />
        <Route path="/group-chat/:groupId" element={<Protected><GroupChatPage /></Protected>} />
        <Route path="/add-members/:groupId" element={<Protected><AddMemberpage/></Protected>}/>
        <Route path="/search-member/:groupId" element={<Protected><SearchMember/></Protected>}/>
      </Routes>
    </AuthProvider>
  );
};

export default App;
