import React, { useContext } from 'react'
import { AuthContext } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const{admin}=useContext(AuthContext);

   return admin ?children : <Navigate to="/login"></Navigate>
}

export default AdminRoute