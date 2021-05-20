export const sessionActionTypes = {
  SET_SUGGESTIONS: 'SESSION.SET_SUGGESTIONS',
  SET_DISPLAYED_SUGGESTIONS: 'SESSION.SET_DISPLAYED_SUGGESTIONS',
  SET_MESSAGE: 'SESSION.SET_MESSAGE',
  SET_INPUT_SHOWN: 'SESSION.SET_INPUT_SHOWN',
  SET_STORY_TIME: 'SESSION.SET_STORY_TIME',
  SET_COMPLETED: 'SESSION.SET_COMPLETED',
};

export const sessionActions = {
  setSuggestions: (payload) => {
    return ({ type: sessionActionTypes.SET_SUGGESTIONS, payload });
  },
  setDisplayedSuggestions: (payload) => {
    return ({ type: sessionActionTypes.SET_DISPLAYED_SUGGESTIONS, payload });
  },
  setMessage: (payload) => {
    return ({ type: sessionActionTypes.SET_MESSAGE, payload });
  },
  setInputShown: (payload) => {
    return ({ type: sessionActionTypes.SET_INPUT_SHOWN, payload });
  },
  setStoryTime: (payload) => {
    return ({ type: sessionActionTypes.SET_STORY_TIME, payload });
  },
  setCompleted: (payload) => {
    return ({ type: sessionActionTypes.SET_COMPLETED, payload });
  },
};
