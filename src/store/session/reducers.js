import { sessionActionTypes } from './actions';

const initialState = {
  message: '',
  suggestions: [],
  displayedSuggestions: [],
  isInputShown: false,
  isStoryTime: false,
  isCompleted: false,
};

const  sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case sessionActionTypes.SET_SUGGESTIONS:
      return { ...state, suggestions: action.payload };
    case sessionActionTypes.SET_DISPLAYED_SUGGESTIONS:
      return { ...state, displayedSuggestions: action.payload };
    case sessionActionTypes.SET_MESSAGE:
      return { ...state, message: action.payload };
    case sessionActionTypes.SET_INPUT_SHOWN:
      return { ...state, isInputShown: action.payload };
    case sessionActionTypes.SET_STORY_TIME:
      return { ...state, isStoryTime: action.payload };
    case sessionActionTypes.SET_COMPLETED:
      return { ...state, isCompleted: action.payload };
    default:
      return state;
  }
};
export default sessionReducer;
