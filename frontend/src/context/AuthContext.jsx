import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const[userData,setUserData]=useState("");
  const navigate=useNavigate();

  const login = (token,user) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
    console.log(user)
    if(user)
    setUserData(user)
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUserData({});
    navigate("/login")
  };

  return (
    <AuthContext.Provider value={{isAuth,userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
