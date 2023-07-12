import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (!notification || !notification.text) {
    return null;
  }

  return <div style={style}>{notification.text}</div>;
};

export default Notification;
