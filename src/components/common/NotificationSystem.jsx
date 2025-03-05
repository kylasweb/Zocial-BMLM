import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeNotification } from '../../store/notificationSlice';

export default function NotificationSystem() {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    notifications.forEach((notification) => {
      const { type, message, id } = notification;
      
      toast[type](message, {
        onClose: () => dispatch(removeNotification(id)),
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  }, [notifications, dispatch]);

  return <ToastContainer />;
}