import { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
import { io } from 'socket.io-client';

const useNotificationService = (id,roles) => {
//   const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('https://api.upskillab.com', {
    // const newSocket = io('http://localhost:3000', {
      transports: ['websocket'],
      withCredentials: true,
    });

    setSocket(newSocket);

    // Register user with their roles
    
    newSocket.emit('register', {
      userId: id,
      roles: roles
    });

    // Listen for notifications
    newSocket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Function to manually mark as read (if needed)
  const markAsRead = (notificationId) => {
    socket?.emit('markAsRead', { notificationId });
  };

  // Function to delete notification (if needed)
  const deleteNotification = (notificationId) => {
    socket?.emit('deleteNotification', { notificationId });
  };

  return {
    socket,
    notifications,
    setNotifications,
    markAsRead,
    deleteNotification
  };
};

export default useNotificationService;