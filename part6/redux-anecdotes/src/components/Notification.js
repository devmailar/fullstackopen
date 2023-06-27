import { useSelector } from 'react-redux';
import notificationSelector from '../reducers/notification/notification.reducer';

const Notification = () => {
  const notification = useSelector(notificationSelector);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
