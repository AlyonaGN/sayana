export const suggestionsActionTypes = {
  SET_SUGGESTIONS: 'SUGGESTIONS.SET_SUGGESTIONS',
};

export const suggestionsActions = {
  setSuggestions: (payload) => {
    return ({ type: suggestionsActionTypes.SET_SUGGESTIONS, payload });
  },
};
