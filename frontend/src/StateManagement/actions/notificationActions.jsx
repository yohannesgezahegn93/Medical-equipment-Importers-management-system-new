// actions/notificationActions.js
export const INCREMENT_NOTIFICATION_COUNT = 'INCREMENT_NOTIFICATION_COUNT';
export const DECREMENT_NOTIFICATION_COUNT = 'DECREMENT_NOTIFICATION_COUNT';
// actions/notificationActions.js
export const incrementNotificationCount = () => ({
    type: INCREMENT_NOTIFICATION_COUNT,
  });
  
  export const decrementNotificationCount = () => ({
    type: DECREMENT_NOTIFICATION_COUNT,
  });
  