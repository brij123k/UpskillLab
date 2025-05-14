import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserDetails, refreshAuthToken } from '../config/services';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const storedAuth = sessionStorage.getItem('auth');
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : null;

  const [auth, setAuth] = useState(initialAuth);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialAuth?.authToken);

  const tokenRefreshTimeoutRef = useRef(null);

  useEffect(() => {
    const initializeAuth = async () => {
      if (auth?.authToken) {
        try {
          await fetchUserDetails();
          setupTokenRefresh();
        } catch (error) {
          console.error('Initialization failed:', error);
          logout();
        }
      }
      setLoading(false);
    };
    initializeAuth();

    return () => {
      clearTimeout(tokenRefreshTimeoutRef.current);
    };
  }, []);

  const fetchUserDetails = async () => {
    try {
      const details = await getUserDetails();
      setUserDetails(details);
      return details;
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      throw error;
    }
  };

  const isTokenExpiredOrExpiring = () => {
    if (!auth?.authToken || !auth?.authTokenExpiryDate) return true;

    const expiryTime = new Date(auth.authTokenExpiryDate).getTime();
    const currentTime = Date.now();
    const bufferTime = 5 * 60 * 1000; // 5 minutes buffer

    return expiryTime - currentTime <= bufferTime;
  };

  const refreshToken = async () => {
    if (!auth?.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await refreshAuthToken();
      const { authToken, authTokenExpiryDate, refreshToken } = response.data;

      if (authToken && authTokenExpiryDate) {
        const newAuth = { authToken, authTokenExpiryDate, refreshToken };
        setAuth(newAuth);
        sessionStorage.setItem('auth', JSON.stringify(newAuth));
        return authToken;
      }

      throw new Error('Invalid token response');
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  };

  const getValidToken = async () => {
    if (!auth) return null;

    if (isTokenExpiredOrExpiring()) {
      try {
        return await refreshToken();
      } catch {
        logout();
        return null;
      }
    }

    return auth.authToken;
  };

  const login = async (authData) => {
    try {
      const newAuth = {
        authToken: authData.authToken,
        authTokenExpiryDate: authData.authTokenExpiryDate,
        refreshToken: authData.refreshToken
      };

      setAuth(newAuth);
      sessionStorage.setItem('auth', JSON.stringify(newAuth));

      const details = await fetchUserDetails();

      if (!details.isActive) {
        throw new Error('Your account is inactive. Please contact support.');
      }

      setIsAuthenticated(true);
      setupTokenRefresh();
      redirectUser(details.userType);

      return details;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = () => {
    setAuth(null);
    setUserDetails(null);
    sessionStorage.removeItem('auth');
    setIsAuthenticated(false);
    clearTimeout(tokenRefreshTimeoutRef.current);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const setupTokenRefresh = () => {
    if (!auth?.authTokenExpiryDate) return;

    const expiryTime = new Date(auth.authTokenExpiryDate).getTime();
    const currentTime = Date.now();
    const bufferTime = 5 * 60 * 1000;
    const refreshTime = Math.max(expiryTime - currentTime - bufferTime, 0);

    clearTimeout(tokenRefreshTimeoutRef.current);

    tokenRefreshTimeoutRef.current = setTimeout(async () => {
      try {
        await refreshToken();
        setupTokenRefresh(); // Setup next refresh
      } catch {
        logout();
      }
    }, refreshTime);
  };

  const redirectUser = (userType) => {
    switch (userType?.toUpperCase()) {
      case 'ADMIN':
        window.location.href = 'https://admin.upskillab.com/';
        break;
      case 'TEACHER':
        navigate('/Teacher/Dashboard');
        break;
      case 'STUDENT':
        navigate('/Student/Dashboard');
        break;
      default:
        navigate('/profile');
    }
  };

  const isAuthorized = (allowedRoles = []) => {
    if (!userDetails?.userType) return false;
    return allowedRoles.includes(userDetails.userType.toUpperCase());
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        userDetails,
        loading,
        login,
        logout,
        isAuthenticated,
        getValidToken,
        isAdmin: () => userDetails?.userType?.toUpperCase() === 'ADMIN',
        isTeacher: () => userDetails?.userType?.toUpperCase() === 'TEACHER',
        isStudent: () => userDetails?.userType?.toUpperCase() === 'STUDENT',
        isUserActive: () => userDetails?.isActive,
        getUserRole: () => userDetails?.userType,
        isAuthorized,
        refreshUserDetails: fetchUserDetails
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
