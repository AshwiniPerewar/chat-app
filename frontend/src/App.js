import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/Auth/LoginPage";
import GroupListPage from "./pages/group/GroupListPage";
import GroupChatPage from "./pages/group/GroupChatPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import UserListPage from "./pages/Admin/UserList";
import CreateUser from "./pages/Admin/CreateUser";
import SignUp from "./pages/Auth/SignUp";
import CreateGroup from "./pages/group/CreateGroup";
import EditUser from "./pages/Admin/EditUser";
import Protected from "./context/Protected";
import GroupInfo from "./pages/group/GroupInfo";
import AddMemberpage from "./pages/group/AddMemberPage";

const App = () => {
  return (
    <AuthProvider>
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
        <Route path="/edit-group/:groupId" element={<Protected><GroupInfo/></Protected>} />
        <Route path="/group/:groupId" element={<Protected><GroupChatPage /></Protected>} />
        <Route path="/add-member/:groupId" element={<Protected><AddMemberpage/></Protected>}/>
      </Routes>
    </AuthProvider>
  );
};

export default App;
