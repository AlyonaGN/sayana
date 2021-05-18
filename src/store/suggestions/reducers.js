import { suggestionsActionTypes } from './actions';

const initialState = {
  suggestions: [],
};

const  suggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case suggestionsActionTypes.SET_SUGGESTIONS:
      return { ...state, suggestions: action.payload };
    default:
      return state;
  }
};
export default suggestionsReducer;
