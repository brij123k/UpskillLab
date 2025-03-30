import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [loading, setLoading] = useState(true);
  console.log("Koca: isAuthenticated ", isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("otp-timer", 180);
    sessionStorage.setItem("isEmailVerified", false);
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("otp-timer");
    sessionStorage.removeItem("isEmailVerified");
    toast.success("Logout Successfully");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
