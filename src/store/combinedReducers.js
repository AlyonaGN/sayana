import { combineReducers } from 'redux';
import userReducer from './user/reducers';
import sessionReducer from './session/reducers';

const reducers = combineReducers({
  session: sessionReducer,
  user: userReducer,
});
export default reducers;
