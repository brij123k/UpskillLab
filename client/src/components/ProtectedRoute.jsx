import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageLoading from "../components/PageLoading";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { 
    isAuthenticated, 
    userDetails,
    getValidToken,
    getUserRole,
    isAuthorized,
    logout,
    loading: authLoading
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
        // Wait for auth initialization to complete
        if (authLoading) return;

        const validToken = await getValidToken();
        const authValid = !!validToken;
        
        if (!authValid) {
          throw new Error("No valid token found");
        }

        // Ensure userDetails is loaded
        const role = await getUserRole();
        if (!role) {
          // Wait a bit more if userDetails isn't loaded yet
          await new Promise(resolve => setTimeout(resolve, 100));
          return checkAuthAndRole();
        }

        const roleValid = allowedRoles.length === 0 || 
                         isAuthorized(allowedRoles);

        if (!roleValid) {
          redirectUser(role);
          return;
        }

        setAuthStatus({
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error("Authentication check failed:", error);
        logout();
        setAuthStatus({
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    checkAuthAndRole();
  }, [location.pathname, allowedRoles, authLoading]);

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
        navigate('/', { replace: true });
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