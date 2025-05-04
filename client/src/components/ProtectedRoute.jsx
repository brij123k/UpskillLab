import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageLoading from "../components/PageLoading";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { 
    isAuthenticated, 
    userDetails,
    getValidToken,
    isAuthorized,
    logout
  } = useAuth();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const checkAuthAndRole = async () => {
      try {
        // First verify we have a valid token
        const validToken = await getValidToken();
        const authValid = !!validToken;
        
        if (!authValid) {
          throw new Error("No valid token found");
        }

        // Check if user has the required role
        const roleValid = allowedRoles.length === 0 || 
                         isAuthorized(allowedRoles);

        if (!roleValid) {
          // Redirect based on user type
          redirectUser(userDetails.userType);
          return;
        }

        setAuthStatus({
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error("Authentication check failed:", error);
        logout(); // Clear invalid session
        setAuthStatus({
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    checkAuthAndRole();
  }, [location.pathname, allowedRoles]);

  const redirectUser = (userType) => {
    switch(userType?.toUpperCase()) {
      case 'ADMIN':
        window.location.href = 'https://admin.upskillab.com/';
        break;
      case 'TEACHER':
        navigate('/Teacher/Dashboard', { replace: true });
        break;
      case 'STUDENT':
        navigate('/Student/Dashboard', { replace: true });
        break;
      default:
        navigate('/profile', { replace: true });
    }
  };

  if (authStatus.isLoading) {
    return <PageLoading />;
  }

  if (!authStatus.isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location,
          message: "Please login to access this page"
        }} 
        replace 
      />
    );
  }

  return children;
};

export default ProtectedRoute;