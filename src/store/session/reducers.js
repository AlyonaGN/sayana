import { sessionActionTypes } from './actions';

const initialState = {
  message: '',
  suggestions: [],
};

const  sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case sessionActionTypes.SET_SUGGESTIONS:
      return { ...state, suggestions: action.payload };
    case sessionActionTypes.SET_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
export default sessionReducer;
