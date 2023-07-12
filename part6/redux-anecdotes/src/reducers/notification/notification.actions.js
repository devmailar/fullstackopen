import { createAction } from '@reduxjs/toolkit';

export const setNotification = createAction(
  'notification/setNotification',
  (text, duration) => {
    return {
      payload: {
        text,
        duration,
      },
    };
  }
);
export const clearNotification = createAction('notification/clearNotification');
