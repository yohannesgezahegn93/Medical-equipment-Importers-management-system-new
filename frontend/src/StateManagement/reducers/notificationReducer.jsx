// reducers/notificationReducer.js
import { INCREMENT_NOTIFICATION_COUNT, DECREMENT_NOTIFICATION_COUNT } from '../actions/notificationActions';

const initialState = {
  count: 0,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_NOTIFICATION_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT_NOTIFICATION_COUNT:
      return {
        ...state,
        count: state.count > 0 ? (state.count - state.count) : 0,
      };
    default:
      return state;
  }
};

export default notificationReducer;
