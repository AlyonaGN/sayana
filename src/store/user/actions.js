export const userActionsTypes = {
  SET_NAME: 'USER.SET_NAME',
  SET_TOKEN: 'USER.SET_TOKEN',
};

export const userActions = {
  setUserName: (payload) => {
    return ({ type: userActionsTypes.SET_NAME, payload });
  },
  setUserToken: (payload) => {
    return ({ type: userActionsTypes.SET_TOKEN, payload });
  },
};
