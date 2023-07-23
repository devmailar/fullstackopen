import { createContext, useReducer } from 'react';

const initialState = {
  message: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'showed_notification': {
      return { message: action.payload };
    }
    case 'hided_notification': {
      return { message: '' };
    }
    default: {
      return state;
    }
  }
};

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showNotification = (message) => {
    dispatch({ type: 'showed_notification', payload: message });
  };

  const hideNotification = () => {
    dispatch({ type: 'hided_notification' });
  };

  return (
    <NotificationContext.Provider value={{ message: state.message, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
