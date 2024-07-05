import React, { useContext } from 'react'
import { AuthContext } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';

const Protected = ({children}) => {
    const{isAuth}=useContext(AuthContext);

   return isAuth ?children : <Navigate to="/login"></Navigate>
  
}

export default Protected