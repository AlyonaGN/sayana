import { combineReducers } from 'redux';
import userReducer from './user/reducers';
import suggestionsReducer from './suggestions/reducers';

const reducers = combineReducers({
  suggestions: suggestionsReducer,
  user: userReducer,
});
export default reducers;
