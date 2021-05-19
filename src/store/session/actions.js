export const sessionActionTypes = {
  SET_SUGGESTIONS: 'SESSION.SET_SUGGESTIONS',
  SET_MESSAGE: 'SESSION.SET_MESSAGE',
};

export const sessionActions = {
  setSuggestions: (payload) => {
    return ({ type: sessionActionTypes.SET_SUGGESTIONS, payload });
  },
  setMessage: (payload) => {
    return ({ type: sessionActionTypes.SET_MESSAGE, payload });
  },
};
