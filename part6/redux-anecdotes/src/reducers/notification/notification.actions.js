import { createAction } from '@reduxjs/toolkit';

export const setNotification = createAction('notification/setNotification');
export const removeNotification = createAction(
  'notification/removeNotification'
);
