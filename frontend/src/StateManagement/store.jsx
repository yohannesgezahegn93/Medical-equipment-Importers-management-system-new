// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
